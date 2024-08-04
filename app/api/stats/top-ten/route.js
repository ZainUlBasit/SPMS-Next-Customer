import connectDB from "@/utils/db";
import { createError, successMessage } from "@/utils/ResponseMessage";
import Company from "@/models/Company";
import { NextResponse } from "next/server";
import Customer from "@/models/Customer";

connectDB();

export async function GET(req, res) {
  try {
    const companies = await Company.find().sort({ total: -1 }).limit(10);
    const customers = await Customer.find().sort({ total: -1 }).limit(10);
    if (!companies || companies.length === 0) {
      return createError(res, 400, "Unable to Get Companies data!");
    } else {
      const updatedDataCompany = companies.map((dt) => {
        return {
          salesAmount: dt.total,
          salesPayment: dt.paid,
          name: dt.name,
        };
      });
      const updatedDataCustomer = customers.map((dt) => {
        return {
          salesAmount: dt.total,
          salesPayment: dt.paid,
          name: dt.name,
        };
      });
      return successMessage(
        res,
        { customers: updatedDataCustomer, company: updatedDataCompany },
        "Data successfully retrieved!"
      );
    }
  } catch (err) {
    return createError(res, 500, err.message || "Internal server error!");
  }
}
