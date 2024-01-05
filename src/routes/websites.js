const express = require("express");
const WebsiteController = require("../controllers/WebsiteController.js");
const { verifyToken } = require("../utils/auth.js");

const router = express.Router();

router.get("/website/:id", verifyToken, WebsiteController.get);
router.post("/website", verifyToken, WebsiteController.create);
router.get("/websites", verifyToken, WebsiteController.getAll);
router.delete("/website/:id", verifyToken, WebsiteController.delete);

module.exports = router;
