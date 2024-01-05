const express = require("express");
const Style = require("../controllers/StyleController.js");
const { verifyToken } = require("../utils/auth.js");

const router = express.Router();

router.post("/design/style", verifyToken, Style.create);
router.delete("/design/style/:id", verifyToken, Style.delete);

module.exports = router;
