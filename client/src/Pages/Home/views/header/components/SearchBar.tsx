import { ThunkDispatch } from "@reduxjs/toolkit";
import React, { useState } from "react";
import { CiSearch } from "react-icons/ci";
import { useDispatch } from "react-redux";
import { GetAllpropertysThunk } from "../../../../../Redux/Property/property-thunk";

function SearchBar() {
  const [serach, setSearch] = useState("");
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();

  const sendSearchQuery = () => {
    let query = {
      page: 1,
      limit: 5,
      minPrice: 0,
      maxPrice: 9000000,
      featureType: "",
      propertyType: "",
      search: serach,
    };
    dispatch(GetAllpropertysThunk(query));
  };
  return (
    <div className="bg-brand-green/70  h-[50px] w-[35%] max_smm1:w-[90%] rounded-[80px] flex items-center justify-between  px-2 ">
      <input
        onChange={(e) => setSearch(e.target.value)}
        className="bg-brand-green/5    text-brand-white h-[90%] rounded-[100px] w-[100%] outline-none"
        placeholder="serach..."
      />
      <div
        onClick={sendSearchQuery}
        className="bg-brand-white flex items-center justify-center rounded-[50%] w-[50px] h-[85%] "
      >
        <CiSearch className="text-[1.5rem] hover:scale-[1.2] cursor-pointer" />
      </div>
    </div>
  );
}

export default SearchBar;
