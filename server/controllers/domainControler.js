const { callApi } = require("../utils/enom");
const HttpError = require("../models/errorModel");
const Domain = require("../models/domainModel");
const User = require("../models/userModels");
const { enomUsername, enomApiKey, enomBaseUrl } = require("../config/config");
const { default: axios } = require("axios");

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
    console.log("Response Data:", response.data);
    if (
      response.data["interface-response"] &&
      response.data["interface-response"].RRPCode !== "210"
    ) {
      return next(
        new HttpError("Domain is not available for registration.", 400)
      );
    }
    const registerResponse = await axios.get(`${enomBaseUrl}/interface.asp`, {
      params: {
        command: "Purchase",
        uid: enomUsername,
        pw: enomApiKey,
        sld,
        tld,
        responseType: "JSON",
        period: 1, // 1-year registration
      },
      timeout: 15000,
    });
    console.log("Register Response Data:", registerResponse.data); // Log response to debug
    if (
      registerResponse.data["interface-response"] &&
      registerResponse.data["interface-response"].RRPCode !== "200"
    ) {
      return next(new HttpError("Error registering the domain.", 500));
    }
    const newDomain = new Domain({
      domain: domain,
      expiryDate: new Date(
        new Date().setFullYear(new Date().getFullYear() + 1) // After one year
      ),
      userId,
    });
    await newDomain.save();
    await User.findByIdAndUpdate(userId, { $inc: { domainCount: 1 } });

    return res.status(201).json({
      message: "Domain registered successfully!",
      domain: newDomain,
    });
  } catch (error) {
    console.error("Error:", error);
    return next(
      new HttpError(error.message || "Failed to register the domain.", 500)
    );
  }
};

module.exports = { checkDomain, registerDomain };
