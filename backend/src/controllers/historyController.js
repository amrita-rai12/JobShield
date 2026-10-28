const mongoose = require("mongoose");
const JobScan = require("../models/JobScan");

// GET /api/scans
const getScanHistory = async (req, res, next) => {
  try {
    const page = Math.max(1, parseInt(req.query.page, 10) || 1);
    const limit = Math.min(
      50,
      Math.max(1, parseInt(req.query.limit, 10) || 10)
    );

    const scans = await JobScan.find({
        user:req.user.id
    })
      .select("-jobDescription")
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .lean();

    const total = await JobScan.countDocuments({
        user:req.user.id
    });

    res.status(200).json({
      success: true,
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
      data: scans
    });
  } catch (error) {
    next(error);
  }
};

// DELETE /api/scans/:id
const deleteScan = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid scan ID."
      });
    }

    const scan = await JobScan.findOneAndDelete({
        _id:id,
        user:req.user.id
    });

    if (!scan) {
      return res.status(404).json({
        success: false,
        message: "Scan not found."
      });
    }

    return res.status(200).json({
      success: true,
      message: "Scan deleted successfully."
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getScanHistory,
  deleteScan
};
