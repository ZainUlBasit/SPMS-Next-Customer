import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

export default function AccountsStatInfo({ AccountsInfo }) {
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
              <div className="max767:text-[1.1rem]">Total Paid</div>
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
              <div className="max767:text-[1.1rem]">Total Payable</div>
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
              <div className="max767:text-[1.3rem]">{AccountsInfo.paid}</div>
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
                {AccountsInfo.remaining}
              </div>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}
