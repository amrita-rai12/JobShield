function validateScan(req, res, next) {
  const {
    jobDescription,
    sourcePlatform,
    jobTitle,
    companyName
  } = req.body || {};

  if (
    typeof jobDescription !== "string" ||
    jobDescription.trim().length < 20
  ) {
    return res.status(400).json({
      success: false,
      message: "Job description must contain at least 20 characters."
    });
  }

  if (jobDescription.length > 20000) {
    return res.status(400).json({
      success: false,
      message: "Job description cannot exceed 20000 characters."
    });
  }

  const allowedPlatforms = [
    "LinkedIn",
    "Naukri",
    "Unstop",
    "Company Website",
    "Other"
  ];

  if (
    sourcePlatform !== undefined &&
    !allowedPlatforms.includes(sourcePlatform)
  ) {
    return res.status(400).json({
      success: false,
      message: "Invalid source platform."
    });
  }

  for (const [field, value] of Object.entries({
    jobTitle,
    companyName
  })) {
    if (
      value !== undefined &&
      (typeof value !== "string" || value.length > 200)
    ) {
      return res.status(400).json({
        success: false,
        message: `${field} must be a string of at most 200 characters.`
      });
    }
  }

  next();
}

module.exports = validateScan;
