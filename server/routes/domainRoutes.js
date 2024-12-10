const express = require("express");
const {
  checkDomain,
  registerDomain,
} = require("../controllers/domainControler");
const verifyToken = require("../middlewares/verifyToken");

const router = express.Router();

router.post("/check", verifyToken, checkDomain);
router.post("/register", verifyToken, registerDomain);

module.exports = router;
