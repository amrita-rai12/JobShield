const express = require("express");
const { getScanHistory,deleteScan} = require("../controllers/historyController");
const {protect} = require('../middleware/authMiddleware');

const router = express.Router();

router.get("/", protect, getScanHistory);
router.delete("/:id", protect, deleteScan);

module.exports = router;
