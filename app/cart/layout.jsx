"use client";
import AddStockModal from "@/components/Modals/AddStockModal";
import Navbar from "@/components/Navbar/Navbar";
import CompanyNavs from "@/components/Navigations/CompanyNavs";
import ItemNavs from "@/components/Navigations/ItemNavs";
import { Inter } from "next/font/google";
import { Roboto } from "next/font/google";
import { useState } from "react";

const roboto = Roboto({
  weight: "400",
  subsets: ["latin"],
});

export default function RootLayout({ children }) {
  const [OpenAddStock, setOpenAddStock] = useState(false);
  return (
    <html lang="en">
      <body className={roboto.className}>
        <Navbar />
        {/* <ItemNavs setOpenAddStock={setOpenAddStock} /> */}
        {OpenAddStock && (
          <AddStockModal
            OpenModal={OpenAddStock}
            setOpenModal={setOpenAddStock}
          />
        )}
        {children}
      </body>
    </html>
  );
}
