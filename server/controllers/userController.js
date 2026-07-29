const User = require("../models/User");

// @route  GET /api/users/students
const getAllStudents = async (req, res) => {
  try {
    const students = await User.find({ role: "student" }).select(
      "-password"
    );
    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @route  GET /api/users/me
const getMyProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @route  PUT /api/users/me
const updateMyProfile = async (req, res) => {
  try {
    const { name, course, branch, graduationYear, cgpa, skills, resume } =
      req.body;

    const user = await User.findByIdAndUpdate(
      req.user.id,
      { name, course, branch, graduationYear, cgpa, skills, resume },
      { new: true, runValidators: true }
    ).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = { getAllStudents, getMyProfile, updateMyProfile };