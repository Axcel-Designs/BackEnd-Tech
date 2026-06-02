const express = require("express");
const getReports = require("../controllers/modContollers");
const protect = require("../middleware/authMiddleware");
const { restrictTo } = require("../middleware/roleMiddleware");

const modRouter = express.Router();

modRouter.get(
  "/reports",
  protect,
  restrictTo("moderator", "admin"),
  getReports,
);

module.exports = modRouter;
