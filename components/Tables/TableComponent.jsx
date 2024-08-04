import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { useState } from "react";
// import EditPayment from "../Modals/EditPayment";
import styled from "styled-components";
import Search from "./Search/Search";
import { RiDeleteBin5Line } from "react-icons/ri";
import { BiEdit } from "react-icons/bi";
import EditCompany from "../Modals/EditCompany";
import DeleteModal from "../Modals/DeleteModal";
import { DeleteCompanyApi } from "@/Https";
import { SuccessToast } from "@/utils/ShowToast";
import { fetchCompanies } from "@/utils/Slices/CompanySlice";
import { useDispatch } from "react-redux";

const BannerHeader = styled.h1.attrs({
  className:
    "relative bg-[#000] py-[20px] text-xl flex items-center rounded-t-lg pl-10 text-white justify-center font-[Roboto] font-[700] text-[1.4rem] select-none",
})`
  & {
    font-size: ${(props) => (props.fontSize ? props.fontSize : "1.4rem")};
    padding: ${(props) => (props.padding ? props.padding : "8px 0px")};
  }
`;

const TableWrapper = styled.div`
  /* Tailwind="flex justify-center flex-col"> */
  margin-top: 1px;
  transition: all 0.5s ease-in-out;
  display: flex;
  justify-content: center;
  flex-direction: column;
  // margin: 0px 120px;
  width: 100%;
  padding: ${(props) =>
    props.isAct ? "0px 20px 0px 140px" : "0px 20px 0px 20px"};
`;

export default function TableComp({
  rows,
  title,
  Value,
  setValue,
  placeholder,
}) {
  console.log(rows);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [SearchText, setSearchText] = useState("");
  const [Open, setOpen] = useState(false);
  const [OpenDeleteModal, setOpenDeleteModal] = useState(false);
  const [Id, setId] = useState("");
  const dispatch = useDispatch();
  const [Loading, setLoading] = useState(false);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleDelete = async () => {
    setLoading(true);
    try {
      const response = await DeleteCompanyApi({ companyId: Id });
      if (response.data.success) {
        SuccessToast(response.data.data.msg);
        setOpenDeleteModal(false);
        dispatch(fetchCompanies());
      }
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };
  return rows.length == 0 ? (
    // <LoadingError />
    <></>
  ) : (
    <TableWrapper isAct={false} width="80px">
      <BannerHeader padding="20px 0px">
        <input
          type="text"
          className=" py-3 px-2 w-[95%] outline-none rounded-lg text-[#000]"
          placeholder="Search..."
          value={SearchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
      </BannerHeader>

      <BannerHeader padding="20px 0px">{title.toUpperCase()}</BannerHeader>
      {/* Search Bar */}
      <div className="flex">
        {/* <Search Value={Value} setValue={setValue} Placeholder={placeholder} /> */}
      </div>
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer
          className="border-[2px] border-[#000] border-t-white"
          sx={{ maxHeight: 550, borderRadius: "0px 0px 10px 10px" }}
        >
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {[
                  {
                    id: "actions",
                    label: "Actions",
                    minWidth: 150,
                  },
                  {
                    id: "name",
                    label: "Name",
                    minWidth: 150,
                  },
                  {
                    id: "desc",
                    label: "Description",
                    minWidth: 100,
                  },
                  {
                    id: "email",
                    label: "Email",
                    minWidth: 230,
                  },
                  {
                    id: "contact",
                    label: "Contact",
                    align: "left",
                    minWidth: 120,
                    format: (value) => value.toLocaleString("en-US"),
                  },
                  {
                    id: "cnic",
                    label: "Cnic",
                    minWidth: 155,
                  },
                  {
                    id: "address",
                    label: "Address",
                    // align: "left",
                    minWidth: 140,
                    // format: (value) => value.toLocaleString("en-US"),
                  },
                  {
                    id: "total",
                    label: "Total",
                    align: "center",
                    minWidth: 140,
                    format: (value) => value.toLocaleString("en-US"),
                  },
                  {
                    id: "paid",
                    label: "Paid",
                    align: "center",
                    minWidth: 140,
                    format: (value) => value.toLocaleString("en-US"),
                  },
                  {
                    id: "remaining",
                    label: "Remaining",
                    align: "center",
                    minWidth: 140,
                    format: (value) => value.toLocaleString("en-US"),
                  },
                ].map((column, index) => (
                  <TableCell
                    key={index}
                    align={column.align}
                    className="select-none"
                    style={{
                      minWidth: column.minWidth,
                      backgroundColor: "#000",
                      color: "white",
                      fontWeight: "bold",
                      fontSize: "1.1rem",
                      fontFamily: "'Roboto', sans-serif",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.length &&
                rows
                  .filter((data) => {
                    const lowercaseSearch = SearchText?.toLowerCase();
                    const lowerCaseName = data?.name?.toLowerCase();

                    return lowercaseSearch !== ""
                      ? lowerCaseName.includes(lowercaseSearch)
                      : true;
                  })
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => {
                    return (
                      <TableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={index}
                        style={{ cursor: "pointer", whiteSpace: "nowrap" }}
                      >
                        {[
                          {
                            id: "actions",
                            label: "Actions",
                            minWidth: 150,
                          },
                          {
                            id: "name",
                            label: "Name",
                            minWidth: 150,
                          },
                          {
                            id: "desc",
                            label: "Description",
                            minWidth: 100,
                          },
                          {
                            id: "email",
                            label: "Email",
                            minWidth: 230,
                          },
                          {
                            id: "contact",
                            label: "Contact",
                            align: "left",
                            minWidth: 120,
                            format: (value) => value.toLocaleString("en-US"),
                          },
                          {
                            id: "cnic",
                            label: "Cnic",
                            minWidth: 155,
                          },
                          {
                            id: "address",
                            label: "Address",
                            // align: "left",
                            minWidth: 140,
                            // format: (value) => value.toLocaleString("en-US"),
                          },
                          {
                            id: "total",
                            label: "Total",
                            align: "center",
                            minWidth: 140,
                            format: (value) => value.toLocaleString("en-US"),
                          },
                          {
                            id: "paid",
                            label: "Paid",
                            align: "center",
                            minWidth: 140,
                            format: (value) => value.toLocaleString("en-US"),
                          },
                          {
                            id: "remaining",
                            label: "Remaining",
                            align: "center",
                            minWidth: 140,
                            format: (value) => value.toLocaleString("en-US"),
                          },
                        ].map((column) => {
                          let value;
                          // if (title === "Item Ledger Detail") {
                          //   if (column.id === "date")
                          //     value = new Date(
                          //       row[0][column.id] * 1000
                          //     ).toLocaleDateString();
                          //   else value = row[0][column.id];
                          // } else
                          if (
                            "companyId" === column.id ||
                            "categoryId" === column.id ||
                            "subcategoryId" === column.id ||
                            "itemId" === column.id
                          )
                            value = row[column.id]?.name;
                          else if (
                            "addeddate" === column.id ||
                            "date" === column.id
                          )
                            value = new Date(
                              row[column.id] * 1000
                            ).toLocaleDateString();
                          else if (column.id !== "actions")
                            value = row[column.id];

                          const c_id = row["_id"];
                          return (
                            <TableCell
                              id={c_id}
                              // onClick={HandleDoubleClick}
                              className={
                                column.id === "contact"
                                  ? "font-[georgia] select-none"
                                  : "font-[Roboto] select-none"
                              }
                              key={column.id}
                              align={column.align}
                              style={{ fontWeight: "700", fontSize: "0.95rem" }}
                            >
                              {column.id === "actions" ? (
                                <div className="flex justify-center items-center gap-x-2">
                                  <BiEdit
                                    className="text-[1.2rem] maxWeb1:text-[2rem] maxWeb2:text-[2.5rem] maxWeb3:text-[3rem] maxWeb4:text-[3rem] cursor-pointer hover:text-[green] transition-all duration-500"
                                    onClick={() => {
                                      setId(row._id);
                                      setOpen(true);
                                    }}
                                  />
                                  <RiDeleteBin5Line
                                    className="text-[1.2rem] maxWeb1:text-[2rem] maxWeb2:text-[2.5rem] maxWeb3:text-[3rem] maxWeb4:text-[3rem] cursor-pointer hover:text-[red] transition-all duration-500"
                                    onClick={() => {
                                      setId(row._id);
                                      setOpenDeleteModal(true);
                                    }}
                                  />
                                </div>
                              ) : column.format && typeof value === "number" ? (
                                column.format(value)
                              ) : (
                                value || "N/A"
                              )}
                            </TableCell>
                          );
                        })}
                      </TableRow>
                    );
                  })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 20, 50]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      {Open && (
        <EditCompany
          open={Open}
          setOpen={setOpen}
          CurrentCompany={rows.find((dt) => dt._id === Id)}
        />
      )}
      {OpenDeleteModal && (
        <DeleteModal
          key={`delete-${Id}`} // Ensure unique key for each modal instance
          Open={OpenDeleteModal}
          setOpen={setOpenDeleteModal}
          onSubmit={handleDelete}
          Loading={Loading}
        />
      )}
    </TableWrapper>
  );
}
