import { useEffect, useReducer, useState } from "react";
import SearchBar from "./SearchBar";
import DropDown from "./DropDown";
import MinMaxInput from "./MinMaxInput";
import { UseLanguageContext } from "../../../../../contexts/LanguageContext";
import { useDispatch } from "react-redux";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { IoFilterSharp } from "react-icons/io5";

import { GetAllpropertysThunk } from "../../../../../Redux/Property/property-thunk";
import { UseGeneralContext } from "../../../../../contexts/GeneralContext";
function Filter() {
  const { state, dispatch } = UseGeneralContext();
  const { refrenceData, lang } = UseLanguageContext();
  const { featureType, propertyType, location } = refrenceData;

  const setStateAction = (type: string, state: string | number) => {
    dispatch({ type: type, payload: state });
  };

  const ReduxDispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const [showFilter, setShowFilter] = useState(false);
  const filterBtn = () => {
    const { location, propertyType, featureType, min, max } = state;
    let query = {
      page: 1,
      limit: 5,
      minPrice: min,
      maxPrice: max,
      featureType: featureType,
      propertyType: propertyType,
      search: "",
      location: location,
    };
    console.log(state);
    ReduxDispatch(GetAllpropertysThunk(query));
  };
  return (
    <div className="w-[100%] z-50 relative  h-[170px] py-2 rounded-t-[7px] bg-gray-100/90 backdrop-blur-xl transition duration-300 hover:bg-[#ffc000]  flex items-center justify-around flex-col">
      <div className="flex justify-around  z-50 gap-2 max_lg:hidden ">
        <DropDown
          options={featureType.data}
          setStateAction={setStateAction}
          type="featureType"
          initTitle={lang ? "შეთანხმების ტიპი" : "Feature Type"}
        />
        <DropDown
          options={propertyType.data}
          setStateAction={setStateAction}
          type="propertyType"
          initTitle={lang ? "საკუთრების ტიპი" : "Property Type"}
        />
        <DropDown
          options={location.data}
          setStateAction={setStateAction}
          type="location"
          initTitle={lang ? "ლოკაცია" : "Location"}
        />
        <MinMaxInput
          title={"min~$"}
          setStateAction={setStateAction}
          type="min"
        />
        <MinMaxInput title="max~$" setStateAction={setStateAction} type="max" />
        <div
          onClick={filterBtn}
          className="rounded-md shadow-sm w-[120px] flex items-center justify-between"
        >
          <button className="  justify-center w-full h-[48px] rounded-[8px] px-4 py-2 text-sm font-medium leading-5 text-brand-white transition duration-150 ease-in-out bg-brand-green/80 border border-transparent active:bg-gray-100 focus:outline-none focus:border-gray-200 focus:shadow-outline-indigo hover:bg-gray-800">
            Filter
          </button>
        </div>
      </div>
      <div onClick={() => setShowFilter(!showFilter)} className=" hidden">
        <IoFilterSharp />
        Filter
      </div>
      {showFilter && (
        <div className="flex justify-around  p-10 gap-2 flex-col    indexZet   backdrop-blur-xl absolute    z-50 left-1  bg-brand-yellow">
          <DropDown
            options={featureType.data}
            setStateAction={setStateAction}
            type="featureType"
            initTitle={lang ? "შეთანხმების ტიპი" : "Feature Type"}
          />
          <DropDown
            options={propertyType.data}
            setStateAction={setStateAction}
            type="propertyType"
            initTitle={lang ? "საკუთრების ტიპი" : "Property Type"}
          />
          <DropDown
            options={location.data}
            setStateAction={setStateAction}
            type="location"
            initTitle={lang ? "ლოკაცია" : "Location"}
          />
          <MinMaxInput
            title={"min~$"}
            setStateAction={setStateAction}
            type="min"
          />
          <MinMaxInput
            title="max~$"
            setStateAction={setStateAction}
            type="max"
          />
          <div
            onClick={filterBtn}
            className="rounded-md shadow-sm w-[120px] flex items-center justify-between"
          >
            <button className="  justify-center w-full h-[48px] rounded-[8px] px-4 py-2 text-sm font-medium leading-5 text-brand-white transition duration-150 ease-in-out bg-brand-gold border border-transparent active:bg-gray-100 focus:outline-none focus:border-gray-200 focus:shadow-outline-indigo hover:bg-gray-400">
              Filter
            </button>
          </div>
        </div>
      )}
      <SearchBar />
    </div>
  );
}

export default Filter;
