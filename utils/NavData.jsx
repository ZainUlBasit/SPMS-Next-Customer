import { BiSolidReport } from "react-icons/bi";
import { FaUserClock } from "react-icons/fa";
import { GiCrackedGlass } from "react-icons/gi";
import { IoHome } from "react-icons/io5";
import { MdFactory, MdOutlinePayments } from "react-icons/md";
import { FaUsersBetweenLines } from "react-icons/fa6";

// navdata
export const NavData = [
  { title: "Home", Icon: IoHome, Link: "/home" },
  { title: "Company", Icon: MdFactory, Link: "/company" },
  { title: "Items", Icon: GiCrackedGlass, Link: "/item" },
  { title: "Customer", Icon: FaUserClock, Link: "/customer" },
  { title: "Employeee", Icon: FaUsersBetweenLines, Link: "/employee" },
  { title: "Statistics", Icon: BiSolidReport, Link: "/statistics" },
  { title: "Payments", Icon: MdOutlinePayments, Link: "/payments" },
];
