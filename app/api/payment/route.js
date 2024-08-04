import connectDB from "@/utils/db";
import {
  createCompany,
  getAllCompanies,
  updateCompany,
  deleteCompany,
} from "../../../controllers/CompanyController";
import { createError, successMessage } from "@/utils/ResponseMessage";
import Company from "@/models/Company";
import { NextResponse } from "next/server";
import Customer from "@/models/Customer";
import Payment from "@/models/Payment";
import Joi from "joi";

connectDB();

export async function POST(req, res, next) {
  const reqBody = await req.json();
  const {
    user_type,
    user_Id,
    user_name,
    depositor,
    payment_type,
    bank_name,
    bank_number,
    amount,
    date,
    desc,
    branch,
  } = reqBody;

  const reqStr = Joi.string().required();
  const reqNum = Joi.number().required();

  const paymentSchema = Joi.object({
    user_type: Joi.number().valid(1, 2).required(),
    user_Id: reqStr,
    user_name: reqStr,
    depositor: reqStr,
    payment_type: Joi.number().valid(1, 2).required(),
    bank_name: reqStr.allow(null), // Allow null for Cash payments
    bank_number: reqNum.allow(null), // Allow null for Cash payments
    amount: reqNum,
    date: reqNum.default(() => Math.floor(Date.now() / 1000)),
    desc: reqStr,
    branch: reqNum,
  });

  const { error } = paymentSchema.validate(reqBody.values);
  if (error) {
    return createError(res, 422, error.message);
  }

  try {
    if (user_type === 2 || user_type === "2") {
      const updateCustomerAccount = await Customer.findByIdAndUpdate(
        user_Id,
        { $inc: { paid: amount, remaining: amount * -1 } }, // Decrement qty field by decrementQty
        { new: true }
      );

      if (!updateCustomerAccount)
        return createError(res, 400, "Unable to update customer accounts!");
    } else if (user_type === 1 || user_type === "1") {
      const updateValue = {
        $inc: { paid: amount, remaining: amount * -1 },
      };
      const updatedCompany = await Company.findByIdAndUpdate(
        user_Id,
        updateValue,
        { new: true }
      );
      if (!updatedCompany)
        return createError(res, 400, "Unable to update company accounts!");
    }

    const newPayment = await new Payment({
      user_type,
      user_Id,
      user_name,
      depositor,
      payment_type,
      bank_name,
      bank_number,
      amount,
      date: Math.floor(new Date(date) / 1000),
      desc,
    }).save();

    if (!newPayment) return createError(res, 400, "Unable to add new Payment!");
    else return successMessage(res, newPayment, "Payment Successfully Added!");
  } catch (err) {
    return createError(res, 500, err.message || "Internal Server Error!");
  }
}
export async function GET(req, res) {
  const { id } = req.query;
  try {
    const payments = await Payment.find({ user_Id: id });
    if (!payments) return createError(res, 400, "Unable to Get Payments data!");
    else
      return successMessage(
        res,
        payments,
        "Payment data successfully retrieved!"
      );
  } catch (err) {
    return createError(res, 500, err.message || "Internal server error!");
  }
}
export async function PATCH(req, res) {
  const reqBody = await req.json();
  console.log(reqBody);
  const { name, contact, email, cnic, desc, address, companyId } = reqBody;

  const Payload = {
    name,
    contact,
    email,
    cnic,
    desc,
    address,
  };

  if (
    companyId === "" ||
    name === "" ||
    contact === "" ||
    email === "" ||
    cnic === "" ||
    desc === "" ||
    address === ""
  ) {
    return createError(res, 422, "Required field are undefined!");
  }

  try {
    let company = await Company.findById(companyId);
    if (!company)
      return createError(res, 404, "Customer with such id was not found!");
    // Update item properties
    Object.assign(company, Payload);
    // Save the updated item
    await company.save();
    return successMessage(res, company, "Company Successfully Updated!");
  } catch (err) {
    console.log(err);
    return createError(res, 500, err.message || err);
  }
}
export async function DELETE(req, res) {
  const reqBody = await req.json();
  const { companyId } = reqBody;
  if (!companyId) return createError(res, 422, "Invalid Customer Id!");

  try {
    const DeleteCompany = await Company.findByIdAndDelete(companyId);
    if (!DeleteCompany)
      return createError(
        res,
        400,
        "Such Company with companyId does not exist!"
      );
    else
      return successMessage(
        res,
        DeleteCompany,
        `${DeleteCompany.name} is successfully deleted!`
      );
  } catch (err) {
    return createError(res, 500, err.message || err);
  }
}
