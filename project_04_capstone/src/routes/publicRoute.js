const express = require("express");

const publicRoute = express.Router();

publicRoute.get("/message", (req, res, next) => {
  return res.status(200).json({ message: "This route is public" });
});

module.exports = publicRoute;
