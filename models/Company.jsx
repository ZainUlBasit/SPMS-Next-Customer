// models/Company.js
import mongoose from "mongoose";

const companySchema = new mongoose.Schema({
  name: { type: String, required: true },
  contact: { type: String, required: true },
  email: { type: String, required: true },
  cnic: { type: String, required: true },
  desc: { type: String, required: true },
  address: { type: String, required: true },
  total: { type: Number, required: true, default: 0 },
  paid: { type: Number, required: true, default: 0 },
  remaining: { type: Number, required: true, default: 0 },
});

export default mongoose.models.Company ||
  mongoose.model("Company", companySchema);
