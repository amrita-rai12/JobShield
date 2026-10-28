const JobScan = require("../models/JobScan");
const { analyzeJob } = require("../services/riskAnalyzer");

const createScan = async (req, res, next) => {
  try {
    const {
      jobTitle,
      companyName,
      sourcePlatform,
      jobDescription,
      jobUrl
    } = req.body;

    // Validate required input
    if (
      typeof jobDescription !== "string" ||
      jobDescription.trim().length < 20
    ) {
      return res.status(400).json({
        success: false,
        message: "Job description must contain at least 20 characters."
      });
    }

    // Analyze the job description
    const analysis = analyzeJob(jobDescription);

    // Save the result in MongoDB
    const scan = await JobScan.create({
      user:req.user.id,
      jobTitle,
      companyName,
      sourcePlatform,
      jobDescription,
      jobUrl,
      riskScore: analysis.riskScore,
      riskLevel: analysis.riskLevel,
      detectedFlags: analysis.detectedFlags,
      analysisVersion: analysis.analysisVersion
    });

    return res.status(201).json({
      success: true,
      message: "Job analyzed successfully.",
      data: scan,
      disclaimer: analysis.disclaimer
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { createScan };
