import { Inter } from "next/font/google";

import { Roboto } from "next/font/google";
import Navbar from "@/components/Navbar/Navbar";

const roboto = Roboto({
  weight: "400",
  subsets: ["latin"],
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={roboto.className}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
