const express = require("express");
const PageController = require("../controllers/PageController.js");
const { verifyToken } = require("../utils/auth");

const router = express.Router();

router.get("/page/:id", verifyToken, PageController.get);
router.post("/page", verifyToken, PageController.create);
router.get("/pages/:websiteId", verifyToken, PageController.getAll);
router.delete("/page/:id", verifyToken, PageController.delete);

module.exports = router;
