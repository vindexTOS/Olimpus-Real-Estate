import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PropertyCard from "./components/ProductCard";
import { RecivedPropertyTypes } from "../../../../Types/propertyTypes";
import Pagination from "./components/Pagination";
import { ThunkDispatch } from "@reduxjs/toolkit";
import {
  GetAllpropertysThunk,
  GetSinglePropert,
} from "../../../../Redux/Property/property-thunk";
import LoadingSkeleton from "./components/LoadingSkeleton";
import { UseGeneralContext } from "../../../../contexts/GeneralContext";
import { UseLanguageContext } from "../../../../contexts/LanguageContext";
import { motion, useAnimation } from "framer-motion";

function PropertysList() {
  const { lang } = UseLanguageContext();
  const { listingRef, state, dispatch } = UseGeneralContext();
  //  RecivedPropertyTypes[]
  const proepertyData = useSelector((state: any) => state.propertyReducer.data);
  const dispatchThunk = useDispatch<ThunkDispatch<any, any, any>>();
  const { loading } = useSelector((state: any) => state.propertyReducer);
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (newPage: number) => {
    if (newPage > proepertyData.totalPages || newPage < 1) {
      newPage = 1;
    }

    const { location, propertyType, featureType, min, max } = state;
    let query = {
      page: 1,
      limit: 4,
      minPrice: min,
      maxPrice: max,
      featureType: featureType,
      propertyType: propertyType,
      search: "",
      location: location,
    };
    dispatchThunk(GetAllpropertysThunk(query));
    setCurrentPage(newPage);
  };

  if (loading) {
    return (
      <div
        ref={listingRef}
        className="w-[100%] h-[100%] px-5 py-10 flex   flex-col items-center gap-8 justify-between bg-brand-white"
      >
        <div className="items-center justify-center text-center">
          <h1 className="text-[2rem]">Discover Our Exclusive Listings</h1>
          <p className="text-[1.2rem]">
            Here You Can See Some Of Our Exclusive Listings We Cherish
          </p>
        </div>
        <div className="w-[100%] items-center justify-center flex flex-wrap">
          {new Array(4).fill("").map((val: string, i: number) => (
            <LoadingSkeleton key={i} />
          ))}
        </div>
        <div className="inline-flex mt-7 xs:mt-0  gap-1">
          <span className="bg-gray-300 rounded-md w-[70px] h-[40px]   animate-pulse"></span>
          <span className=" bg-gray-300  rounded-md w-[70px] h-[40px]  animate-pulse "></span>
        </div>
      </div>
    );
  }

  if (proepertyData && proepertyData.data && proepertyData.data.length > 0) {
    return (
      <div
        ref={listingRef}
        className="w-[100%] h-[100%]  px-5 py-10 flex  bg-brand-white/90 flex-col items-center gap-10 justify-between"
      >
        <div className="items-center justify-center text-center  ">
          <h1 className="text-[2rem]">Discover Our Exclusive Listings</h1>
          <p className="text-[1.2rem]">
            Here You Can See Some Of Our Exclusive Listings We Cherish
          </p>
        </div>
        <div className="w-[100%] items-center justify-center  flex flex-wrap">
          {proepertyData.data.map((val: RecivedPropertyTypes) => {
            return <PropertyCard key={val.id} property={val} />;
          })}
        </div>
        <Pagination
          currentPage={currentPage}
          totalPages={proepertyData.totalPages}
          dataLength={proepertyData.dataLength}
          onPageChange={handlePageChange}
        />
      </div>
    );
  } else {
    return (
      <div
        ref={listingRef}
        className="w-[100%] h-[700px]  px-5 py-10 flex   flex-col items-center gap-10 justify-center   backdrop-blur-xl	"
      >
        <div className="items-center justify-center text-center">
          <h1 className="text-[2rem]">Discover Our Exclusive Listings</h1>
          <p className="text-[1.2rem]">
            Here You Can See Some Of Our Exclusive Listings We Cherish
          </p>
        </div>
        <div className="w-[100%] items-center justify-center  flex flex-wrap text-[5rem] text-red-500">
          {lang
            ? "საკუთრება ამ პარამეტრებით არ მოიძებნა"
            : "The property with these parameters is not present."}
        </div>
      </div>
    );
  }
}

export default PropertysList;
