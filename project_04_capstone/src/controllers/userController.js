async function profile(req, res, next) {
  try {
    return res
      .status(200)
      .json({ account: req.user, message: "Profile fetched successfully" });
  } catch (error) {
    console.error(error.message);
    next(error);
  }
}

module.exports = { profile };
