import React, { useState } from "react";
import Image from "next/image";
import { FaCheck, FaTimes } from "react-icons/fa";
import { useMutation, useQueryClient } from "react-query";
import { updateOrders } from "@/lib/helper";
import CurrencyFormat from "react-currency-format";

const OrdersRow = ({
  customerNumber,
  orderItems,
  totalPrice,
  orderId,
  refetchOrders,
}) => {
  const [showPopup, setShowPopup] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState(""); // State to manage selected payment option

  const handleAccepted = () => {
    setShowPopup(true); // Open the popup when "Accepted" button is clicked
  };

  const handleRejected = async () => {
    try {
      await updateOrders(orderId, { status: "Rejected" });
      refetchOrders();
    } catch (error) {
      console.error("Error rejecting order:", error);
    }
  };

  const handleClosePopup = () => {
    setShowPopup(false);
    setSelectedPayment(""); // Reset selected payment option when closing the popup
  };

  const handleConfirmAcceptance = async () => {
    try {
      await updateOrders(orderId, {
        status: "Delivered",
        payment: selectedPayment,
      });
      refetchOrders();
      setShowPopup(false); // Close the popup after confirming acceptance
    } catch (error) {
      console.error("Error accepting order:", error);
    }
  };

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
      <td className="px-4 py-4">
        <div className="flex justify-center items-center">
          <button
            type="button"
            onClick={handleAccepted}
            className="mr-3 w-[6rem] text-xs bg-carpetMoss/90 hover:bg-carpetMoss text-white py-2 px-2 rounded-full focus:outline-none focus:shadow-outline"
          >
            <FaCheck className="inline-block mr-1" /> Accepted
          </button>
          <button
            type="button"
            onClick={handleRejected}
            className="text-xs w-[6rem] bg-red-500 hover:bg-red-700 text-white py-2 px-2 rounded-full focus:outline-none focus:shadow-outline"
          >
            <FaTimes className="inline-block mr-1" /> Rejected
          </button>
        </div>
      </td>

      {/* Popup for selecting payment option */}
      {showPopup && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-4 rounded-lg w-96 h-56 flex flex-col items-center justify-center">
            <h2 className="text-2xl font-semibold mb-2">
              Select Payment Option
            </h2>
            <div className="flex flex-col items-start px-10 text-lg py-2  w-full">
              <div className="flex items-center mb-2">
                <input
                  type="radio"
                  id="cash-payment"
                  name="payment"
                  value="Cash"
                  checked={selectedPayment === "Cash"}
                  onChange={() => setSelectedPayment("Cash")}
                />
                <label htmlFor="cash-payment" className="ml-2 cursor-pointer">
                  Cash
                </label>
              </div>

              <div className="flex items-center">
                <input
                  type="radio"
                  id="card-payment"
                  name="payment"
                  value="Card"
                  checked={selectedPayment === "Card"}
                  onChange={() => setSelectedPayment("Card")}
                />
                <label htmlFor="card-payment" className="ml-2 cursor-pointer">
                  Card
                </label>
              </div>
            </div>

            <div className="mt-4 flex justify-end">
              <button
                onClick={handleClosePopup}
                className="mr-4 px-4 py-2 bg-gray-300 text-gray-800 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmAcceptance}
                className="px-4 py-2 bg-green-500 text-white rounded-lg"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </tr>
  );
};

export default OrdersRow;
