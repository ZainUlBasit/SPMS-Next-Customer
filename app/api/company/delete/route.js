import connectDB from "@/utils/db";
import { createError, successMessage } from "@/utils/ResponseMessage";
import Company from "@/models/Company";

connectDB();

export async function POST(req, res) {
  const reqBody = await req.json();
  const { companyId } = reqBody;
  if (!companyId) return createError(res, 422, "Invalid Customer Id!");

  try {
    const DeleteCompany = await Company.findByIdAndDelete(companyId);
    if (!DeleteCompany)
      return createError(
        res,
        400,
        "Such Company with companyId does not exist!"
      );
    else
      return successMessage(
        res,
        DeleteCompany,
        `${DeleteCompany.name} is successfully deleted!`
      );
  } catch (err) {
    return createError(res, 500, err.message || err);
  }
}
