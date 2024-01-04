const express = require("express");
const PageController = require("../controllers/PageController.js");
const { verifyToken } = require("../utils/auth");

const router = express.Router();

router.get("/pages/:id", verifyToken, PageController.get);
router.post("/pages", verifyToken, PageController.create);
router.get("/pages", verifyToken, PageController.getAll);
router.delete("/pages/:id", verifyToken, PageController.delete);

module.exports = router;
