import React from "react";

const NavItem = ({ Icon, Title, onClick }) => {
  return (
    <div
      className="hover:bg-gray-600 bg-[#000] hover:rounded-lg text-white w-[90%] py-3 transition-all ease-in-out duration-500 cursor-pointer"
      onClick={onClick}
    >
      <div className="flex items-center gap-x-2 px-5">
        <Icon className="text-3xl" />
        <span className="text-2xl font-bold">{Title}</span>
      </div>
    </div>
  );
};

export default NavItem;
