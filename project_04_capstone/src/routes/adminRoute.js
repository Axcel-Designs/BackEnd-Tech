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

adminRouter.get("/", protect, getAllUsers);
adminRouter.get("/:id", protect,  getUser);
adminRouter.delete("/:id", protect, restrictTo("admin"), delUser);
adminRouter.post("/promote/:id",protect, restrictTo("admin"), setAdmin);

module.exports = adminRouter;
