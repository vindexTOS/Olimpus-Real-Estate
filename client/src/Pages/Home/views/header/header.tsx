import React from "react";
import Filter from "./components/Filter";
import { UseGeneralContext } from "../../../../contexts/GeneralContext";
function header() {
  const { homeRef } = UseGeneralContext();
  return (
    <div
      ref={homeRef}
      className="bg-brand-green/80 backdrop-blur-md w-[100%] h-[600px] flex flex-col gap-20 items-center justify-between mt-10 "
    >
      <h1 className="text-[4rem] h-[400px] w-[55%] max_smm1:text-[2rem] font-bold text-brand-gold flex items-center justify-center text-center">
      We serve to your interests
      </h1>
      <Filter />
    </div>
  );
}

export default header;
