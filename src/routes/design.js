const express = require("express");
const Design = require("../controllers/DesignController.js");
const { verifyToken } = require("../utils/auth.js");

const router = express.Router();

router.get("/design/:pageId", verifyToken, Design.getAll);
router.post("/design", verifyToken, Design.create);
router.delete("/design/:id", verifyToken, Design.delete);

module.exports = router;
