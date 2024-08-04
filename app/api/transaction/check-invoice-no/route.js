import connectDB from "@/utils/db";
import { createError, successMessage } from "@/utils/ResponseMessage";
import Company from "@/models/Company";
import { NextResponse } from "next/server";
import Customer from "@/models/Customer";
import Payment from "@/models/Payment";
import Joi from "joi";
import Transaction from "@/models/Transaction";
import Return from "@/models/Return";

connectDB();

export async function POST(req, res, next) {
  const reqBody = await req.json();
  const { invoice_no } = reqBody;
  try {
    // Retrieve transactions for the given invoice number
    const returns = await Return.find({ invoice_no });
    const transactions = await Transaction.find({ invoice_no });

    if (transactions.length > 0 || returns.length > 0) {
      // If transactions exist with the given invoice number, return true
      return successMessage(
        res,
        { exists: true },
        "Invoice number already exists."
      );
    } else {
      // If no transactions are found with the given invoice number, return false
      return successMessage(
        res,
        { exists: false },
        "Invoice number is available."
      );
    }
  } catch (err) {
    console.error("Error occurred while checking invoice number:", err);
    return createError(res, 500, err.message || "Internal Server Error");
  }
}
