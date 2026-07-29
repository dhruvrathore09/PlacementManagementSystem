const express = require("express");
const router = express.Router();
const {
  applyToCompany,
  getMyApplications,
  getAllApplications,
  updateApplicationStatus,
} = require("../controllers/applicationController");
const { protect, adminOnly } = require("../middleware/authMiddleware");

router.post("/", protect, applyToCompany);
router.get("/my", protect, getMyApplications);
router.get("/", protect, adminOnly, getAllApplications);
router.put("/:id", protect, adminOnly, updateApplicationStatus);

module.exports = router;