'use client'
import Sidebar from "@/components/Sidebar/Sidebar";
import Topebar from "@/components/Sidebar/Topbar";
import { signIn, signOut, useSession } from "next-auth/react";
import { useState, useEffect } from "react";

const Layout = ({ children }) => {
  const { data: session, status } = useSession();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (status === "authenticated") {
      // Delay the appearance of the components slightly for a smoother transition
      setTimeout(() => {
        setIsVisible(true);
      }, 500);
    } else {
      setIsVisible(false);
    }
  }, [status]);

  return (
    <>
      {!session ? (
        <div className="w-screen">{children}</div>
      ) : (
        <div>
          {isVisible && <Topebar />}
          <div className={`flex w-screen ${isVisible ? "" : "hidden"}`}>
            {isVisible && <Sidebar />}
            <div className="mt-16 w-full">{children}</div>
          </div>
        </div>
      )}
    </>
  );
};

export default Layout;
