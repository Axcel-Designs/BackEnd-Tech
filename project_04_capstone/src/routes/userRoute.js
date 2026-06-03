const express = require("express");
const protect = require("../middleware/authMiddleware");
const { signUp, signIn } = require("../controllers/authController");
const { profile } = require("../controllers/userController");

const authRouter = express.Router();

authRouter.post("/signup", signUp);
authRouter.post("/signin", signIn);
authRouter.get("/profile", protect, profile);

module.exports = authRouter;
