"use client";
import ProcessLoader from "@/components/Loader/ProcessLoader";
import { fetchCompanies } from "@/utils/Slices/CompanySlice";
import { fetchCustomers } from "@/utils/Slices/CustomerSlice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
} from "@mui/material";
import { PaymentInfoColumns } from "@/assets/Columns/PaymentInfoColumns";
import SimpleTable from "@/components/Tables/SimpleTable";
import Search from "@/components/Search/Search";
import TableWrapper from "@/components/Tables/TableWrapper";
import PaymentInfoTable from "@/components/Tables/PaymentInfoTable";

export default function PaymentInfo() {
  const [userType, setUserType] = useState("company"); // "company" or "customer"
  const dispatch = useDispatch();

  const CustomerState = useSelector((state) => state.CustomerState);
  const CompanyState = useSelector((state) => state.CompanyState);

  useEffect(() => {
    dispatch(fetchCustomers());
    dispatch(fetchCompanies());
  }, []);

  const [OpenEditModal, setOpenEditModal] = useState(false);
  const [OpenDeleteModal, setOpenDeleteModal] = useState(false);
  const [SearchText, setSearchText] = useState("");
  const handleChange = (event) => {
    setUserType(event.target.value);
  };

  const userData =
    userType === "company"
      ? CompanyState.data
      : userType === "customer" && CustomerState.data;

  const filteredData =
    SearchText === ""
      ? userData
      : userData.filter((item) =>
          item.name.toLowerCase().includes(SearchText.toLowerCase())
        );

  useEffect(() => {
    setSearchText("");
  }, [userType]);

  return (
    <div className="flex flex-col gap-y-5 justify-center items-center">
      <FormControl component="fieldset">
        <FormLabel
          component="legend"
          className="select-none text-[#000] font-bold"
        >
          Select User Type
        </FormLabel>
        <RadioGroup
          row
          aria-label="user-type"
          name="user-type"
          value={userType}
          onChange={handleChange}
        >
          <FormControlLabel
            value="company"
            control={<Radio />}
            label="Company"
          />
          <FormControlLabel
            value="customer"
            control={<Radio />}
            label="Customer"
          />
        </RadioGroup>
      </FormControl>
      {CustomerState.loading || CompanyState.loading ? (
        <ProcessLoader />
      ) : (
        <TableWrapper>
          <Search
            Placeholder={
              userType === "company"
                ? "Search Company..."
                : "Search Customer..."
            }
            Value={SearchText}
            setValue={setSearchText}
          />
          <PaymentInfoTable Rows={filteredData} />
        </TableWrapper>
      )}
    </div>
  );
}
