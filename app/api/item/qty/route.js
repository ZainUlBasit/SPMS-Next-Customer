import connectDB from "@/utils/db";
import { createError, successMessage } from "@/utils/ResponseMessage";
import Item from "@/models/Item";
import Company from "@/models/Company";
import Stock from "@/models/Stock";

connectDB();

//******************************************************
// working
//******************************************************
export async function POST(req, res, next) {
  const reqBody = await req.json();
  const { itemId, qty: newQty, purchase, invoice_no, truck_no, date } = reqBody;

  try {
    const updatedItem = await Item.findOneAndUpdate(
      { _id: itemId },
      { $inc: { qty: newQty } },
      { new: true } // This option returns the updated document
    );

    if (!updatedItem) {
      return createError(res, 500, "Failed to increment value");
    }

    const UpdateCompanyAccount = await Company.findOneAndUpdate(
      {
        _id: updatedItem.companyId,
      },
      {
        $inc: {
          total: Number(updatedItem.purchase) * Number(newQty),
          remaining: Number(updatedItem.purchase) * Number(newQty),
        },
      }
    );

    const UpdateStockStat = await new Stock({
      itemId: itemId,
      companyId: updatedItem.companyId,
      qty: newQty,
      purchase: purchase,
      total_amount: Number(purchase) * Number(newQty),
      invoice_no: invoice_no,
      truck_no: truck_no,
      date: Math.floor(new Date(date) / 1000),
    }).save();

    if (!UpdateCompanyAccount)
      return createError(res, 400, "Unable to update company accounts!");
    if (!UpdateStockStat)
      return createError(res, 400, "Unable to update Stock Statistics!");
    return successMessage(res, updatedItem, "Stock successfully added!");
  } catch (err) {
    return createError(res, 500, err.message || "Internal server error!");
  }
}
