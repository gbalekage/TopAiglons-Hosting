const { MailtrapClient } = require("mailtrap");
require("dotenv").config();

const TOKEN = process.env.MAIL_TOKEN;

const mailClient = new MailtrapClient({
  token: TOKEN,
});

const sender = {
  email: "hello@demomailtrap.com",
  name: "Top Aiglons",
};

module.exports = { mailClient, sender };
