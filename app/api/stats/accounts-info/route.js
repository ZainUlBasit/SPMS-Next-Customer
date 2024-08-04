import connectDB from "@/utils/db";
import { createError, successMessage } from "@/utils/ResponseMessage";
import Company from "@/models/Company";
import { NextResponse } from "next/server";
import Customer from "@/models/Customer";

connectDB();

export async function GET(req, res) {
  try {
    const companies = await Company.find();
    const customers = await Customer.find();
    const total_payable = companies.reduce((total, trans) => {
      return total + trans.remaining; // Assuming 'amount' is the field you want to sum
    }, 0);
    const total_recievable = customers.reduce((total, trans) => {
      return total + trans.remaining; // Assuming 'amount' is the field you want to sum
    }, 0);
    if (!companies || companies.length === 0) {
      return createError(res, 400, "Unable to Get Companies data!");
    } else {
      return successMessage(
        res,
        { payable: total_payable, receivable: total_recievable },
        "Data successfully retrieved!"
      );
    }
  } catch (err) {
    return createError(res, 500, err.message || "Internal server error!");
  }
}
