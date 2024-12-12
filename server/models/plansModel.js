const mongoose = require("mongoose");

const planSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    enum: ["Basic", "Pro", "Elite", "Premium"],
  },
  price: {
    type: Number,
    required: true,
  },
  storage: {
    type: String,
    required: true,
  },
  bandwidth: {
    type: String,
    required: true,
  },
  domains: {
    type: Number,
    required: true,
  },
  emailAccounts: {
    type: Number,
    required: true,
  },
  freeSSL: {
    type: Boolean,
    required: true,
  },
  dailyBackup: {
    type: Boolean,
    required: true,
  },
  support: {
    type: String,
    required: true,
  },
  additionalFeatures: {
    type: [String],
    required: false,
  },
  duration: {
    type: String,
    required: true,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
});

const Plan = mongoose.model("Plan", planSchema);

module.exports = Plan;
