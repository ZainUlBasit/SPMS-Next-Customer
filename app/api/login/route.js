import connectDB from "@/utils/db";
import {
  createCompany,
  getAllCompanies,
  updateCompany,
  deleteCompany,
} from "../../../controllers/CompanyController";
import { createError, successMessage } from "@/utils/ResponseMessage";
import Company from "@/models/Company";
import { NextResponse } from "next/server";
import User from "@/models/User";
import bcrypt from "bcrypt";
import { sign } from "jsonwebtoken";
import { cookies } from "next/headers";

connectDB();

export async function POST(req, res) {
  const reqBody = await req.json();
  const { email, password } = reqBody;
  if (!email || !password) {
    return Response.json({
      success: false,
      error: "Required fields are undefined!",
    });
  }
  try {
    const user = await User.findOne({ email, type: 2 });
    if (!user) return createError(res, 404, "No such account with email!");

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return createError(res, 403, "email or password doesn't match!");

    var token = await sign({ ...user }, process.env.PRIVATE_KEY);
    let userData = JSON.stringify({ ...user._doc });

    cookies().set("token", token, { secure: true });
    cookies().set("user", userData, { secure: true });

    return successMessage(res, { user, token }, "Login Successfully!");
  } catch (err) {
    return createError(res, 500, err.message || "Internal server error!");
  }
}
