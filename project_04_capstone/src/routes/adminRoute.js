const express = require("express");
const {
  getAllUsers,
  getUser,
  delUser,
  setAdmin,
} = require("../controllers/adminControllers");
const protect = require("../middleware/authMiddleware");
const { restrictTo } = require("../middleware/roleMiddleware");
const adminRouter = express.Router();

adminRouter.get("/users", protect, getAllUsers);
adminRouter.get("/user/:id", protect,  getUser);
adminRouter.delete("/user/:id", protect, restrictTo("admin"), delUser);
adminRouter.patch("/setAdmin/:id",protect, restrictTo("admin"), setAdmin);

module.exports = adminRouter;
