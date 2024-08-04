import connectDB from "@/utils/db";
import { createError, successMessage } from "@/utils/ResponseMessage";
import Customer from "@/models/Customer";
import Item from "@/models/Item";
import Product from "@/models/Product";
import Transaction from "@/models/Transaction";
import Return from "@/models/Return";

connectDB();

export async function POST(req, res, next) {
  const reqBody = await req.json();
  const {
    customerId,
    date = Math.floor(Date.now() / 1000),
    items,
    discount,
    invoice_no,
  } = reqBody;

  if (
    !customerId ||
    !date ||
    discount === "" ||
    invoice_no === "" ||
    Number(invoice_no) < 0
  )
    return createError(res, 422, "Required fields are undefined!");

  if (!Array.isArray(items))
    return createError(res, 422, "Items must be an array of objects!");

  try {
    const productIds = await Promise.all(
      items.map(async (item) => {
        const { itemId, qty, price, purchase, amount } = item;
        const savedProduct = await new Product({
          itemId,
          qty,
          price,
          purchase,
          amount,
        }).save();
        return savedProduct._id;
      })
    );
    let totalAmount = 0;
    await Promise.all(
      items.map(async (item) => {
        const { itemId, qty, amount } = item;
        const response = await Item.findByIdAndUpdate(
          itemId,
          { $inc: { qty: qty, out_qty: -qty } }, // Decrement qty field by decrementQty
          { new: true } // Return the updated document
        );
        totalAmount += amount;
      })
    );

    const transaction = await new Return({
      customerId,
      date: Math.floor(new Date(date) / 1000),
      discount,
      items: productIds,
      total_amount: totalAmount,
      invoice_no,
    }).save();

    if (!transaction) return createError(res, 400, "Unable to Add Return!");
    const updateCustomerAccount = await Customer.findByIdAndUpdate(
      customerId,
      {
        $inc: {
          return_amount: totalAmount,
          remaining: -Number(totalAmount),
        },
      }, // Decrement qty field by decrementQty
      { new: true }
    );
    return successMessage(res, transaction, "Return Successfully Added!");
  } catch (err) {
    console.log("Error Occur While Return: ", err);
    return createError(res, 500, err.message || err);
  }
}
