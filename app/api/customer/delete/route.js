import connectDB from "@/utils/db";
import { createError, successMessage } from "@/utils/ResponseMessage";
import Customer from "@/models/Customer";

connectDB();

export async function POST(req, res) {
  const reqBody = await req.json();
  const { customerId } = reqBody;
  if (!customerId) return createError(res, 422, "Invalid Customer Id!");

  try {
    const DeleteCustomer = await Customer.findByIdAndDelete(customerId);
    if (!DeleteCustomer)
      return createError(
        res,
        400,
        "Such Customer with CustomerId does not exist!"
      );
    else
      return successMessage(
        res,
        DeleteCustomer,
        `${DeleteCustomer.name} is successfully deleted!`
      );
  } catch (err) {
    return createError(res, 500, err.message || err);
  }
}
