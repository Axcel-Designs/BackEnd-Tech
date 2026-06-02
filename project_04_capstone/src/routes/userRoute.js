const express = require("express");
const protect = require("../middleware/authMiddleware");
const { signUp, signIn } = require("../controllers/authController");
const { profile } = require("../controllers/userController");

const userRouter = express.Router();

userRouter.post("/signup", signUp);
userRouter.post("/signin", signIn);
userRouter.get("/profile", protect, profile);

module.exports = userRouter;
