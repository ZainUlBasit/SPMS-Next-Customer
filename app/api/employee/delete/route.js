import connectDB from "@/utils/db";
import { createError, successMessage } from "@/utils/ResponseMessage";
import Employee from "@/models/Employee";

connectDB();

export async function POST(req, res) {
  const reqBody = await req.json();
  const { employeeId } = reqBody;
  if (!employeeId) return createError(res, 422, "Invalid Employee Id!");

  try {
    const DeleteEmployee = await Employee.findByIdAndDelete(employeeId);
    if (!DeleteEmployee)
      return createError(
        res,
        400,
        "Such Employee with EmployeeId does not exist!"
      );
    else
      return successMessage(
        res,
        DeleteEmployee,
        `${DeleteEmployee.name} is successfully deleted!`
      );
  } catch (err) {
    return createError(res, 500, err.message || err);
  }
}
