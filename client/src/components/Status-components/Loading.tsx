import React from "react";
import { AiOutlineLoading } from "react-icons/ai";

const LoadingComponent = ({ loading }: { loading: boolean }) => {
  return (
    <>
      {loading && (
        <p className="text-[5rem]  z-50 text-[#ec2b58] absolute  left-1/2   animate-spin ">
          <AiOutlineLoading className="rotate" />
        </p>
      )}
    </>
  );
};

export default LoadingComponent;
