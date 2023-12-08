import React, { useEffect } from "react";
import Hero from "../../components/Hero/Hero";
import Header from "./views/header/header";
import PropertysList from "./views/products/products";
import CreateListing from "./views/create_listing/createListing";
import { GetAllpropertysThunk } from "../../Redux/Property/property-thunk";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import Agents from "./views/agents/Agents";
import { UseGeneralContext } from "../../contexts/GeneralContext";
function Home() {
  const dispatchThunk = useDispatch<ThunkDispatch<any, any, any>>();
  const { agentsRef } = UseGeneralContext();
  useEffect(() => {
    let query = {
      page: 1,
      limit: 4,
      minPrice: 0,
      maxPrice: 9000000,
      featureType: "",
      propertyType: "",
      search: "",
      location: "",
    };
    dispatchThunk(GetAllpropertysThunk(query));
  }, []);
  return (
    <div className="  flex  flex-col  items-center justify-center">
      <Header />
      <PropertysList />

      <CreateListing />

      <Agents />
    </div>
  );
}

export default Home;
