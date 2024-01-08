const express = require("express");
const LoginController = require("../controllers/LoginController.js");
const { verifyToken } = require("../utils/auth");

const router = express.Router();

router.post("/login", LoginController.login);
router.post("/logout", verifyToken, LoginController.logout);
router.get("/token", LoginController.token);

module.exports = router;
