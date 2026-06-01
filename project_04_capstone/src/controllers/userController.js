const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const Account = require("../model/schema");
const AuditLog = require("../model/AuditLog");

// sign Up
async function signUp(req, res, next) {
  try {
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({ message: "All fields required" });
    }

    if (await Account.findOne({ email: req.body.email })) {
      return res.status(400).json({ message: "Email already in use" });
    }
    const newAcount = await Account.create(req.body);

    res
      .status(201)
      .json({ account: newAcount, message: "Account created successfully" });
  } catch (error) {
    console.error(`Error Message: `, error.message);
    next(error);
  }
}
// Sign in
async function signIn(req, res, next) {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res.status(400).json({ message: "All fields required" });
    }

    const account = await Account.findOne({ email: email.toLowerCase() });

    if (!account) {
       await AuditLog.create({
         action: "FAILED_LOGIN",
         user: email,
         ipAddress,
       });
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const isMatched = await bcrypt.compare(password, account.password);
    if (!isMatched) {
      return res.status(400).json({ message: "Invalid Email or Password" });
    }
    const token = jwt.sign({ id: account._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    return res
      .status(200)
      .json({ account, token, message: "Signed in sucessfully" });
  } catch (error) {
    console.error(error.message);
    next(error);
  }
}
// profile
async function profile(req, res, next) {
  try {
    // auth middlwware is proctecting profile
    // if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    //   return res.status(400).json({ message: "Account profile not found" });
    // }

    // const account = await Account.findById(req.params.id);
    // if (!account) {
    //   return res.status(404).json({ message: "Account profile not found" });
    // }

    return res
      .status(200)
      .json({ account, message: "Profile fetched successfully" });
  } catch (error) {
    console.error(error.message);
    next(error);
  }
}

module.exports = {
  signUp,
  signIn,
  profile,
};
