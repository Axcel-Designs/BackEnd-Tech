const express = require("express");
const {
  getAllUsers,
  getUser,
  delAccount,
  setAdmin,
} = require("../controllers/adminControllers");
const protect = require("../middleware/authMiddleware");
const { restrictTo } = require("../middleware/roleMiddleware");
const adminRouter = express.Router();

adminRouter.get("/users", protect, getAllUsers);
adminRouter.get("/user/:id", protect, getUser);
adminRouter.delete("/delaccount/:id", protect, restrictTo("admin"), delAccount);
adminRouter.post("/promote/:id", protect, restrictTo("admin"), setAdmin);

module.exports = adminRouter;
