"use client";
import { motion } from "framer-motion";
import React from "react";

const NavigationsBtn = ({ Icon, Title, Width, OnClick }) => {
  const item = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };
  return (
    <motion.div
      className={`hover:bg-gray-600 bg-[#000] hover:rounded-lg text-white w-[90%] py-3 transition-all ease-in-out duration-500 cursor-pointer ${
        Width ? Width : ""
      }`}
      variants={item}
      onClick={OnClick ? OnClick : () => {}}
    >
      <div className="flex items-center gap-x-2 px-5">
        <Icon className="!text-2xl" />
        <span className="text-xl font-bold whitespace-nowrap">{Title}</span>
      </div>
    </motion.div>
  );
};

export default NavigationsBtn;
