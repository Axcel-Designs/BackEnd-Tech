const mongoose = require("mongoose");

const auditLogSchema = new mongoose.Schema(
  {
    action: {
      type: String,
      required: true,
      enum: [
        "FAILED_LOGIN",
        "FORBIDDEN_ACCESS",
        "ACCOUNT_DELETED",
        "ACCOUNT_PROMOTED",
      ],
    },
    user: { type: String, default: "Anonymous/Unknown" },
    ipAddress: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
  },
  { versionKey: false },
);

const AuditLog = mongoose.model("AuditLog", auditLogSchema);
module.exports = mongoose.models.AuditLog || AuditLog;
