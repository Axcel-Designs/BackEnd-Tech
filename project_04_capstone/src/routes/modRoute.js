const express = require("express");
const getReports = require("../controllers/modContollers");
const protect = require("../middleware/authMiddleware");

const modRouter = express.Router();

modRouter.get("/reports", protect, getReports);

module.exports = modRouter;
