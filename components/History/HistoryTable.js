import React from "react";
import { useSelector } from "react-redux";
import { selectPaymentFilter } from "@/Redux/Slices/dashboardSlice";
import { useQuery, useQueryClient } from "react-query";
import { getOrders } from "@/lib/helper";
import CurrencyFormat from "react-currency-format";
import HistoryRow from "./HistoryRow";
import LoaderSpinner from "../LoaderSpinner";

const HistoryTable = () => {
  const paymentFilter = useSelector(selectPaymentFilter); // Retrieve payment filter from Redux store
  const queryClient = useQueryClient();

  const { isLoading, isError, data, error } = useQuery("orders", getOrders); // Use "orders" key here

  const refetchOrders = async () => {
    await queryClient.invalidateQueries("orders");
  };

  if (isLoading) return <LoaderSpinner />; // Display loader spinner while loading
  if (isError) return <div>Got Error {error?.message}</div>;

  // Sort orders by date
  const sortedData = [...data].sort(
    (a, b) => new Date(b.orderTime) - new Date(a.orderTime)
  );

  // Apply payment filter if selected
  const filteredData = paymentFilter
    ? sortedData.filter(
        (order) => order.payment === paymentFilter && order.status !== "Pending"
      )
    : sortedData.filter((order) => order.status !== "Pending");

  return (
    <div className="h-full">
      {filteredData < 1 ? (
        <div className="w-full bg-white flex justify-center items-center h-full text-5xl text-carpetMoss font-semibold">
          Your order history is currently empty!
        </div>
      ) : (
        <div>
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
              {filteredData.map(
                ({
                  customerNumber,
                  orderItems,
                  totalPrice,
                  _id,
                  orderTime,
                  status,
                  payment,
                }) => (
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
                )
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default HistoryTable;
