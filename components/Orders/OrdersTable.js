import React, { useEffect, useRef, useState, Suspense } from "react";
import Image from "next/image";
import { FaCheck, FaTimes } from "react-icons/fa";
import { useSelector } from "react-redux";
import { isSidebarOpen } from "@/Redux/Slices/dashboardSlice";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { getOrders, updateOrders } from "@/lib/helper";
import CurrencyFormat from "react-currency-format";
import OrdersRow from "./OrdersRow";
import LoaderSpinner from "@/components/LoaderSpinner"; // Import your loader spinner component

const OrdersTable = () => {
  const { isLoading, isError, data, error, refetch } = useQuery(
    "orders",
    getOrders,
    {
      refetchOnWindowFocus: false,
      refetchIntervalInBackground: true,
      refetchInterval: 3000, // Refetch data every 3000 milliseconds (3 seconds)
    }
  );

  const queryClient = useQueryClient();
  const prevDataLengthRef = useRef(0); // Ref to keep track of previous data length
  const [isFirstMount, setIsFirstMount] = useState(true); // State to track first mount

  useEffect(() => {
    setIsFirstMount(false); // Set isFirstMount to false after the first mount
  }, []);

  // Update document title
  useEffect(() => {
    if (!data) return;

    const pendingOrdersCount = data.filter(
      (order) => order.status === "Pending"
    ).length;
    document.title =
      pendingOrdersCount > 0
        ? `(${pendingOrdersCount}) Pending Orders`
        : "Candy Kush - Admin Panel";
  }, [data]);

  useEffect(() => {
    if (!data) return;

    const newPendingOrders = data.filter((order) => order.status === "Pending");

    if (!isFirstMount && newPendingOrders.length > prevDataLengthRef.current) {
      playNotificationSound();
    }

    prevDataLengthRef.current = newPendingOrders.length;
  }, [data]);

  const refetchOrders = async () => {
    await queryClient.invalidateQueries("orders");
  };

  const playNotificationSound = () => {
    try {
      const notificationSound = new Audio("/ordersound.wav");
      notificationSound.play();
    } catch (error) {
      console.error("Error playing notification sound:", error);
    }
  };

  if (isLoading) return <LoaderSpinner />; // Display loader spinner while loading

  if (isError) return <div>Got Error {error?.message}</div>;

  return (
    <div className="h-full">
      {data && data.filter((order) => order.status === "Pending") < 1 ? (
        <div className="w-full bg-white flex justify-center items-center h-full text-5xl text-carpetMoss font-semibold">
          All clear on pending orders!
        </div>
      ) : (
        <table className="w-full text-sm bg-white text-left rtl:text-right text-gray-500">
          <caption className="text-3xl py-2 sticky top-0 bg-white">
            Pending Orders
          </caption>
          <thead className="text-white bg-carpetMoss sticky top-[3.25rem]">
            <tr>
              <th scope="col" className="px-4 py-3 text-center">
                Customer No
              </th>
              <th scope="col" className="px-8 py-3 text-center">
                Product
              </th>
              <th scope="col" className="px-4 py-3 text-center">
                Total Price
              </th>
              <th scope="col" className="px-4 py-3 text-center">
                Order Time
              </th>
              <th scope="col" className="px-4 py-3 text-center">
                Actions
              </th>
            </tr>
          </thead>
          <tbody
            className="divide-y-4 divide-solid"
            style={{ maxHeight: "400px", overflowY: "auto" }}
          >
            {data &&
              data
                .filter((order) => order.status === "Pending")
                .map(({ customerNumber, orderItems, totalPrice, _id, orderTime }) => (
                  <OrdersRow
                    key={_id}
                    customerNumber={customerNumber}
                    orderItems={orderItems}
                    totalPrice={totalPrice}
                    orderId={_id}
                    orderTime={orderTime}
                    refetchOrders={refetchOrders} // Pass refetchOrders as prop to OrdersRow
                  />
                ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default OrdersTable;
