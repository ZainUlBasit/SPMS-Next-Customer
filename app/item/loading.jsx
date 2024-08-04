"use client";
import PageLoader from "@/components/Loader/PageLoader";
import { useEffect, useState } from "react";
// import PageLoader from "@/components/Loader/PageLoader";

export default function Loading() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // Set isMounted to true when component is mounted on the client side
    setIsMounted(true);
  }, []); // Empty dependency array ensures useEffect runs only once, after initial render

  // Render the PageLoader directly based on isMounted
  return (
    <>
      {/* Render PageLoader only when isMounted is true */}
      {isMounted && (
        <div className="flex justify-center items-center h-screen w-full">
          <PageLoader />
        </div>
      )}
    </>
  );
}
