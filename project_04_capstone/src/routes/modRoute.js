const express = require("express");
const getReports = require("../controllers/modContollers");

const modRouter = express.Router();

modRouter.get("/reports",getReports);

module.exports = modRouter;
