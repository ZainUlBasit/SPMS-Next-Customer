"use client";
import React, { useState } from "react";
import NavigationsBtn from "../Buttons/NavigationsBtn";
import { IoInformationCircle } from "react-icons/io5";
import { BsBuildingAdd } from "react-icons/bs";
import { IoIosCash } from "react-icons/io";
import { TbFileReport } from "react-icons/tb";
import NavigationWrapper from "./NavigationWrapper";
import CreateCompany from "../Modals/CreateCompany";
import { useRouter } from "next/navigation";

const CompanyNavs = () => {
  const router = useRouter();
  const [Open, setOpen] = useState(false);

  const handleCreateNewClick = () => {
    router.push("/company/create");
  };
  const handleInfoClick = () => {
    router.push("/company");
  };
  const handleLedgerClick = () => {
    router.push("/company/ledger");
  };

  return (
    <NavigationWrapper>
      <NavigationsBtn
        Title={"Create New"}
        Icon={BsBuildingAdd}
        Width={"!max-w-[200px]"}
        OnClick={() => setOpen(true)}
      />
      <NavigationsBtn
        Title={"Info"}
        Icon={IoInformationCircle}
        Width={"!max-w-[200px]"}
        OnClick={handleInfoClick}
      />
      <NavigationsBtn
        Title={"Ledger"}
        Icon={TbFileReport}
        Width={"!max-w-[200px]"}
        OnClick={handleLedgerClick}
      />
      {Open && <CreateCompany open={Open} setOpen={setOpen} />}
    </NavigationWrapper>
  );
};

export default CompanyNavs;
