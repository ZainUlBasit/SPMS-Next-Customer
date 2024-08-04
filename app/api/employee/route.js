import Employee from "@/models/Employee";
import connectDB from "@/utils/db";
import { createError, successMessage } from "@/utils/ResponseMessage";

connectDB();

export async function POST(req, res) {
  const reqBody = await req.json();
  console.log(reqBody);

  const { name, contact, email, cnic, address } = reqBody;

  if (!name || !contact || !email || !cnic || !address) {
    return res.json({
      success: false,
      error: "Required fields are undefined!",
    });
  }

  try {
    const employee = new Employee({
      name,
      contact,
      email,
      cnic,
      address,
    });

    await employee.save();

    if (!employee) {
      return createError(res, 400, "Unable to Add Employee!");
    } else {
      return successMessage(res, employee, "Employee Successfully Added!");
    }
  } catch (err) {
    return createError(res, 500, err.message || "Internal server error!");
  }
}

export async function GET(req, res) {
  try {
    const employees = await Employee.find();
    if (!employees)
      return createError(res, 400, "Unable to Get Customers data!");
    else return successMessage(res, employees, "");
  } catch (err) {
    return createError(res, 500, err.message || "Internal server error!");
  }
}
export async function PATCH(req, res) {
  const reqBody = await req.json();
  console.log(reqBody);
  const { employeeId } = reqBody;
  const { name, contact, email, cnic, address } = reqBody.payload;

  const Payload = {
    name,
    contact,
    email,
    cnic,
    address,
  };

  if (
    employeeId === "" ||
    name === "" ||
    contact === "" ||
    email === "" ||
    cnic === "" ||
    address === ""
  ) {
    return createError(res, 422, "Required field are undefined!");
  }

  try {
    let employee = await Employee.findById(employeeId);
    if (!employee)
      return createError(res, 404, "Employee with such id was not found!");
    // Update item properties
    Object.assign(employee, Payload);
    // Save the updated item
    await employee.save();
    return successMessage(res, employee, "Employee Successfully Updated!");
  } catch (err) {
    console.log(err);
    return createError(res, 500, err.message || err);
  }
}

export async function DELETE(req, res) {
  const reqBody = await req.json();
  const { employeeId } = reqBody;
  if (!employeeId) return createError(res, 422, "Invalid Employee Id!");

  try {
    const DeleteEmployee = await Employee.findByIdAndDelete(employeeId);
    if (!DeleteEmployee)
      return createError(
        res,
        400,
        "Such Employee with employeeId does not exist!"
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
