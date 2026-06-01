const Account = require("../model/schema");

// setAdmin
async function setAdmin(req, res, next) {
  try {
    const account = await Account.findById(req.params.id);

    if (!account) {
      return res.status(404).json({ message: "user not found" });
    }
    account.role = "admin";
    await account.save();

    return res.status(200).json({ message: "user role Updated to admin" });
  } catch (error) {
    console.error(error.message);
    next(error);
  }
}
// del users
async function delUser(req, res, next) {
  try {
    await Account.findByIdAndDelete(req.params.id);

    if( req.Account.role !== 'admin'){
      return res.status(400).json({ message: "forbidden" });
    }

    if (!(await Account.findByIdAndDelete(req.params.id))) {
      return res.status(404).json({ message: "user not found" });
    }

    return res.status(200).json({ message: "user Deleted Sucessfully" });
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
