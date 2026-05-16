const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
// dotenv.config({ path: ".env.example" });
dotenv.config();

const server = express();

server.use(express.json());

const port = process.env.PORT;
const mongodbURI = process.env.MONGODB_URI;

if (!mongodbURI) {
  console.error("Error: MONGODB_URI is not defined in the .env file.");
}

async function db() {
  try {
    await mongoose.connect(mongodbURI);
    console.log(mongodbURI);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

const providerSchema = new mongoose.Schema({
  fullName: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  phoneNumber: { type: String, required: true },
  skillCategory: { type: String, required: true },
  gender: { type: String, enum: ["Male", "Female", "Other"] },
  address: { type: String },
  isVerified: { type: Boolean, default: false },
});

const Provider = mongoose.model("provider", providerSchema);

// Create Provider
server.post("/providers", async (req, res, next) => {
  try {
    const existingProvider = await Provider.findOne({
      email: req.body.email,
    });

    if (existingProvider) {
      return res.status(409).json({
        message: "Profile already exists with this email.",
      });
    }
    const newProvider = await Provider.create(req.body);
    // const newProvider = new Provider(req.body);
    await newProvider.save();
    res
      .status(201)
      .json({ message: "successfully added", provider: newProvider });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// get all contractors with filter skills
server.get("/providers", async (req, res, next) => {
  try {
    const { skill } = req.query;

    let filter = {};
    if (skill) {
      filter.skillCategory = skill;
    }
    const providers = await Provider.find(filter);
    if (providers.length == 0) {
      return res.status(404).json({ message: "providers not-found" });
    }
    return res.status(200).json({ count: providers.length, providers });
  } catch (error) {
    console.error("server couldnt fetch", error);
    next(error);
  }
});
// get by id
server.get("/providers/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    const provider = await Provider.findById(id);
    if (!provider) {
      return res.status(404).json({ message: "no provider found" });
    }
    return res.status(200).json({ provider });
  } catch (error) {
    console.error("server couldnt fetch", error);
    next(error);
  }
});
// get by id and verify
server.get("/providers/:id/verify", async (req, res, next) => {
  const { id } = req.params;
  try {
    const provider = await Provider.findById(id, { isVerified: true });
    if (!provider) {
      return res.status(404).json({ message: "no provider found" });
    }
    return res.status(200).json({ provider });
  } catch (error) {
    console.error("server couldnt fetch", error);
    next(error);
  }
});

// update by id
server.patch("/providers/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    const provider = await Provider.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!provider) {
      return res.status(404).json({ message: "no provider found" });
    }
    return res.status(200).json({ provider });
  } catch (error) {
    console.error("server couldnt fetch", error);
    next(error);
  }
});
// delete by id
server.delete("/providers/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    const contractor = await Provider.findByIdAndDelete(id);
    if (!contractor) {
      return res.status(404).json({ message: "no provider found" });
    }
    return res.status(200).json({ message: "provider deleted sucessfully" });
  } catch (error) {
    console.error("server couldnt fetch", error);
    next(error);
  }
});

server.use((req, res) => {
  return res.status(404).json({ message: "route not available" });
});

server.use((error, req, res, next) => {
  console.error(error);

  res.status(500).json({ message: "internal server error" });
});

server.listen(port, () => {
  db();
  console.log(`Server is running and listening on port ${port}`);
});
