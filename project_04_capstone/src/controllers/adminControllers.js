const Account = require("../model/Account");
const AuditLog = require("../model/AuditLog");

// setAdmin
async function setAdmin(req, res, next) {
  const ipAddress = req.ip || req.socket.remoteAddress;
  try {
    // if (!req.body.role || !["moderator", "admin"].includes(role)) {
    //   return res
    //     .status(400)
    //     .json({ message: "Invalid designation update mapping parameter" });
    // }

    const account = await Account.findById(req.params.id);

    if (!account) {
      return res.status(404).json({ message: "Account not found" });
    }

    if (account.role === "admin") {
      return res.status(400).json({
        message:
          "Action barred: account configuration already maps to terminal administrative parameters.",
      });
    }

    account.role = "admin";
    await account.save();

    await AuditLog.create({
      action: "ACCOUNT_PROMOTED",
      user: account.email,
      ipAddress,
    });

    return res.status(200).json({ message: "Account role Updated to admin" });
  } catch (error) {
    console.error(error.message);
    next(error);
  }
}
// del users
async function delUser(req, res, next) {
  const ipAddress = req.ip || req.socket.remoteAddress;
  try {
    if (req.user._id.toString() === req.params.id) {
      return res.status(400).json({
        message:
          "Operation forbidden: Administrative profiles cannot execute self deletion paths.",
      });
    }
    const targetAccount = await Account.findById(req.params.id);

    if (!targetAccount) {
      return res.status(404).json({ message: "Account not found" });
    }
    if (targetAccount.role !== "admin") {
      return res.status(400).json({ message: "forbidden" });
    }
    
    await Account.findByIdAndDelete(req.params.id);

    await AuditLog.create({
      action: "ACCOUNT_DELETED",
      user: targetAccount.email,
      ipAddress,
    });

    return res.status(200).json({ message: "Account Deleted Sucessfully" });
  } catch (error) {
    console.error(error.message);
    next(error);
  }
}

// get all users
async function getAllUsers(req, res, next) {
  try {
    const account = await Account.find();

    return res.status(200).json({ account, message: "All users fetched" });
  } catch (error) {
    console.error(error.message);
    next(error);
  }
}
// get a user
async function getUser(req, res, next) {
  try {
    const account = await Account.findById(req.params.id);

    if (!account) {
      return res.status(404).json({ message: "user not found" });
    }

    return res.status(200).json({ account, message: "user fetched" });
  } catch (error) {
    console.error(error.message);
    next(error);
  }
}

module.exports = { setAdmin, delUser, getAllUsers, getUser };
