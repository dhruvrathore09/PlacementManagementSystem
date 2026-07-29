const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["student", "recruiter", "admin"],
      default: "student",
    },

    // Student-specific fields
    course: {
      type: String,
    },
    branch: {
      type: String,
    },
    graduationYear: {
      type: Number,
    },
    cgpa: {
      type: Number,
    },
    skills: {
      type: String,
    },
    resume: {
      type: String,
    },

    // Recruiter-specific fields
    companyName: {
      type: String,
    },
    designation: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);