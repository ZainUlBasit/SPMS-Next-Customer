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
import CreateEmployeeModal from "../Modals/CreateEmployeeModal";

const EmployeeNavs = () => {
  const router = useRouter();
  const [Open, setOpen] = useState(false);

  const handleInfoClick = () => {
    router.push("/employee");
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
      {/* <NavigationsBtn
        Title={"Ledger"}
        Icon={TbFileReport}
        Width={"!max-w-[200px]"}
        OnClick={() => {}}
      /> */}
      {Open && <CreateEmployeeModal OpenModal={Open} setOpenModal={setOpen} />}
    </NavigationWrapper>
  );
};

export default EmployeeNavs;
