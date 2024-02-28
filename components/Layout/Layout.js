"use client";
import Sidebar from "@/components/Sidebar/Sidebar";
import Topebar from "@/components/Sidebar/Topbar";
import { useSelector, useDispatch } from "react-redux";
import { isSidebarOpen } from "@/Redux/Slices/dashboardSlice";
import { signIn, signOut, useSession } from "next-auth/react";


const Layout = ({ children }) => {
  const { data: session, status } = useSession();

  return (
    <>
      {!session ? (
        <div className=" w-screen">
          {children}
        </div>
      ) : (
        <div>
          <Topebar />
          <div className="flex w-screen">
            <Sidebar />
            <div className="mt-16 w-full">{children}</div>
          </div>
        </div>
      )}
    </>
  );
};

export default Layout;
