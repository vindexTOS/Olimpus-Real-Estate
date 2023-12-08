import React, { useState } from "react";
import { UseGeneralContext } from "../../contexts/GeneralContext";
import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import Cookies from "universal-cookie";

export default function Admin() {
  const { adminData } = UseGeneralContext();
  const navigate = useNavigate();
  const [sideNav, setSideNav] = useState(true);
  const cookies = new Cookies();
  const logout = () => {
    cookies.remove("token");
    window.location.reload();
  };
  if (adminData && adminData.userName) {
    return (
      <div className="flex flex-col items-start justify-center  max-h-[100%] ">
        {/* <FaBars
          className="text-[3rem] text-white absolute top-40 z-50"
          onClick={() => setSideNav(!sideNav)}
        /> */}

        <nav className="w-[100%] h-[90px] bg-brand-white shadow-md py-15 flex-col">
          <div className="flex   items-center justify-center py-10 gap-1">
            <button
              onClick={() => navigate("/")}
              className={`p-2  bg-blue-400 text-brand-white w-[20%] hover:bg-blue-300  `}
            >
              მთავარ გვერდძე დაბრუნება{" "}
            </button>
            <button
              onClick={() => navigate("property")}
              className={`p-2 bg-blue-400 text-brand-white w-[20%] hover:bg-blue-300  `}
            >
              საკუთრების სია/ რედაქტირება
            </button>
            <button
              onClick={() => navigate("agent_add")}
              className={`p-2 bg-blue-400 text-brand-white w-[20%] hover:bg-blue-300`}
            >
              დაამატე აგენტი
            </button>
            <button
              onClick={() => navigate("property_add")}
              className={`p-2 bg-blue-400 text-brand-white w-[20%] hover:bg-blue-300`}
            >
              დაამატე საკუთრება
            </button>
            <h1 className="text-gray-500 text-[1rem] px-5">
              Admin Name:
              <span className="text-red-400">{adminData.userName}</span>
            </h1>
            <button
              onClick={logout}
              className={`p-2 bg-red-400 text-brand-white rounded-[4px]  hover:bg-red-300`}
            >
              გასვლა
            </button>
          </div>
        </nav>

        <div className="w-[100%] min-h-[1000px] max-h-[100%]    overflow-y-hidden bg-brand-green/70">
          <Outlet />
        </div>
      </div>
    );
  } else {
    return <Navigate to="/admin" />;
  }
}
