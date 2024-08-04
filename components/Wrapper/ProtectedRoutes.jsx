"use client";
import { SetAuth, SetAuthNotFound } from "@/utils/Slices/AuthSlice";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

const ProtectedRoutes = ({ children }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  useEffect(() => {
    const currentToken = localStorage.getItem("token");
    const currentUser = JSON.parse(localStorage.getItem("user"));
    console.log(currentUser);
    if (!currentToken) {
      dispatch(SetAuthNotFound(currentUser));
      router.push("/");
    }
    dispatch(SetAuth(currentUser));
  }, []);
  return <div>{children}</div>;
};

export default ProtectedRoutes;
