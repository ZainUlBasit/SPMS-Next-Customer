// Import your company model
const Company = require("@/models/Company");
const { createError, successMessage } = require("@/utils/ResponseMessage");

// Function to create a new company
exports.createCompany = async (req, res) => {
  try {
    const { name, contact, email, cnic, desc, address } = req.body;
    const company = await Company.create({
      name,
      contact,
      email,
      cnic,
      desc,
      address,
    });
    return successMessage(res, company, "Company Successfully Created!");
  } catch (error) {
    console.error("Error creating company:", error);
    return createError(res, 500, error.message || "Internal server error");
  }
};

// Function to get all companies
exports.getAllCompanies = async (req, res) => {
  try {
    const companies = await Company.find();
    res.status(200).json(companies);
  } catch (error) {
    console.error("Error getting companies:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Function to update a company
exports.updateCompany = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, contact, email, cnic, desc, address } = req.body;
    const updatedCompany = await Company.findByIdAndUpdate(
      id,
      { name, contact, email, cnic, desc, address },
      { new: true }
    );
    res.status(200).json(updatedCompany);
  } catch (error) {
    console.error("Error updating company:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Function to delete a company
exports.deleteCompany = async (req, res) => {
  try {
    const { id } = req.params;
    await Company.findByIdAndDelete(id);
    res.status(204).end();
  } catch (error) {
    console.error("Error deleting company:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
