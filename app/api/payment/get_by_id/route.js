import connectDB from "@/utils/db";
import { createError, successMessage } from "@/utils/ResponseMessage";
import Payment from "@/models/Payment";
import Joi from "joi";

connectDB();

export async function POST(req, res, next) {
  const reqBody = await req.json();
  const { user_Id, from_date, to_date } = reqBody;

  const reqStr = Joi.string().required();

  const paymentSchema = Joi.object({
    user_Id: reqStr,
  });

  const { error } = paymentSchema.validate(reqBody.values);
  if (error) {
    return createError(res, 422, error.message);
  }

  try {
    const payments = await Payment.find({
      user_Id,
      date: {
        $gte: Math.floor(new Date(from_date) / 1000),
        $lte: Math.floor(new Date(to_date) / 1000),
      },
    });
    if (!payments) return createError(res, 400, "Unable to Get Payment data!");
    else return successMessage(res, payments, "");
  } catch (err) {
    return createError(res, 500, err.message || "Internal server error!");
  }
}
