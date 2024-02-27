import React from "react";
import Image from "next/image";
import { FaCheck, FaTimes } from "react-icons/fa";
import { useSelector } from "react-redux";
import { isSidebarOpen } from "@/Redux/Slices/cartSlice";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { getOrders, updateOrders } from "@/lib/helper";
import CurrencyFormat from "react-currency-format";
import HistoryRow from "./HistoryRow";

const HistoryTable = () => {
  const { isLoading, isError, data, error } = useQuery("orders", getOrders); // Use "orders" key here

  const queryClient = useQueryClient();

  const refetchOrders = async () => {
    await queryClient.invalidateQueries("orders");
  };

  if (isLoading) return <div>Orders Data Loading...</div>; // Updated loading message
  if (isError) return <div>Got Error {error?.message}</div>;

  return (
    <table className="w-full text-sm bg-white text-left rtl:text-right text-gray-500">
      <caption className="text-3xl py-2 sticky top-0 bg-white">
        Orders History
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
            Time
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
            .filter((order) => order.status !== "Pending") // Filter orders with status "Pending"
            .map(({ customerNumber, orderItems, totalPrice, _id, orderTime, status, payment }) => {
              return (
                <HistoryRow
                  key={_id}
                  customerNumber={customerNumber}
                  orderItems={orderItems}
                  totalPrice={totalPrice}
                      orderId={_id}
                      orderTime={orderTime}
                      status={status}
                      payment={payment}
                  refetchOrders={refetchOrders}
                />
              );
            })}
      </tbody>
    </table>
  );
};

export default HistoryTable;
