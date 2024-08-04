import Transaction from "@/models/Transaction";
import connectDB from "@/utils/db";
import { createError, successMessage } from "@/utils/ResponseMessage";
import Joi from "joi";

connectDB();

export async function POST(req, res, next) {
  const reqBody = await req.json();
  const { customerId, from_date, to_date } = reqBody;

  const reqStr = Joi.string().required();

  const paymentSchema = Joi.object({
    customerId: reqStr,
  });

  const { error } = paymentSchema.validate(reqBody.values);
  if (error) {
    return createError(res, 422, error.message);
  }

  try {
    const transactions = await Transaction.find({
      customerId,
      date: {
        $gte: Math.floor(new Date(from_date) / 1000),
        $lte: Math.floor(new Date(to_date) / 1000),
      },
    })
      .populate("customerId")
      .populate({
        path: "items",
        populate: { path: "itemId" }, // Populate the itemId field inside the items array
      });

    const UpdatedTransactions = transactions
      .map((data) => {
        const itemsData = data.items.map((dt) => {
          return {
            _id: dt._id,
            itemId: dt.itemId._id,
            date: data.date,
            invoice_no: data.invoice_no,
            name: dt.itemId.name,
            qty: dt.qty,
            purchase: dt.purchase,
            price: dt.price,
            amount: dt.amount,
          };
        });
        return itemsData;
      })
      .flat();

    if (!transactions)
      return createError(res, 400, "Unable to Get Item Ledger data!");
    else
      return successMessage(
        res,
        UpdatedTransactions,
        "Item Ledger Successfully retrieved!"
      );
  } catch (err) {
    return createError(res, 500, err.message || "Internal server error!");
  }
}
