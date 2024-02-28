import React, { useState, useEffect } from "react";
import { FaShoppingCart, FaHistory } from "react-icons/fa"; // Importing icons
import Image from "next/image";
import { useSelector, useDispatch } from "react-redux";
import {
  setPaymentFilter,
  isSidebarOpen,
  selectPaymentFilter,
} from "@/Redux/Slices/dashboardSlice";
import styles from "./LogoAnimation.module.css";
import logo from "@/public/images/logoBg.png";
import { useQuery } from "react-query";
import { getOrders } from "@/lib/helper";
import Link from "next/link"; // Import Link component from Next.js
import { usePathname } from "next/navigation";

const Sidebar = ({}) => {
  const pathname = usePathname();
  const dispatch = useDispatch();
  const selectedPayment = useSelector(selectPaymentFilter); // Retrieve payment filter from Redux store

  const isSideBarOpen = useSelector(isSidebarOpen);
  const { isLoading, isError, data, error } = useQuery("orders", getOrders); // Use "orders" key here
  const totalOrders = data?.length;
  const [animationIndex, setAnimationIndex] = useState(0);

  useEffect(() => {
    const animationDurations = [2, 3, 4]; // Animation durations for each path
    let currentIndex = 0;

    const interval = setInterval(() => {
      setAnimationIndex(currentIndex);
      currentIndex = ++currentIndex % 4;
    }, 500); // Total duration of all animations

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <aside
        id="logo-sidebar"
        className={`fixed z-50 w-64 h-full shadow-2xl transition-transform ${
          isSideBarOpen ? "translate-x-0" : "-translate-x-full"
        } bg-white border-r border-gray-200`}
        aria-label="Sidebar"
      >
        {/* Sidebar content */}
        <div className="bg-white flex flex-col items-center py-8">
          <div className="col-span-1 flex items-center justify-center">
            <div className="relative">
              <svg
                version="1.1"
                id="Layer_1"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                x="0px"
                y="0px"
                viewBox="0 0 94.62 192.14"
                enableBackground="new 0 0 94.62 192.14"
                xmlSpace="preserve"
                className="absolute w-10 h-10 top-10 -left-2"
              >
                <g id="Layer_1">
                  <g>
                    <g>
                      <path
                        className={`${styles.logoPath} ${
                          animationIndex >= 1 ? styles.draw : ""
                        }`}
                        fill="#FFFFFF" // Filled color
                        d="M75.25,176.65c-1.7,1.31-5.55-0.58-7.11-1.49c-2.12-1.23-4.1-2.93-5.51-4.95
                        c-2.21-3.19-3.13-7.06-4.23-10.77c-0.96-3.23-2.11-6.43-3.65-9.44c-1.56-3.06-3.88-5.45-5.64-8.34
                        c-0.01-0.01,2.57,0.18,2.84,0.25c0.84,0.23,1.67,0.57,2.46,0.93c1.67,0.76,3.21,1.79,4.59,2.99c2.84,2.49,5,5.75,6.29,9.29
                        c1.69,4.64,2.05,9.76,4.33,14.14C71.1,172.09,73.62,174.02,75.25,176.65z"
                      />

                      <path
                        className={`${styles.logoPath} ${
                          animationIndex >= 2 ? styles.draw : ""
                        }`}
                        fill="#FFFFFF" // Filled color
                        d="M32.97,140.33c-1.99,0.35-4.27-4.02-5.02-5.32c-1.46-2.52-2.58-5.24-3.17-8.1
                        c-0.91-4.42-0.5-9.17,1.59-13.17c2.55-4.88,7.2-8.11,10.36-12.53c1.71-2.39,2.84-5.13,3.67-7.94c0.8-2.69,0.9-5.88,1.95-8.42
                        c1.91,3.13,2.59,8.08,2.72,11.7c0.14,4.09-0.82,8.13-3.08,11.57c-2.25,3.41-5.59,6.05-7.58,9.62c-1.68,3.01-2.29,6.51-2.3,9.95
                        c-0.01,3.6,0.66,7.1,1.24,10.63C33.58,139.69,33.38,140.25,32.97,140.33z"
                      />
                      <path
                        className={`${styles.logoPath} ${
                          animationIndex >= 3 ? styles.draw : ""
                        }`}
                        fill="#FFFFFF" // Filled color
                        d="M14.35,88.29c1.35-3.51,4.36-6.23,6.51-9.25c2.23-3.14,3.32-7.08,2.97-10.92
                        c-0.53-5.86-4.07-10.79-6.54-15.95c-2.57-5.37-4.23-11.41-3.27-17.39c0.76-4.77,3.29-9.14,6.88-12.36
                        c2.57-2.3,9.11-6.09,12.57-5.63c-1.14,2.51-4.27,4.09-6.22,5.97c-3.18,3.05-5.13,7.34-5.35,11.74
                        c-0.54,10.93,8.97,20.17,9.53,31.09c0.27,5.17-1.65,10.21-4.75,14.29c-1.59,2.1-3.61,4.11-5.71,5.69
                        C19.18,86.91,16.65,88.4,14.35,88.29z"
                      />
                    </g>
                  </g>
                </g>
              </svg>
              <Image
                src={logo}
                width={110}
                height={110}
                alt="Picture of the author"
                priority
                className="cursor-pointer object-cover"
              />
            </div>
          </div>

          <h2 className="font-medium text-carpetMoss text-lg mt-4">
            Admin Panel
          </h2>
        </div>
        <div className="h-full pb-4 overflow-y-auto bg-carpetMoss">
          <ul className="">
            <li className="p-2 border-b border-gray-100/35">
              <Link href="/" passHref>
                <button
                  className={`flex items-center p-2 text-white rounded-lg group ${
                    pathname === "/" ? "text-white" : "text-white/50"
                  }
                  }`}
                >
                  <FaShoppingCart className="w-6 h-6  transition duration-75" />
                  <span className="ms-2">Orders</span>
                 {pathname === '/' && <span className="text-sm mx-2 h-5 w-5 text-carpetMoss flex justify-center items-center bg-white rounded-full">
                    {/* Display total pending orders count */}
                    {data &&
                      data.filter((order) => order.status === "Pending").length}
                  </span>}
                </button>
              </Link>
            </li>
            <li className="p-2">
              <Link href="/history" passHref>
                <button
                  className={`flex items-center p-2 text-white rounded-lg group ${
                    pathname === "/history" ? "text-white" : "text-white/50"
                  }
                  }`}
                >
                  <FaHistory className="w-6 h-6 transition duration-75" />
                  <span className="ms-2">History</span>
                </button>
              </Link>
        {     pathname === '/history' && <div className="mt-8 px-2">
                {/* Professional filter section */}
                <h3 className="text-white text-xl font-medium mb-2">
                  Filter by :
                </h3>
                <div className="flex flex-col items-start mb-2">
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="cash"
                      name="payment"
                      value="Cash"
                      checked={selectedPayment === "Cash"}
                      onChange={() => dispatch(setPaymentFilter("Cash"))}
                      className="mr-2 cursor-pointer"
                    />
                    <label
                      htmlFor="cash"
                      className="text-white mr-4 cursor-pointer"
                    >
                      Cash
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="card"
                      name="payment"
                      value="Card"
                      checked={selectedPayment === "Card"}
                      onChange={() => dispatch(setPaymentFilter("Card"))}
                      className="mr-2 cursor-pointer"
                    />
                    <label
                      htmlFor="card"
                      className="text-white mr-4 cursor-pointer"
                    >
                      Card
                    </label>
                  </div>
                </div>
                <button
                  onClick={() => dispatch(setPaymentFilter(null))}
                  className="py-2 px-4 bg-white text-carpetMoss rounded-md hover:bg-opacity-90 focus:outline-none"
                >
                  Clear Filter
                </button>
              </div>}
            </li>
          </ul>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
