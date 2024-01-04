const express = require("express");
const UserController = require("../controllers/UserController.js");
const { verifyToken } = require("../utils/auth");

const router = express.Router();

router.post("/users", verifyToken, UserController.create);
router.get("/users", verifyToken, UserController.getAll);
router.get("/user/:id", verifyToken, UserController.get);
router.delete("/user/:id", verifyToken, UserController.delete);

module.exports = router;
