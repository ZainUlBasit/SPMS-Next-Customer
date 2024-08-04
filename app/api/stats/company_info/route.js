import connectDB from "@/utils/db";
import { createError, successMessage } from "@/utils/ResponseMessage";
import Company from "@/models/Company";
import { NextResponse } from "next/server";
import Customer from "@/models/Customer";
import Payment from "@/models/Payment";
import Joi from "joi";
import Item from "@/models/Item";
import Transaction from "@/models/Transaction";

connectDB();

export async function GET(req, res) {
  // Get current date
  const currentDate = new Date();

  // Set to the first day of the current month
  const firstDayOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  );
  firstDayOfMonth.setHours(0, 0, 0, 0); // Set time to 00:00:00

  // Set to the last day of the current month
  const lastDayOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0
  );
  lastDayOfMonth.setHours(23, 59, 59, 999); // Set time to 23:59:59.999

  try {
    const Companies = await Company.find();
    const Items = await Item.find();
    const Customers = await Customer.find();
    const transactions = await Transaction.find({
      date: {
        $gte: Math.floor(new Date(firstDayOfMonth) / 1000),
        $lte: Math.floor(new Date(lastDayOfMonth) / 1000),
      },
    });
    const payments = await Payment.find({
      date: {
        $gte: Math.floor(new Date(firstDayOfMonth) / 1000),
        $lte: Math.floor(new Date(lastDayOfMonth) / 1000),
      },
    });

    const total_sale = transactions.reduce((total, trans) => {
      return total + trans.total_amount; // Assuming 'amount' is the field you want to sum
    }, 0);

    const total_payment = payments.reduce((total, trans) => {
      return total + trans.amount; // Assuming 'amount' is the field you want to sum
    }, 0);

    return successMessage(
      res,
      {
        no_of_company: Companies.length,
        no_of_items: Items.length,
        no_of_customer: Customers.length,
        monthly_sales: total_sale,
        monthly_payments: total_payment,
      },
      "Payment data successfully retrieved!"
    );
  } catch (err) {
    return createError(res, 500, err.message || "Internal server error!");
  }
}
