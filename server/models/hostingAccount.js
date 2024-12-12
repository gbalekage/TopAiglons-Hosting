const mongoose = require("mongoose");

const hostingAccountSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  domain: {
    type: String,
    required: true,
  },
  hostingPlan: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Plan",
    required: true,
  },
  cPanelAccount: {
    type: String,
    required: true,
  },
  webmailCreated: {
    type: Boolean,
    default: false,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
});

const HostingAccount = mongoose.model("HostingAccount", hostingAccountSchema);

module.exports = HostingAccount;
