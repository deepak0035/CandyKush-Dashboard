import React from "react";
import Image from "next/image";
import { FaCheck, FaTimes } from "react-icons/fa";
import { useMutation, useQueryClient } from "react-query";
import { updateOrders } from "@/lib/helper";
import CurrencyFormat from "react-currency-format";

const HistoryRow = ({
  customerNumber,
  orderItems,
  totalPrice,
  orderId,
  orderTime,
  orderUpdateTime,
  status,
  payment,
  refetchOrders,
}) => {
  const handleAccepted = async () => {
    try {
      await updateOrders(orderId, { status: "Delivered" });
      refetchOrders(); // Call the refetchOrders function after updating the status
    } catch (error) {
      console.error("Error accepting order:", error);
    }
  };

  const handleRejected = async () => {
    try {
      await updateOrders(orderId, { status: "Rejected" });
      refetchOrders(); // Call the refetchOrders function after updating the status
    } catch (error) {
      console.error("Error rejecting order:", error);
    }
  };

  function formatOrderTime(orderTime) {
    const date = new Date(orderTime);
    const formattedOrderTime =
      date.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      }) +
      " , " +
      date.toLocaleDateString("en-US", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      });

    return formattedOrderTime;
  }
  return (
    <tr
      key={orderId}
      className="bg-white divide-x-2 divide-solid divide-gray-300"
    >
      <td className="px-4 py-4 text-lg font-medium text-gray-700 whitespace-nowrap ">
        <div className="flex justify-center items-center">
          <h1>{customerNumber}</h1>
        </div>
      </td>
      <td className="px-4 py-2  flex flex-col justify-center items-center">
        {orderItems &&
          orderItems.map(
            ({
              productName,
              productType,
              productQuality,
              productImage,
              productSize,
              productQuantity,
              productPrice,
              _id,
            }) => {
              return (
                <div
                  key={_id}
                  className="grid grid-cols-8 py-2 place-items-center"
                >
                  <div className="col-span-1 flex justify-center items-center">
                    <Image
                      className=" bg-cover"
                      quality={100}
                      src={productImage}
                      alt="user photo"
                      height={35}
                      width={35}
                    />
                  </div>

                  <div className="text-center col-span-7 ">
                    <div className="flex justify-start items-center">
                      <h1 className="text-lg font-medium text-gray-900">
                        {productName}
                      </h1>
                      <span className="text-sm mx-2 h-6 w-6 text-white flex justify-center items-center bg-carpetMoss rounded-full">
                        {productQuantity}
                      </span>
                    </div>
                    <div className="flex justify-start text-sm divide-x-2 divide-solid divide-gray-300">
                      <span className="pr-2">Type: {productType}</span>
                      <span className="pl-2">Quality: {productQuality}</span>
                    </div>
                    <div className="flex justify-start text-sm divide-x-2 divide-solid divide-gray-300">
                      <span className="pr-2">Size: {productSize}</span>
                      <span className="pl-2">
                        Price:
                        <CurrencyFormat
                          value={productPrice}
                          displayType={"text"}
                          thousandSeparator={true}
                          prefix={"฿"}
                          className="text-pottBlack px-1"
                        />
                      </span>
                    </div>
                  </div>
                </div>
              );
            }
          )}
      </td>
      <td className="px-4 py-4 text-center text-lg font-medium text-gray-700">
        <CurrencyFormat
          value={totalPrice}
          displayType={"text"}
          thousandSeparator={true}
          prefix={"฿"}
          className="text-pottBlack px-1"
        />
      </td>
      <td className="px-4 py-4 text-lg font-medium">
        <div className="flex justify-center items-center">
          <p className="text-gray-700">
            Order Created: {formatOrderTime(orderTime)}
          </p>
        </div>
        <div className="flex justify-center items-center">
          <p className="text-gray-700">
            Order Updated: {formatOrderTime(orderUpdateTime)}
          </p>
        </div>
      </td>

      <td className="px-4 py-4">
        <div className="flex justify-center items-center">
          <div
            className={`px-4 py-2 rounded-full ${
              status === "Delivered" ? "bg-green-500" : "bg-red-500"
            } text-white mr-2`}
          >
            {status}
          </div>
          {status === "Delivered" && (
            <div
              className={`px-4 py-2 rounded-full ${
                payment === "Cash" ? "bg-blue-500" : "bg-gray-600"
              } text-white`}
            >
              Paid by {payment}
            </div>
          )}
        </div>
      </td>
    </tr>
  );
};

export default HistoryRow;
