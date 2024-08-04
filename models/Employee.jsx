const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// Name
// Contact
// Email
// Password
// Confirm Password
// Cnic
// Address
// Shop

const reqStr = {
  type: String,
  required: true,
};
const reqNum = {
  type: Number,
  required: true,
};

const EmployeeSchema = new Schema({
  name: reqStr,
  email: reqStr,
  cnic: reqStr,
  contact: reqStr,
  address: reqStr,
});

module.exports =
  mongoose.models.Employee || mongoose.model("Employee", EmployeeSchema);
