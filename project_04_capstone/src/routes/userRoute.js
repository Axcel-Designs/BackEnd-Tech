const express = require("express");
const { signUp, signIn, profile } = require("../controllers/userController");
const protect = require("../middleware/authMiddleware");

const userRouter = express.Router();

userRouter.post("/signup", signUp);
userRouter.post("/signin", signIn);
userRouter.get("/profile", protect, profile);

module.exports = userRouter;
