const express = require("express");
const DesignSystem = require("../controllers/DesignSystemController.js");
const { verifyToken } = require("../utils/auth.js");

const router = express.Router();

router.get("/design_system", verifyToken, DesignSystem.getAll);
router.post("/design_system", verifyToken, DesignSystem.create);
router.delete("/design_system/:id", verifyToken, DesignSystem.delete);

module.exports = router;
