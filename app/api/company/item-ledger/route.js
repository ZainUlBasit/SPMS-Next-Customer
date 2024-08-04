import Stock from "@/models/Stock";
import connectDB from "@/utils/db";
import { createError, successMessage } from "@/utils/ResponseMessage";
// import Company from "@/models/Company";
import { NextResponse } from "next/server";

connectDB();

export async function POST(req, res) {
  const reqBody = await req.json();
  const { companyId, from_date, to_date } = reqBody;
  try {
    const stocks = await Stock.find({
      companyId: companyId,
      date: {
        $gte: Math.floor(new Date(from_date) / 1000),
        $lte: Math.floor(new Date(to_date) / 1000),
      },
    })
      .populate("itemId")
      .populate("companyId");
    console.log(stocks);
    const UpdateData = stocks.map((dt) => {
      return {
        invoice_no: dt.invoice_no,
        truck_no: dt.truck_no,
        itemId: dt.itemId._id,
        companyId: dt.companyId._id,
        item_name: dt.itemId.name,
        company_name: dt.companyId.name,
        qty: dt.qty,
        purchase: dt.purchase,
        total_amount: dt.total_amount,
        date: dt.date,
      };
    });
    if (!stocks)
      return createError(res, 400, "Unable to Get Company Item Ledger data!");
    else
      return successMessage(
        res,
        UpdateData,
        "Stock Statistics Successfully Retreived!"
      );
  } catch (err) {
    return createError(res, 500, err.message || "Internal server error!");
  }
}
// export async function PATCH(req, res) {
//   const reqBody = await req.json();
//   console.log(reqBody);
//   const { name, contact, email, cnic, desc, address, companyId } = reqBody;

//   const Payload = {
//     name,
//     contact,
//     email,
//     cnic,
//     desc,
//     address,
//   };

//   if (
//     companyId === "" ||
//     name === "" ||
//     contact === "" ||
//     email === "" ||
//     cnic === "" ||
//     desc === "" ||
//     address === ""
//   ) {
//     return createError(res, 422, "Required field are undefined!");
//   }

//   try {
//     let company = await Company.findById(companyId);
//     if (!company)
//       return createError(res, 404, "Customer with such id was not found!");
//     // Update item properties
//     Object.assign(company, Payload);
//     // Save the updated item
//     await company.save();
//     return successMessage(res, company, "Company Successfully Updated!");
//   } catch (err) {
//     console.log(err);
//     return createError(res, 500, err.message || err);
//   }
// }

// export async function DELETE(req, res) {
//   const reqBody = await req.json();
//   const { companyId } = reqBody;
//   if (!companyId) return createError(res, 422, "Invalid Customer Id!");

//   try {
//     const DeleteCompany = await Company.findByIdAndDelete(companyId);
//     if (!DeleteCompany)
//       return createError(
//         res,
//         400,
//         "Such Company with companyId does not exist!"
//       );
//     else
//       return successMessage(
//         res,
//         DeleteCompany,
//         `${DeleteCompany.name} is successfully deleted!`
//       );
//   } catch (err) {
//     return createError(res, 500, err.message || err);
//   }
// }
