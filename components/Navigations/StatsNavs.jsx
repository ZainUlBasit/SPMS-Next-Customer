"use client";
import React from "react";
import NavigationsBtn from "../Buttons/NavigationsBtn";
import { IoInformationCircle } from "react-icons/io5";
import { BsBuildingAdd, BsBuildingDown } from "react-icons/bs";
import { IoIosCash } from "react-icons/io";
import { TbFileReport, TbLayoutGridAdd } from "react-icons/tb";
import { MdOutlineWallet } from "react-icons/md";
import NavigationWrapper from "./NavigationWrapper";

const StatsNavs = () => {
  return (
    <NavigationWrapper>
      <NavigationsBtn
        Title={"Add Expense"}
        Icon={MdOutlineWallet}
        Width={"!max-w-[220px]"}
        OnClick={() => {}}
      />
      <NavigationsBtn
        Title={"Expense Info"}
        Icon={IoInformationCircle}
        Width={"!max-w-[220px]"}
        OnClick={() => {}}
      />
      <NavigationsBtn
        Title={"Company Stats"}
        Icon={BsBuildingDown}
        Width={"!max-w-[220px]"}
        OnClick={() => {}}
      />
      <NavigationsBtn
        Title={"Stock Statistics"}
        Icon={TbFileReport}
        Width={"!max-w-[220px]"}
        OnClick={() => {}}
      />
    </NavigationWrapper>
  );
};

export default StatsNavs;
