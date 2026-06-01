const express = require('express')

const app = express()

app.use((req, res) => {
  return res.status(404).json({ message: "route not found" });
});

app.use((error, req, res, next) => {
  console.error(error);
  res.status(500).json({ message: "internal server error" });
});
