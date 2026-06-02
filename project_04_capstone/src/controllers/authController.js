const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Account = require("../model/Account");
const AuditLog = require("../model/AuditLog");

// Secure SignUp Execution
async function signUp(req, res, next) {
  try {
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({ message: "All fields required" });
    }
    if (await Account.findOne({ email: req.body.email })) {
      return res.status(400).json({ message: "Email already in use" });
    }
    const newAccount = await Account.create(req.body);
    return res
      .status(201)
      .json({ account: newAccount, message: "Account created successfully" });
  } catch (error) {
    next(error);
  }
}

// Secure SignIn Execution with Advanced Locking Mechanics
async function signIn(req, res, next) {
  const { email, password } = req.body;
  const ipAddress =
    req.ip || req.headers["x-forwarded-for"] || req.socket.remoteAddress;

  try {
    if (!email || !password) {
      return res.status(400).json({ message: "All fields required" });
    }

    const account = await Account.findOne({ email: email.toLowerCase() });

    if (!account) {
      await AuditLog.create({ action: "FAILED_LOGIN", user: email, ipAddress });
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Check locking threshold window
    if (account.isLocked) {
      return res.status(423).json({
        message:
          "Account is temporarily locked due to multiple failed attempts. Try again later.",
      });
    }

    const isMatched = await bcrypt.compare(password, account.password);

    if (!isMatched) {
      account.loginAttempts += 1;

      // Lock processing condition block
      if (account.loginAttempts >= 5) {
        account.lockUntil = new Date(Date.now() + 15 * 60 * 1000); // Apply 15 minute timer constraint
      }

      await account.save();
      await AuditLog.create({
        action: "FAILED_LOGIN",
        user: account.email,
        ipAddress,
      });

      if (account.loginAttempts >= 5) {
        return res.status(423).json({
          message: "Account locked due to consecutive authentication failures.",
        });
      }
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Flush security attempt limits upon healthy baseline entry
    account.loginAttempts = 0;
    account.lockUntil = undefined;
    await account.save();

    const token = jwt.sign(
      { id: account._id, role: account.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" },
    ); // Explicit 1 hour policy constraint

    return res
      .status(200)
      .json({ account, token, message: "Signed in successfully" });
  } catch (error) {
    next(error);
  }
}

module.exports = { signUp, signIn };
