require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const connectDB = require("./src/config/db");
const userRouter = require("./src/routes/userRoute");
const modRouter = require("./src/routes/modRoute");
const adminRouter = require("./src/routes/adminRoute");
const publicRoute = require("./src/routes/publicRoute");

const app = express();

app.use(express.json());
app.use(morgan("dev"));

const port = process.env.PORT;

app.use("/api/user", userRouter);
app.use("/api/moderator", modRouter);
app.use("/api/admin", adminRouter);
app.use("/api/public", publicRoute);

app.use((req, res) => {
  return res.status(404).json({ message: "route not found" });
});

app.use((error, req, res, next) => {
  console.error(error);
  res.status(500).json({ message: "internal server error" });
});

connectDB();
app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
