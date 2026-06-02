const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const accountSchema = new mongoose.Schema(
  {
    fullName: { type: String, trim: true, required: true },
    email: { type: String, unique: true, required: true, lowercase: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ["user", "moderator", "admin"],
      default: "user",
      required: true,
    },
    loginAttempts: { type: Number, required: true, default: 0 },
    lockUntil: { type: Date },
  },
  { timestamps: true, versionKey: false },
);

// Compiles a virtual flag to inspect if the lock period is still active
accountSchema.virtual("isLocked").get(function () {
  return !!(this.lockUntil && this.lockUntil > Date.now());
});

accountSchema.pre("save", async function () {
  // Only hash the password if it's new or being updated
  if (!this.isModified("password")) return;

  try {
    this.password = await bcrypt.hash(this.password, 10);
  } catch (error) {
    throw error;
  }
});
// Security Helper: Automatically removes password from JSON responses
accountSchema.set("toJSON", {
  transform: (doc, ret) => {
    delete ret.password; // Prevents leaking the hashed password over the network
    delete ret.loginAttempts; 
    delete ret.lockUntil; 
    
    return ret;
  },
});

const Account = mongoose.model("Account", accountSchema);
module.exports = mongoose.models.Account || Account;
