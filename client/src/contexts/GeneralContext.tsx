import { jwtDecode } from "jwt-decode";
import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useRef,
  useState,
} from "react";
import { UserType } from "../Types/user-types";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { GetAllpropertysThunk } from "../Redux/Property/property-thunk";
type Cell = {
  adminData: UserType;
  homeRef: any;
  listingRef: any;
  createRef: any;
  state: any;
  dispatch: any;
  agentsRef: any;
};
import Cookies from "universal-cookie";
import { getToken } from "../Redux/Auth/Auth-slice";
const GeneralContext = createContext<Cell | null>(null);

export const GeneralContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const cookies = new Cookies();
  const navigation = useNavigate();
  const { token } = useSelector((state: any) => state.AuthReducer);
  const { data } = useSelector((state: any) => state.propertyReducer);
  const dispatchThunk = useDispatch<ThunkDispatch<any, any, any>>();
  const cookie = new Cookies();
  const [adminData, setAdmin] = useState<UserType | any>();
  // single page
  useEffect(() => {
    let token = cookie.get("token");
    dispatchThunk(getToken(token));
  }, []);
  useEffect(() => {
    if (token) {
      const decodedToken = jwtDecode(token);
      setAdmin(decodedToken);
    }
  }, [token]);

  const initialstate = {
    location: "",
    propertyType: "",
    featureType: "",
    min: 0,
    max: 900000,
  };

  const reducer = (state: any, action: any) => {
    switch (action.type) {
      case "location":
        return { ...state, location: action.payload };
      case "propertyType":
        return { ...state, propertyType: action.payload };
      case "featureType":
        return { ...state, featureType: action.payload };
      case "min":
        return { ...state, min: action.payload };
      case "max":
        return { ...state, max: action.payload };
      default:
        return { ...state };
    }
  };

  const [state, dispatch] = useReducer(reducer, initialstate);

  let homeRef = useRef(null);
  let listingRef = useRef(null);
  let createRef = useRef(null);
  let agentsRef = useRef(null);
  // useEffect(() => {
  //   let query = {
  //     page: 1,
  //     limit: 4,
  //     minPrice: 0,
  //     maxPrice: 9000000,
  //     featureType: "",
  //     propertyType: "",
  //     search: "",
  //     location: "",
  //   };
  //   dispatchThunk(GetAllpropertysThunk(query));
  // }, []);
  return (
    <GeneralContext.Provider
      value={{
        adminData,
        homeRef,
        listingRef,
        createRef,
        state,
        dispatch,
        agentsRef,
      }}
    >
      {children}
    </GeneralContext.Provider>
  );
};

export const UseGeneralContext = () => {
  const context = useContext(GeneralContext);
  if (!context) {
    throw new Error("Context Not Wrapped Reload Page");
  }

  return context;
};
