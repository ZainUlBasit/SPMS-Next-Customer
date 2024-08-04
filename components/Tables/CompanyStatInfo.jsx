import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

export default function CompanyStatInfo({ CompanyInfo }) {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table" sx={{ border: "2px solid #000" }}>
        <TableHead
          style={{
            backgroundColor: "#000",
            border: "0px solid black",
          }}
        >
          <TableRow>
            <TableCell
              sx={{
                fontWeight: "600",
                fontSize: "1.4rem",
                fontFamily: "Quicksand",
                paddingTop: "20px",
                paddingBottom: "20px",
                color: "white",
                borderBottomLeftRadius: "15px",
                borderWidth: 0,
              }}
              align="center"
            >
              <div className="max767:text-[1.1rem]">Number of Company</div>
            </TableCell>

            <TableCell
              sx={{
                fontWeight: "600",
                fontSize: "1.4rem",
                fontFamily: "Quicksand",
                paddingTop: "20px",
                paddingBottom: "20px",
                color: "white",
                borderWidth: 0,
              }}
              align="center"
            >
              <div className="max767:text-[1.1rem]">Number of Items</div>
            </TableCell>

            <TableCell
              sx={{
                fontWeight: "600",
                fontSize: "1.4rem",
                fontFamily: "Quicksand",
                paddingTop: "20px",
                paddingBottom: "20px",
                color: "white",
                borderWidth: 0,
              }}
              align="center"
            >
              <div className="max767:text-[1.1rem]">Number of Customer</div>
            </TableCell>

            <TableCell
              sx={{
                fontWeight: "600",
                fontSize: "1.4rem",
                fontFamily: "Quicksand",
                paddingTop: "20px",
                paddingBottom: "20px",
                color: "white",
                borderWidth: 0,
              }}
              align="center"
            >
              <div className="max767:text-[1.1rem]">Monthly Sales (PKR)</div>
            </TableCell>

            <TableCell
              sx={{
                fontWeight: "600",
                fontSize: "1.4rem",
                fontFamily: "Quicksand",
                paddingTop: "20px",
                paddingBottom: "20px",
                color: "white",
                border: "0px solid white",
                borderBottomRightRadius: "15px",
                borderColor: "#000",
              }}
              align="center"
            >
              <div className="max767:text-[1.1rem]">Monthly Payments (PKR)</div>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell
              sx={{
                fontWeight: "600",
                fontSize: "1.6rem",
                fontFamily: "Quicksand",
                paddingTop: "30px",
                paddingBottom: "30px",
                borderRight: "2px solid #000",
              }}
              align="center"
            >
              <div className="max767:text-[1.3rem]">
                {CompanyInfo.no_of_company}
              </div>
            </TableCell>
            <TableCell
              sx={{
                fontWeight: "600",
                fontSize: "1.6rem",
                fontFamily: "Quicksand",
                paddingTop: "30px",
                paddingBottom: "30px",
                borderRight: "2px solid #000",
              }}
              align="center"
            >
              <div className="max767:text-[1.3rem]">
                {CompanyInfo.no_of_items}
              </div>
            </TableCell>
            <TableCell
              sx={{
                fontWeight: "600",
                fontSize: "1.6rem",
                fontFamily: "Quicksand",
                paddingTop: "30px",
                paddingBottom: "30px",
                borderRight: "2px solid #000",
              }}
              align="center"
            >
              <div className="max767:text-[1.3rem]">
                {CompanyInfo.no_of_customer}
              </div>
            </TableCell>
            <TableCell
              sx={{
                fontWeight: "600",
                fontSize: "1.6rem",
                fontFamily: "Quicksand",
                paddingTop: "30px",
                paddingBottom: "30px",
                borderRight: "2px solid #000",
              }}
              align="center"
            >
              <div className="max767:text-[1.3rem]">
                {CompanyInfo.monthly_sales}
              </div>
            </TableCell>
            <TableCell
              sx={{
                fontWeight: "600",
                fontSize: "1.6rem",
                fontFamily: "Quicksand",
                paddingTop: "30px",
                paddingBottom: "30px",
              }}
              align="center"
            >
              <div className="max767:text-[1.3rem]">
                {CompanyInfo.monthly_payments}
              </div>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}
