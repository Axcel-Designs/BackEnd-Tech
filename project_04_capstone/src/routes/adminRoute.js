const express = require("express");
const {
  getAllUsers,
  getUser,
  delUser,
  setAdmin,
} = require("../controllers/adminControllers");
const protect = require("../middleware/authMiddleware");
const adminRouter = express.Router();

adminRouter.get("/users", protect, getAllUsers);
adminRouter.get("/user/:id", protect, getUser);
adminRouter.delete("/user/:id", protect, delUser);
adminRouter.patch("/setAdmin/:id", setAdmin);

module.exports = adminRouter;
