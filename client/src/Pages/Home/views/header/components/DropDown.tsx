import { useState } from "react";
import useOutClick from "../../../../../hooks/useOutClick";
import React, { FC } from "react";
import { useDispatch } from "react-redux";
import { ThunkDispatch } from "@reduxjs/toolkit";

type DropDownProps = {
  options: any[];
  setStateAction: (type: string, state: string) => void;
  type: string;
  initTitle: string;
};

const CustomDropdown: FC<DropDownProps> = ({
  options,
  setStateAction,
  type,
  initTitle,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState();

  const handleOptionClick = (option: any) => {
    setStateAction(type, option);
    let curVal: any = options.find((vl: any) => vl.key === option);
    setSelectedOption(curVal?.title);
    setIsOpen(false);
  };
  const handleDropDownCancle = () => {
    setIsOpen(false);
  };
  const dropDownRef = React.useRef() as any;

  useOutClick(dropDownRef, handleDropDownCancle);

  return (
    <div ref={dropDownRef} className="relative    text-left outline-none  ">
      <div>
        <div className="  shadow-sm w-[170px] outline-none      flex items-center justify-between">
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="  justify-center w-full text-[12px] text-gray-600  flex items-center justify-center h-[48px]  py-2 text-sm font-medium leading-5 text-white transition duration-150 ease-in-out bg-brand-white   rounded-[8px] active:bg-gray-100 focus:outline-none focus:border-gray-200   hover:bg-gray-400"
            id="options-menu"
            aria-haspopup="true"
            aria-expanded="true"
          >
            {selectedOption ? selectedOption : initTitle}
            <svg
              className="-mr-1 ml-2 h-5 w-5"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M6.293 7.293a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414L10 9.414l-2.293 2.293a1 1 0 01-1.414-1.414l3-3z"
              />
            </svg>
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="origin-top-right duration-300	 absolute right-0 mt-2 w-56 rounded-md shadow-lg z-50 max-h-[200px] overflow-y-scroll">
          <div className="rounded-md bg-brand-white shadow-xs">
            <div
              className="py-1"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="options-menu"
            >
              {options.map((option: any, index: number) => (
                <button
                  key={index}
                  onClick={() => handleOptionClick(option.key)}
                  className={` w-[100%] block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-200 focus:outline-none focus:bg-gray-200 transition duration-150 ease-in-out ${
                    selectedOption === option.key ? "bg-gray-200" : ""
                  }`}
                  role="menuitem"
                >
                  {option.title}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomDropdown;
