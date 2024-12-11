const express = require("express");
const {
  checkDomain,
  registerDomain,
  handleSuccess,
  handleCancel,
} = require("../controllers/domainControler");
const verifyToken = require("../middlewares/verifyToken");

const router = express.Router();

router.post("/check", verifyToken, checkDomain);
router.post("/register", verifyToken, registerDomain);
router.post("/success", verifyToken, handleSuccess);
router.post("/cancel", verifyToken, handleCancel);

module.exports = router;
