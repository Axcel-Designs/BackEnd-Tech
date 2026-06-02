function notFound(req, res) {
  return res.status(404).json({ message: "route not found" });
}

function errorHandler(error, req, res, next) {
  console.error(error);
  res.status(500).json({ message: "internal server error" });
}

module.exports = { notFound, errorHandler };
