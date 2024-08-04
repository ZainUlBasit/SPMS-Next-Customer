"use client";
import PageLoader from "@/components/Loader/PageLoader";

export default function Loading() {
  // Render the PageLoader directly based on isMounted
  return (
    <div className="flex justify-center items-center h-screen w-full">
      <PageLoader />
    </div>
  );
}
