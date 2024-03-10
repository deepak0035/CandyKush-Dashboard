"use client";
import React, { Suspense } from "react";
import Image from "next/image";
import { FaCheck, FaTimes } from "react-icons/fa";
import { useSelector } from "react-redux";
import { isSidebarOpen } from "@/Redux/Slices/dashboardSlice";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { getOrders, updateOrders } from "@/lib/helper";
import CurrencyFormat from "react-currency-format";
import LoaderSpinner from "@/components/LoaderSpinner"; // Import your loader spinner component
const OrdersTable = React.lazy(() => import("@/components/Orders/OrdersTable")); // Lazy load OrdersTable component

const Page = () => {
  const isSideBarOpen = useSelector(isSidebarOpen);
  return (
    <div className="p-4 w-full">
      <div
        className={`rounded-xl overflow-x-hidden h-[56.5rem] ${
          isSideBarOpen && "ml-64"
        }`}
      >
        <div className="relative shadow-2xl sm:rounded-lg h-full ">
          <Suspense fallback={<LoaderSpinner />}>
            <OrdersTable /> 
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default Page;
