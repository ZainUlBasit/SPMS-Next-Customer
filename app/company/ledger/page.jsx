"use client";
import { CashLedgerColumns } from "@/assets/Columns/CashLedgerColumns";
import { ItemLedgerColumns } from "@/assets/Columns/ItemLedgerColumns";
import ItemLedgerCard from "@/components/Cards/ItemLedgerCard";
import ProcessLoader from "@/components/Loader/ProcessLoader";
import SimpleTable from "@/components/Tables/SimpleTable";
import { fetchCompanyItemLedger } from "@/utils/Slices/CompanyItemLegderSlice";
import { fetchCompanies } from "@/utils/Slices/CompanySlice";
import { fetchPaymentById } from "@/utils/Slices/PaymentSlice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function ComapnyLedger() {
  const [OpenItemLedger, setOpenItemLedger] = useState(false);
  const [OpenCashLedger, setOpenCashLedger] = useState(false);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const CompanyState = useSelector((state) => state.CompanyState);
  const [CurrentCompany, setCurrentCompany] = useState("");
  const PaymentState = useSelector((state) => state.PaymentState);
  const CompanyItemLegderState = useSelector(
    (state) => state.CompanyItemLegderState
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCompanies());
  }, []);

  useEffect(() => {
    if (OpenCashLedger)
      dispatch(
        fetchPaymentById({
          user_Id: CurrentCompany,
          from_date: fromDate,
          to_date: toDate,
        })
      );
  }, [OpenCashLedger, fromDate, toDate]);
  useEffect(() => {
    if (OpenItemLedger)
      dispatch(
        fetchCompanyItemLedger({
          companyId: CurrentCompany,
          from_date: fromDate,
          to_date: toDate,
        })
      );
  }, [OpenItemLedger, fromDate, toDate]);

  return (
    <div className="flex flex-col items-center justify-center">
      <ItemLedgerCard
        setOpenCashLedger={setOpenCashLedger}
        setOpenItemLedger={setOpenItemLedger}
        fromDate={fromDate}
        toDate={toDate}
        setFromDate={setFromDate}
        setToDate={setToDate}
        Users={CompanyState.data}
        SelectUser={CurrentCompany}
        setSelectUser={setCurrentCompany}
        Placeholder={"Select Company"}
      />
      {OpenItemLedger && CompanyItemLegderState.loading ? (
        <ProcessLoader />
      ) : (
        OpenItemLedger &&
        PaymentState.data && (
          <SimpleTable
            columns={ItemLedgerColumns}
            title={"Item Ledger Details"}
            rows={CompanyItemLegderState.data}
          />
        )
      )}
      {OpenCashLedger && PaymentState.loading ? (
        <ProcessLoader />
      ) : (
        OpenCashLedger &&
        PaymentState.data && (
          <SimpleTable
            columns={CashLedgerColumns}
            title={"Cash Ledger Details"}
            rows={PaymentState.data}
          />
        )
      )}
    </div>
  );
}
