import { ThunkDispatch } from "@reduxjs/toolkit";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { getUserName, getPassword } from "../../Redux/Auth/Auth-slice";
import { LoginThunk } from "../../Redux/Auth/Auth-thunk";
import LoadingComponent from "../../components/Status-components/Loading";
import Succsess from "../../components/Status-components/Success";
import useOutClick from "../../hooks/useOutClick";

import Error from "../../components/Status-components/Error";
const Login = () => {
  const navigate = useNavigate();
  const ref = useRef<HTMLDivElement | null>(null);
  const navigateOut = () => {
    navigate("/");
  };
  useOutClick(ref, navigateOut);

  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const { password, userName, error, loading, success, token } = useSelector(
    (state: any) => state.AuthReducer
  );
  const handleLogin = async () => {
    await dispatch(LoginThunk({ userName, password }));
  };
  if (!token) {
    return (
      <div
        onClick={() => console.log(token)}
        className="flex items-center loginBg    justify-center h-[1000px]  "
      >
        <div className="flex items-center     justify-center  backdrop-blur-md  bg-gray-300/10   w-[100vw] h-[100%] top-0 left-0">
          <div
            ref={ref}
            className="bg-brand-white p-8  rounded shadow-md w-full sm:w-96"
          >
            <h2 className="text-2xl font-semibold mb-4">{}</h2>
            <div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-medium mb-2">
                  EMAIL
                </label>
                <input
                  onChange={(e) => dispatch(getUserName(e.target.value))}
                  type="email"
                  className="w-full p-2 border rounded shadow-sm"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-medium mb-2">
                  PASSWORD
                </label>
                <input
                  onChange={(e) => dispatch(getPassword(e.target.value))}
                  type="password"
                  className="w-full p-2 border rounded shadow-sm"
                />
              </div>
              <button
                onClick={handleLogin}
                type="submit"
                className="w-full bg-blue-500 brand-white py-2 px-4 rounded hover:bg-blue-600"
              >
                LOGIN
              </button>
            </div>
          </div>
        </div>
        <Error error={error} />
        <Succsess success={success} />
        <LoadingComponent loading={loading} />
      </div>
    );
  } else {
    return <Navigate to="/admin-dashboard/property" />;
  }
};

export default Login;
