const express = require("express");
const { createScan } = require("../controllers/scanController");
const validateScan = require('../middleware/validateScan');
const {protect} = require('../middleware/authMiddleware');

const router = express.Router();

// Analyze a job description and save the result
router.post("/", protect, validateScan, createScan);

module.exports = router;
