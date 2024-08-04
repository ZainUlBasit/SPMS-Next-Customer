"use client";
import { CashLedgerColumns } from "@/assets/Columns/CashLedgerColumns";
import {
  CustomerItemLedgerColumns,
  ItemLedgerColumns,
} from "@/assets/Columns/ItemLedgerColumns";
import ItemLedgerCard from "@/components/Cards/ItemLedgerCard";
import ProcessLoader from "@/components/Loader/ProcessLoader";
import SimpleTable from "@/components/Tables/SimpleTable";
import { fetchCompanies } from "@/utils/Slices/CompanySlice";
import { fetchCustomerItemLedger } from "@/utils/Slices/CustomerItemLegderSlice";
import { fetchCustomers } from "@/utils/Slices/CustomerSlice";
import { fetchPaymentById } from "@/utils/Slices/PaymentSlice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function ComapnyLedger() {
  const [OpenItemLedger, setOpenItemLedger] = useState(false);
  const [OpenCashLedger, setOpenCashLedger] = useState(false);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [CurrentCustomer, setCurrentCustomer] = useState("");
  const CustomerState = useSelector((state) => state.CustomerState);
  const PaymentState = useSelector((state) => state.PaymentState);
  const CustomerItemLegderState = useSelector(
    (state) => state.CustomerItemLegderState
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCustomers());
  }, [dispatch]);

  useEffect(() => {
    if (OpenCashLedger) {
      dispatch(
        fetchPaymentById({
          user_Id: CurrentCustomer,
          from_date: fromDate,
          to_date: toDate,
        })
      );
    } else if (OpenItemLedger) {
      dispatch(
        fetchCustomerItemLedger({
          customerId: CurrentCustomer,
          from_date: fromDate,
          to_date: toDate,
        })
      );
    }
  }, [
    OpenCashLedger,
    OpenItemLedger,
    fromDate,
    toDate,
    CurrentCustomer,
    dispatch,
  ]);

  return (
    <div className="flex flex-col items-center justify-center">
      <ItemLedgerCard
        setOpenCashLedger={setOpenCashLedger}
        setOpenItemLedger={setOpenItemLedger}
        fromDate={fromDate}
        toDate={toDate}
        setFromDate={setFromDate}
        setToDate={setToDate}
        Users={CustomerState.data}
        SelectUser={CurrentCustomer}
        setSelectUser={setCurrentCustomer}
        Placeholder={"Select Customer"}
      />
      {OpenItemLedger &&
        (CustomerItemLegderState.loading ? (
          <ProcessLoader />
        ) : (
          <SimpleTable
            columns={CustomerItemLedgerColumns}
            title={"Item Ledger Details"}
            rows={CustomerItemLegderState.data}
          />
        ))}
      {OpenCashLedger &&
        (PaymentState.loading ? (
          <ProcessLoader />
        ) : (
          <SimpleTable
            columns={CashLedgerColumns}
            title={"Cash Ledger Details"}
            rows={PaymentState.data}
          />
        ))}
    </div>
  );
}
