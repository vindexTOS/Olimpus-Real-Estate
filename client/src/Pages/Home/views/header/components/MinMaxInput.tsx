import React, { FC } from "react";

type MinMaxProps = {
  title: string;

  setStateAction: (type: string, state: number) => void;
  type: string;
};

const MinMaxInput: FC<MinMaxProps> = ({ title, setStateAction, type }) => {
  const HandleNum = (num: string) => {
    setStateAction(type, Number(num));
  };

  return (
    <div className="rounded-md shadow-sm w-[120px]   flex items-center justify-between">
      <input
        onChange={(e) => HandleNum(e.target.value)}
        placeholder={title}
        className="inline-flex justify-center w-full  h-[48px] rounded-[8px] px-4 py-2 text-sm font-medium leading-5 text-white transition duration-150 ease-in-out bg-brand-white    active:bg-gray-100 focus:outline-none focus:border-gray-200 focus:shadow-outline-indigo hover:bg-gray-400"
      />
    </div>
  );
};

export default MinMaxInput;
