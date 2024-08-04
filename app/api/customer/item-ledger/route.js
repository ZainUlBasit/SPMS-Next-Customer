import Transaction from "@/models/Transaction";
import connectDB from "@/utils/db";
import { createError, successMessage } from "@/utils/ResponseMessage";

connectDB();

export async function POST(req, res) {
  try {
    const { customerId, from_date, to_date } = await req.json();

    // Validate dates
    if (!from_date || !to_date) {
      return createError(
        res,
        400,
        "Please provide both from_date and to_date."
      );
    }

    const fromDateObj = new Date(from_date);
    const toDateObj = new Date(to_date);

    // Validate if dates are valid
    if (isNaN(fromDateObj.getTime()) || isNaN(toDateObj.getTime())) {
      return createError(res, 400, "Invalid date format provided.");
    }

    const transactions = await Transaction.find({
      customerId,
      date: {
        $gte: Math.floor(new Date(from_date) / 1000),
        $lte: Math.floor(new Date(to_date) / 1000),
      },
    }).populate("itemId customerId");

    if (!transactions || transactions.length === 0) {
      return createError(
        res,
        404,
        "No transactions found for the given criteria."
      );
    }

    const UpdatedTransactions = transactions.flatMap((data) =>
      data.items.map((dt) => ({
        _id: dt._id,
        itemId: dt.itemId._id,
        date: data.date,
        invoice_no: data.invoice_no,
        name: dt.itemId.name,
        qty: dt.qty,
        purchase: dt.purchase,
        price: dt.price,
        amount: dt.amount,
      }))
    );

    return successMessage(
      res,
      UpdatedTransactions,
      "Item Ledger Successfully Retrieved!"
    );
  } catch (err) {
    return createError(res, 500, err.message || "Internal server error!");
  }
}
