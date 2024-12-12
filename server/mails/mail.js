const HttpError = require("../models/errorModel");
const {
  VERIFICATION_EMAIL_TEMPLATE,
  PASSWORD_RESET_REQUEST_TEMPLATE,
  PASSWORD_RESET_SUCCESS_TEMPLATE,
} = require("./emailTemplates");
const { mailClient, sender } = require("./mailConfig");

const sendVerificationMail = async (email, vericationCode) => {
  const recipient = [{ email }];

  try {
    const response = await mailClient.send({
      from: sender,
      to: recipient,
      subject: "Verifier votre compte",
      html: VERIFICATION_EMAIL_TEMPLATE.replace(
        "{vericationCode}",
        vericationCode
      ),
      category: "Email verification",
    });

    console.log("Email sent successfully", response);
  } catch (error) {
    console.error(`Error in send verification mail`, error);
    throw new Error(`Error sending verfication email: ${error}`);
  }
};

// const paymentSuccessEmail = async (email, domain, price) => {
//   const recipient = [{ email }];

//   try {
//     const response = await mailClient.send({
//       from: sender,
//       to: recipient,
//       subject: "",
//       html: VERIFICATION_EMAIL_TEMPLATE.replace(
//         "{vericationCode}",
//         vericationCode
//       ),
//       category: "Email verification",
//     });

//     console.log("Email sent successfully", response);
//   } catch (error) {
//     console.error(`Error in send verification mail`, error);
//     throw new Error(`Error sending verfication email: ${error}`);
//   }
// };

const sendPasswordResetEmail = async (email, resetURL) => {
  const recipient = [{ email }];

  try {
    const response = await mailClient.send({
      from: sender,
      to: recipient,
      subject: "Modifier Mot de passe",
      html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", resetURL),
      category: "Reset Password",
    });

    console.log("Email sent successfully", response);
  } catch (error) {
    console.error(`Error in send reset mail`, error);
    throw new Error(`Error sending reset email: ${error}`);
  }
};

const sendResetSuccessEmail = async (email) => {
  const recipient = [{ email }];

  try {
    const response = await mailClient.send({
      from: sender,
      to: recipient,
      subject: "Modifier Mot de passe",
      html: PASSWORD_RESET_SUCCESS_TEMPLATE,
      category: "Password Reset",
    });

    console.log("Email sent successfully", response);
  } catch (error) {
    console.error(`Error in send reset success mail`, error);
    throw new Error(`Error sending reset success email: ${error}`);
  }
};

const sendWelcomeEmail = async (email, name) => {
  const recipient = [{ email }];

  try {
    const response = await mailClient.send({
      from: sender,
      to: recipient,
      template_uuid: "0ddfdfc3-88a4-428f-8876-a32cb6b3d421",
      template_variables: {
        company_info_name: "TopAiglons Hosting",
        name: name,
      },
    });

    console.log("Welcome email sent successfully", response);
  } catch (error) {
    console.error(`Error in send reset mail`, error);
    throw new Error(`Error sending reset email: ${error}`);
  }
};

module.exports = {
  sendVerificationMail,
  sendWelcomeEmail,
  sendPasswordResetEmail,
  sendResetSuccessEmail,
};
