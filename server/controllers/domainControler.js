const { callApi } = require("../utils/enom");
const HttpError = require("../models/errorModel");
const Domain = require("../models/domainModel");
const User = require("../models/userModels");
const { enomUsername, enomApiKey, enomBaseUrl } = require("../config/config");
const { default: axios } = require("axios");
const domainPrices = require("../utils/domainPrices");
const stripe = require("stripe")(process.env.STIPE_KEY);
const { paymentSuccessEmail } = require("../mails/mail");

//check the domain
const checkDomain = async (req, res, next) => {
  try {
    const { domain } = req.body;

    if (!domain) {
      return next(new HttpError("Please provide a domain to check.", 422));
    }

    const [sld, tld] = domain.split(".");
    if (!sld || !tld) {
      return next(
        new HttpError("Invalid domain format. Use 'example.com'.", 422)
      );
    }

    const response = await axios.get(`${enomBaseUrl}/interface.asp`, {
      params: {
        command: "Check",
        uid: enomUsername,
        pw: enomApiKey,
        sld,
        tld,
        responseType: "JSON",
      },
      timeout: 15000,
    });

    console.log("Enom API Response:", response.data);

    const data = response.data["interface-response"];
    if (!data) {
      throw new Error("Invalid response from Enom API.");
    }

    const isAvailable = data.RRPCode === "210";
    return res.status(200).json({
      message: isAvailable ? "Domain is available" : "Domain is not available",
      isAvailable,
    });
  } catch (error) {
    const message =
      error.response?.data || error.message || "An error occurred.";
    return next(new HttpError(message, 500));
  }
};

const registerDomain = async (req, res, next) => {
  try {
    const { domain } = req.body;
    const userId = req.userId;
    if (!domain) {
      return next(new HttpError("Please provide a domain to register.", 422));
    }
    const [sld, tld] = domain.split(".");
    if (!sld || !tld) {
      return next(
        new HttpError("Invalid domain format. Use 'example.com'", 422)
      );
    }

    if (!domainPrices[tld]) {
      return next(new HttpError("Unsupported domain extension.", 400));
    }

    const price = domainPrices[tld];

    const response = await axios.get(`${enomBaseUrl}/interface.asp`, {
      params: {
        command: "Check",
        uid: enomUsername,
        pw: enomApiKey,
        sld,
        tld,
        responseType: "JSON",
      },
      timeout: 30000,
    });

    if (
      response.data["interface-response"] &&
      response.data["interface-response"].RRPCode !== "210"
    ) {
      return next(
        new HttpError("Domain is not available for registration.", 400)
      );
    }

    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: `Domain Registration: ${domain}`,
            },
            unit_amount: Math.round(price * 100),
          },
          quantity: 1,
        },
      ],

      mode: "payment",
      success_url: `${process.env.CLIENT_URL}/checkout/success?session_id={CHECKOUT_SESSION_ID}&domain=${domain}`,
      cancel_url: `${process.env.CLIENT_URL}/checkout/cancel`,
    });

    return res.status(200).json({
      url: session.url,
    });
  } catch (error) {
    console.error("Error:", error);
    return next(
      new HttpError(
        error.message || "Failed to initiate the registration.",
        500
      )
    );
  }
};

const handleSuccess = async (req, res, next) => {
  try {
    const { session_id, domain } = req.body;
    console.log("Received session_id:", session_id);
    console.log("Received domain:", domain);
    const userId = req.userId;

    if (!session_id) {
      console.error("Missing session_id");
      return res.status(400).json({ message: "session_id is required." });
    }

    if (!domain) {
      console.error("Missing domain");
      return res.status(400).json({ message: "domain is required." });
    }

    const session = await stripe.checkout.sessions.retrieve(session_id);
    if (!session || session.payment_status !== "paid") {
      return res
        .status(400)
        .json({ message: "Invalid or incomplete payment." });
    }

    const [sld, tld] = domain.split(".");
    const registerResponse = await axios.get(`${enomBaseUrl}/interface.asp`, {
      params: {
        command: "Purchase",
        uid: enomUsername,
        pw: enomApiKey,
        sld,
        tld,
        responseType: "TEXT",
        period: 1,
      },
      responseType: "text",
      timeout: 30000,
    });

    const rawResponse = registerResponse.data;
    console.log("Raw Enom Response:", rawResponse);

    const lines = rawResponse.split("\n");
    const parsedResponse = lines.reduce((acc, line) => {
      const [key, value] = line.split("=");
      if (key && value) {
        acc[key.trim()] = value.trim();
      }
      return acc;
    }, {});

    console.log("Parsed Enom Response:", parsedResponse);

    const errorMessage = parsedResponse["RRPText"];
    const rrpCode = parsedResponse["RRPCode"];
    const domainRegistered = parsedResponse["DomainName"];
    const orderId = parsedResponse["OrderID"];

    if (!rrpCode || rrpCode !== "200") {
      console.error("Enom Error:", errorMessage || "Unknown error");
      return next(
        new HttpError(
          `Error registering the domain: ${errorMessage || "Unknown error"}`,
          500
        )
      );
    }
    if (!domainRegistered && !orderId) {
      console.error(
        "Domain registration failed. No domain or order ID returned."
      );
      return next(new HttpError("Domain registration failed.", 500));
    }
    if (domainRegistered === domain || orderId) {
      console.log("Domain registered successfully or order ID found:", orderId);

      const newDomain = new Domain({
        domain,
        expiryDate: new Date(
          new Date().setFullYear(new Date().getFullYear() + 1)
        ),
        userId,
      });

      // await paymentSuccessEmail(domain, price);

      try {
        await newDomain.save();
        await User.findByIdAndUpdate(userId, { $inc: { domainCount: 1 } });
      } catch (error) {
        console.error("Error saving domain or updating user:", error);
        return next(new HttpError("Failed to save domain information.", 500));
      }

      console.log("New Domain Data:", newDomain);
      console.log("User Update Data:", { $inc: { domainCount: 1 } });

      return res.status(201).json({
        message: "Domain registered successfully!",
        domain: newDomain,
      });
    } else {
      console.error("Domain mismatch: Expected domain not registered.");
      return next(new HttpError("Domain registration failed.", 500));
    }
  } catch (error) {
    console.error("Error:", error);
    return next(
      new HttpError(
        error.message || "Failed to complete the registration.",
        500
      )
    );
  }
};

const handleCancel = (req, res) => {
  return res.status(200).json({
    message: "Payment canceled. No domain registration was made.",
  });
};

module.exports = { checkDomain, registerDomain, handleSuccess, handleCancel };
