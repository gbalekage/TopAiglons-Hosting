const mongoose = require("mongoose");

const domainSchema = new mongoose.Schema({
  domain: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  registrationDate: { type: Date, default: Date.now },
  expiryDate: { type: Date, required: true },
});

module.exports = mongoose.model("Domain", domainSchema);
