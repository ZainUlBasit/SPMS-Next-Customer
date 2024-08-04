const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  type: { type: Number, enum: [1, 2], required: true }, // 1: Admin , 2: Customer
  customerId: { type: mongoose.Types.ObjectId, ref: "Customer" },
});

export default mongoose.models.User || mongoose.model("User", userSchema);
