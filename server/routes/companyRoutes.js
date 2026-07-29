const express = require("express");
const router = express.Router();
const {
  createCompany,
  getCompanies,
  getCompanyById,
  updateCompany,
  deleteCompany,
  getCompanyCount,
} = require("../controllers/companyController");
const { protect, adminOnly } = require("../middleware/authMiddleware");

// Public - must come before /:id
router.get("/public/count", getCompanyCount);

// Logged-in users
router.get("/", protect, getCompanies);
router.get("/:id", protect, getCompanyById);

// Admin only
router.post("/", protect, adminOnly, createCompany);
router.put("/:id", protect, adminOnly, updateCompany);
router.delete("/:id", protect, adminOnly, deleteCompany);

module.exports = router;