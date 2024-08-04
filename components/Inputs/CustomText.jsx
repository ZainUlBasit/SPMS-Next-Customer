import React from "react";
import TextField from "@mui/material/TextField";
// import { v4 } from "uuid";
import "./CustomInput.css";

const CustomText = ({ label, Value }) => {
  return (
    <div className="relative max-w-[300px] min-w-[250px] maxInputWidth font-[Quicksand] h-[48px]">
      <p className="absolute top-[-11px] left-3 w-fit bg-white h-[13px] text-[15px] font-bold InputLabel">
        {label}
      </p>
      <div className="px-3 py-2 border border-[#000] rounded-[7.94px] w-full outline-none InputText shadow-[#0e25802d_0px_2px_8px_0px] font-bold text-[15px] placeholder:font-normal h-full">
        {Value}
      </div>
    </div>
  );
};

export default CustomText;
