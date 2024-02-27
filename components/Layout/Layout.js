'use client';
import Sidebar from "@/components/Sidebar/Sidebar";
import Topebar from "@/components/Sidebar/Topbar";
import { useSelector, useDispatch } from "react-redux";
import { isSidebarOpen } from "@/Redux/Slices/cartSlice";

const Layout = ({ children }) =>
{
      const isSideBarOpen = useSelector(isSidebarOpen);

  return (
    <div>
      <Topebar />
      <div className="flex w-screen"> 
          <Sidebar/>
        <div className="mt-16 w-full">{children}</div>
      </div>
    </div>
  );
};

export default Layout;
