import { ThunkDispatch } from "@reduxjs/toolkit";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetAllpropertysThunk } from "../../../../Redux/Property/property-thunk";
import EditableProperty from "./PropertyEditCard";
import LoadingComponent from "../../../../components/Status-components/Loading";
import { AiOutlineLoading } from "react-icons/ai";
import { setSuccsess } from "../../../../Redux/Property/property-slice";
import SearchBar from "../../../Home/views/header/components/SearchBar";
import Pagination from "../../../Home/views/products/components/Pagination";
import { UseGeneralContext } from "../../../../contexts/GeneralContext";
export default function PropertyEdit() {
  const dispatchThunk = useDispatch<ThunkDispatch<any, any, any>>();
  const { state } = UseGeneralContext();
  const { data, loading, isDelete } = useSelector(
    (state: any) => state.propertyReducer
  );
  const [currentPage, setCurrentPage] = React.useState(1);

  const handlePageChange = (newPage: number) => {
    if (newPage > data.totalPages || newPage < 1) {
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
      status: "ACTIVE",
    };
    dispatchThunk(GetAllpropertysThunk(query));
    setCurrentPage(newPage);
  };
  useEffect(() => {
    let query = {
      page: 1,
      limit: 10,
      minPrice: 0,
      maxPrice: 9000000000,
      featureType: "",
      propertyType: "",
      search: "",
      location: "",
      status: "ACTIVE",
    };
    dispatchThunk(GetAllpropertysThunk(query));
    dispatchThunk(setSuccsess());
  }, [isDelete]);

  return (
    <div className="w-[100%] h-[100%] relative overflow-y-scroll items-center justify-center flex flex-wrap  gap-3 mt-10 p-5 ">
      <>
        {loading && (
          <p className="text-[5rem]  z-50 text-[#ec2b58] absolute  left-1/2 top-20     animate-spin ">
            <AiOutlineLoading className="rotate" />
          </p>
        )}
      </>
      <div className="flex flex-col top-2 absolute w-[100%] items-center justify-center gap-2">
        <SearchBar />
        <Pagination
          currentPage={currentPage}
          totalPages={data?.totalPages}
          dataLength={data?.dataLength}
          onPageChange={handlePageChange}
        />
      </div>

      <div className="w-[100%] h-[100%] overflow-y-scroll   items-start justify-start flex flex-col mt-40 gap-4 p-5 ">
        {data?.data?.map((val: any) => (
          <EditableProperty key={val.id} property={val} />
        ))}
      </div>
    </div>
  );
}
