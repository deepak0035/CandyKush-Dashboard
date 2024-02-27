import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { FaCheck, FaTimes } from "react-icons/fa";
import { useSelector } from "react-redux";
import { isSidebarOpen } from "@/Redux/Slices/cartSlice";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { getOrders, updateOrders } from "@/lib/helper";
import CurrencyFormat from "react-currency-format";
import OrdersRow from "./OrdersRow";

const OrdersTable = () => {
  const { isLoading, isError, data, error, refetch } = useQuery(
    "orders",
    getOrders
  );
  const queryClient = useQueryClient();
  const prevDataLengthRef = useRef(0); // Ref to keep track of previous data length



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
    
  // Watch for changes in data length
  useEffect(() => {
    if (!data) return;

    const newPendingOrders = data.filter((order) => order.status === "Pending");

    if (newPendingOrders.length > prevDataLengthRef.current) {
      try {
        const notificationSound = new Audio("/ordersound.wav");
        notificationSound.play();
      } catch (error) {
        console.error("Error playing notification sound:", error);
      }
    }

    prevDataLengthRef.current = newPendingOrders.length;
  }, [data]);

  // Function to refetch orders
  const refetchOrders = async () => {
    await queryClient.invalidateQueries("orders");
  };

  // Render loading and error states
  if (isLoading) return <div>Orders Data Loading...</div>;
  if (isError) return <div>Got Error {error?.message}</div>;

  // Render orders table
  return (
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
            .map(({ customerNumber, orderItems, totalPrice, _id }) => (
              <OrdersRow
                key={_id}
                customerNumber={customerNumber}
                orderItems={orderItems}
                totalPrice={totalPrice}
                orderId={_id}
                refetchOrders={refetchOrders} // Pass refetchOrders as prop to OrdersRow
              />
            ))}
      </tbody>
    </table>
  );
};

export default OrdersTable;
