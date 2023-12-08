import { ThunkDispatch } from "@reduxjs/toolkit";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetAllpropertysThunk } from "../../Redux/Property/property-thunk";
import LoadingSkeleton from "../Home/views/products/components/LoadingSkeleton";
import { RecivedPropertyTypes } from "../../Types/propertyTypes";
import PropertyCard from "../Home/views/products/components/ProductCard";
import Pagination from "../Home/views/products/components/Pagination";
import { UseLanguageContext } from "../../contexts/LanguageContext";

export default function SimularProperties() {
  const { lang } = UseLanguageContext();
  const { loading } = useSelector((state: any) => state.propertyReducer);
  const proepertyData = useSelector((state: any) => state.propertyReducer.data);
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (newPage: number) => {
    if (newPage > proepertyData.totalPages || newPage < 1) {
      newPage = 1;
    }

    let query = {
      page: newPage,
      limit: 5,
      minPrice: 0,
      maxPrice: 9000000,
      featureType: "",
      propertyType: "",
      search: "",
    };
    dispatch(GetAllpropertysThunk(query));
    setCurrentPage(newPage);
  };
  if (loading) {
    return (
      <div className="w-[100%] h-[100%] px-5 py-10 flex   flex-col items-center gap-8 justify-between bg-brand-white">
        <div className="items-center justify-center text-center">
          <h1 className="text-[2rem]">Discover Our Exclusive Listings</h1>
          <p className="text-[1.2rem]">
            Here You Can See Some Of Our Exclusive Listings We Cherish
          </p>
        </div>
        <div className="w-[100%] items-center justify-center    flex flex-wrap">
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
      <div className="w-[100%] h-[520px]  max_smm1:h-[100%]  px-5 py-2 flex  bg-brand-white  flex-col items-center      ">
        <div className="items-center w-[100%] justify-around text-center flex  ">
          <h1 className="text-[2rem]">
            {lang ? "მზგავსი პროდუქცია" : "Similar products"}
          </h1>{" "}
          {/* <Pagination
            currentPage={currentPage}
            totalPages={proepertyData.totalPages}
            dataLength={proepertyData.dataLength}
            onPageChange={handlePageChange}
          /> */}
        </div>
        <div className="w-[100%] items-center justify-center  flex flex-wrap">
          {proepertyData.data.map((val: RecivedPropertyTypes) => {
            return <PropertyCard key={val.id} property={val} />;
          })}
        </div>
      </div>
    );
  }
}
