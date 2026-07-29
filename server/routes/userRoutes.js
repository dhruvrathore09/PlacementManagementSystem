const express = require("express");
const router = express.Router();
const {
  getAllStudents,
  getMyProfile,
  updateMyProfile,
} = require("../controllers/userController");
const { protect, adminOnly } = require("../middleware/authMiddleware");

router.get("/students", protect, adminOnly, getAllStudents);
router.get("/me", protect, getMyProfile);
router.put("/me", protect, updateMyProfile);

module.exports = router;