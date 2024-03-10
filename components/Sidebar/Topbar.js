"use client";
import React, { useState } from "react";
import Image from "next/image";
import { useSelector, useDispatch } from "react-redux";
import { isSidebarOpen, setToggleSidebar } from "@/Redux/Slices/dashboardSlice";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";

const Topbar = () => {
  const dispatch = useDispatch();
  const isSideBarOpen = useSelector(isSidebarOpen);

  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleSidebar = () => {
    dispatch(setToggleSidebar());
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const { data: session, status } = useSession();

  return (
    <header className="fixed z-40 top-0 left-0 w-screen">
      <nav
        className={`bg-white border-gray-200 px-4 lg:px-6 py-2.5 ${
          isSideBarOpen && "ml-64"
        }`}
      >
        <div className="flex flex-wrap justify-between items-center">
          <div className="w-full flex justify-between items-center">
            <button
              onClick={toggleSidebar}
              className="p-2 mr-3 text-gray-600 rounded cursor-pointer lg:inline hover:text-gray-900 hover:bg-gray-100"
            >
              <svg
                className="w-5 h-5"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 16 12"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M1 1h14M1 6h14M1 11h7"
                />
              </svg>
            </button>

            <button
              onClick={toggleDropdown}
              type="button"
              className="relative flex items-center justify-center space-x-2 mx-3 text-sm rounded-full md:mr-0 "
            >
              <span className="sr-only">Open user menu</span>

              <Image
                className=" bg-cover"
                src="/images/logo.png"
                alt="user photo"
                width={35}
                height={35}
              />
              <h2 className="text-black/50 font-medium">
                {session?.user?.name}
              </h2>
            </button>
            {/* Dropdown menu */}
            {dropdownOpen && (
              <div className="absolute z-50 top-14 right-2 mt-2 w-56 text-base list-none bg-white rounded divide-y divide-gray-100 shadow">
                <ul className="py-1 text-gray-500" aria-labelledby="dropdown">
                  <li>
                    <Link
                      href="/user"
                      onClick={toggleDropdown}
                      className="block py-2 px-4 text-sm hover:bg-gray-100"
                    >
                      Account settings
                    </Link>
                  </li>
                </ul>

                <ul className="py-1 text-gray-500" aria-labelledby="dropdown">
                  <li>
                    <a
                      onClick={() => signOut()}
                      className="block py-2 px-4 text-sm hover:bg-gray-100"
                    >
                      Sign out
                    </a>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Topbar;
