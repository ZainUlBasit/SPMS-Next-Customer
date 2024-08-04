"use client";
import { SetAuth } from "@/utils/Slices/AuthSlice";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

const ProtectedRoutes = ({ children }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  useEffect(() => {
    const currentToken = localStorage.getItem("token");
    const currentUser = JSON.parse(localStorage.getItem("user"));
    if (!currentToken) {
      dispatch(SetAuth(currentUser));
      router.push("/");
    }
  }, []);
  return <div>{children}</div>;
};

export default ProtectedRoutes;
