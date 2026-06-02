const AuditLog = require("../model/AuditLog");

async function getReports(req, res, next) {
  try {
    const reports = await AuditLog.find();

    if(!reports){
      return res.status(404).json({ message: "No reports found" });
    }

    if (reports.length === 0) {
      return res.status(200).json({ reports: [], message: "No reports found" });
    }

    return res.status(200).json({ reports, message: "Reports fetched" });
  } catch (error) {
    console.error(error.message);
    next(error);
  }
}

module.exports = getReports;
