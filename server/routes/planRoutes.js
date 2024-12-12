const express = require("express");
const router = express.Router();
const {
  createPlan,
  getAllPlans,
  getPlanById,
  updatePlan,
  deletePlan,
} = require("../controllers/panController");

router.get("/plans", getAllPlans);
router.get("/plans/:planId", getPlanById);
router.post("/plans", createPlan);
router.put("/plans/:planId", updatePlan);
router.delete("/plans/:planId", deletePlan);

module.exports = router;
