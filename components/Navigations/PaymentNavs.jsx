"use client";
import React, { useState } from "react";
import NavigationsBtn from "../Buttons/NavigationsBtn";
import { IoInformationCircle } from "react-icons/io5";
import { BsBuildingAdd } from "react-icons/bs";
import { IoIosCash } from "react-icons/io";
import { TbFileReport, TbLayoutGridAdd } from "react-icons/tb";
import NavigationWrapper from "./NavigationWrapper";
import { RiSecurePaymentFill } from "react-icons/ri";
import PaymentModal from "../Modals/PaymentModal";
import { useRouter } from "next/navigation";

const PaymentNavs = () => {
  const [OpenModal, setOpenModal] = useState(false);
  const router = useRouter();

  return (
    <NavigationWrapper>
      <NavigationsBtn
        Title={"Create New"}
        Icon={RiSecurePaymentFill}
        Width={"!max-w-[220px]"}
        OnClick={() => {
          setOpenModal(true);
        }}
      />
      <NavigationsBtn
        Title={"Payment Info"}
        Icon={IoInformationCircle}
        Width={"!max-w-[220px]"}
        OnClick={() => {
          router.push("/payments");
        }}
      />
      {OpenModal && (
        <PaymentModal OpenModal={OpenModal} setOpenModal={setOpenModal} />
      )}
    </NavigationWrapper>
  );
};

export default PaymentNavs;
