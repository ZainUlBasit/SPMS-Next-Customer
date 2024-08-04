// models/Company.js
import mongoose from "mongoose";

const itemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  code: { type: String, required: true },
  companyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Company",
    required: true,
  },
  // companyId: { type: mongoose.Types.ObjectId, ref: "Company" },
  purchase: { type: Number, required: true },
  sale: { type: Number, required: true },
  desc: { type: String, required: true },
  qty: { type: Number, default: 0, required: true },
});

export default mongoose.models.Item || mongoose.model("Item", itemSchema);
