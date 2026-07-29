const Application = require("../models/Application");

// @route  POST /api/applications
// Student applies to a company
const applyToCompany = async (req, res) => {
  try {
    const { companyId } = req.body;

    if (!companyId) {
      return res.status(400).json({ message: "Company ID is required" });
    }

    const existing = await Application.findOne({
      student: req.user.id,
      company: companyId,
    });

    if (existing) {
      return res
        .status(400)
        .json({ message: "You have already applied to this company" });
    }

    const application = await Application.create({
      student: req.user.id,
      company: companyId,
    });

    res.status(201).json(application);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @route  GET /api/applications/my
// Student views their own applications
const getMyApplications = async (req, res) => {
  try {
    const applications = await Application.find({ student: req.user.id })
      .populate("company")
      .sort({ createdAt: -1 });

    res.status(200).json(applications);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @route  GET /api/applications
// Admin views all applications
const getAllApplications = async (req, res) => {
  try {
    const applications = await Application.find()
      .populate("company")
      .populate("student", "name email course branch")
      .sort({ createdAt: -1 });

    res.status(200).json(applications);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @route  PUT /api/applications/:id
// Admin updates application status
const updateApplicationStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const application = await Application.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    );

    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }

    res.status(200).json(application);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = {
  applyToCompany,
  getMyApplications,
  getAllApplications,
  updateApplicationStatus,
};