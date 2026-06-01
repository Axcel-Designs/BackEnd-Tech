const AuditLog = require("../model/AuditLog");

function restrictTo(...allowedRoles) {
  return async (req, res, next) => {
    if (!req.user || !allowedRoles.includes(req.user.role)) {
      const ipAddress = req.ip || req.socket.remoteAddress;

      // Automated tracking trace record generation layout
      await AuditLog.create({
        action: "FORBIDDEN_ACCESS",
        user: req.user ? req.user.email : "Unauthenticated Guest",
        ipAddress,
      });

      return res.status(403).json({
        message:
          "Access Denied: Inadequate authorization profiles for this endpoint execution path.",
      });
    }
    next();
  };
}

module.exports = { restrictTo };
