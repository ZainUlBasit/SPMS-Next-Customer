import Customer from "@/models/Customer";
import User from "@/models/User";
import connectDB from "@/utils/db";
import { createError, successMessage } from "@/utils/ResponseMessage";
import bcrypt from "bcrypt";

connectDB();

export async function POST(req, res) {
  const reqBody = await req.json();
  console.log(reqBody);

  const { name, contact, email, password, cnic, address, ref, page } = reqBody;

  if (
    !name ||
    !contact ||
    !email ||
    !password ||
    !cnic ||
    !address ||
    !ref ||
    page === undefined
  ) {
    return res.json({
      success: false,
      error: "Required fields are undefined!",
    });
  }

  try {
    const user = await User.exists({ email });
    if (user) return createError(res, 409, "Email already registered");

    const hashedPassword = await bcrypt.hash(password, 10);

    const customer = new Customer({
      name,
      contact,
      email,
      password,
      cnic,
      address,
      ref,
      page,
      return_amount: 0,
      discount: 0,
      paid: 0,
      remaining: 0,
      total: 0,
      date: Math.floor(Date.now() / 1000),
    });

    await customer.save();

    const createAccount = new User({
      name,
      email,
      password,
      type: 2,
      customerId: customer._id,
    });

    await createAccount.save();

    if (!createAccount) {
      return createError(res, 400, "Unable to create Account for Customer!");
    }

    if (!customer) {
      return createError(res, 400, "Unable to Add Customer!");
    } else {
      return successMessage(res, customer, "Customer Successfully Added!");
    }
  } catch (err) {
    return createError(res, 500, err.message || "Internal server error!");
  }
}

export async function GET(req, res) {
  try {
    const customers = await Customer.find();
    if (!customers)
      return createError(res, 400, "Unable to Get Customers data!");
    else return successMessage(res, customers, "");
  } catch (err) {
    return createError(res, 500, err.message || "Internal server error!");
  }
}
export async function PATCH(req, res) {
  const reqBody = await req.json();
  console.log(reqBody);
  const { customerId } = reqBody;
  const { name, contact, email, cnic, desc, address, ref, page } =
    reqBody.payload;

  const Payload = {
    name,
    contact,
    email,
    cnic,
    ref,
    page,
    desc,
    address,
  };

  if (
    customerId === "" ||
    name === "" ||
    contact === "" ||
    email === "" ||
    cnic === "" ||
    desc === "" ||
    ref === "" ||
    address === "" ||
    page === undefined
  ) {
    return createError(res, 422, "Required field are undefined!");
  }

  try {
    let customer = await Customer.findById(customerId);
    if (!customer)
      return createError(res, 404, "Customer with such id was not found!");
    // Update item properties
    Object.assign(customer, Payload);
    // Save the updated item
    await customer.save();

    const UpdateUser = await User.findOneAndUpdate(
      { customerId },
      {
        email,
        name,
      },
      { new: true }
    );
    return successMessage(res, customer, "Customer Successfully Updated!");
  } catch (err) {
    console.log(err);
    return createError(res, 500, err.message || err);
  }
}

export async function DELETE(req, res) {
  const reqBody = await req.json();
  const { customerId } = reqBody;
  if (!customerId) return createError(res, 422, "Invalid Customer Id!");

  try {
    const DeleteCustomer = await Customer.findByIdAndDelete(customerId);
    if (!DeleteCustomer)
      return createError(
        res,
        400,
        "Such Customer with customerId does not exist!"
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
