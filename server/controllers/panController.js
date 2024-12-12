const Plan = require("../models/plansModel");
const HttpError = require("../models/errorModel");

const createPlan = async (req, res) => {
  try {
    const newPlan = new Plan(req.body);
    await newPlan.save();
    return res
      .status(201)
      .json({ message: "Plan created successfully", newPlan });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error creating plan" });
  }
};

const getAllPlans = async (req, res) => {
  try {
    const plans = await Plan.find();
    return res.status(200).json(plans);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error fetching plans" });
  }
};

const getPlanById = async (req, res) => {
  try {
    const plan = await Plan.findById(req.params.planId);
    if (!plan) {
      return res.status(404).json({ message: "Plan not found" });
    }
    return res.status(200).json(plan);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error fetching plan" });
  }
};

const updatePlan = async (req, res) => {
  try {
    const plan = await Plan.findByIdAndUpdate(req.params.planId, req.body, {
      new: true,
    });
    if (!plan) {
      return res.status(404).json({ message: "Plan not found" });
    }
    return res.status(200).json({ message: "Plan updated successfully", plan });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error updating plan" });
  }
};

const deletePlan = async (req, res) => {
  try {
    const plan = await Plan.findByIdAndDelete(req.params.planId);
    if (!plan) {
      return res.status(404).json({ message: "Plan not found" });
    }
    return res.status(200).json({ message: "Plan deleted successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error deleting plan" });
  }
};

module.exports = {
  createPlan,
  getAllPlans,
  getPlanById,
  updatePlan,
  deletePlan,
};
