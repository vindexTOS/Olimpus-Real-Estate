import React from "react";

export default function LoadingSkeletonPage() {
  return (
    <div className="mx-auto p-8 mt-10 bg-brand-green/40 backdrop-blur-xl rounded-md shadow-lg items-center justify-center flex   w-[100%]  flex-col">
      <div className="  gap-8">
        <div className="flex flex-col items-center md:items-start">
          <div className="animate-pulse w-[100%] h-[800px] rounded-lg mb-4 bg-gray-300"></div>

          <div className="flex gap-2 ">
            <div className="animate-pulse w-[120px] h-[120px] mb-2 bg-gray-300 rounded-lg"></div>
            <div className="animate-pulse w-[120px] h-[120px] mb-2 bg-gray-300 rounded-lg"></div>
            <div className="animate-pulse w-[120px] h-[120px] mb-2 bg-gray-300 rounded-lg"></div>
            <div className="animate-pulse w-[120px] h-[120px] mb-2 bg-gray-300 rounded-lg"></div>
            <div className="animate-pulse w-[120px] h-[120px] mb-2 bg-gray-300 rounded-lg"></div>
            <div className="animate-pulse w-[120px] h-[120px] mb-2 bg-gray-300 rounded-lg"></div>
            <div className="animate-pulse w-[120px] h-[120px] mb-2 bg-gray-300 rounded-lg"></div>
            <div className="animate-pulse w-[120px] h-[120px] mb-2 bg-gray-300 rounded-lg"></div>
            <div className="animate-pulse w-[120px] h-[120px] mb-2 bg-gray-300 rounded-lg"></div>
            <div className="animate-pulse w-[120px] h-[120px] mb-2 bg-gray-300 rounded-lg"></div>
            <div className="animate-pulse w-[120px] h-[120px] mb-2 bg-gray-300 rounded-lg"></div>
          </div>
        </div>

        <div className="flex flex-col justify-between bg-brand-white shadow-md rounded-[5px] p-2">
          <div className="animate-pulse text-4xl font-bold mb-4 bg-gray-300 w-3/4 h-6"></div>

          <div className="mb-6">
            <div className="animate-pulse text-gray-600 font-bold mb-2 bg-gray-300 w-full h-4"></div>
            <div className="animate-pulse text-gray-700 bg-gray-300 w-full h-4"></div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="text-gray-600">
              <div className="animate-pulse flex justify-between items-center border-b border-gray-600 pb-2">
                <div className="font-bold w-1/3 h-4 bg-gray-300"></div>
                <div className="w-2/3 h-4 bg-gray-300"></div>
              </div>
              <div className="animate-pulse flex justify-between items-center border-b border-gray-600 pb-2">
                <div className="font-bold w-1/3 h-4 bg-gray-300"></div>
                <div className="w-2/3 h-4 bg-gray-300"></div>
              </div>
              <div className="animate-pulse flex justify-between items-center border-b border-gray-600 pb-2">
                <div className="font-bold w-1/3 h-4 bg-gray-300"></div>
                <div className="w-2/3 h-4 bg-gray-300"></div>
              </div>
            </div>

            <div className="text-gray-600 gap-2">
              <div className="animate-pulse flex justify-between items-center border-b border-gray-600 pb-2">
                <div className="font-bold w-1/3 h-4 bg-gray-300"></div>
                <div className="w-2/3 h-4 bg-gray-300"></div>
              </div>
              <div className="animate-pulse flex justify-between items-center border-b border-gray-600 pb-2">
                <div className="font-bold w-1/3 h-4 bg-gray-300"></div>
                <div className="w-2/3 h-4 bg-gray-300"></div>
              </div>
              <div className="animate-pulse flex justify-between items-center border-b border-gray-600 pb-2">
                <div className="font-bold w-1/3 h-4 bg-gray-300"></div>
                <div className="w-2/3 h-4 bg-gray-300"></div>
              </div>
            </div>
          </div>

          <div>
            <div className="animate-pulse text-gray-600 font-bold mb-2 bg-gray-300 w-1/2 h-4"></div>
            <div className="animate-pulse bg-gray-300 w-full h-4"></div>
            <div className="animate-pulse text-gray-600 font-bold mb-2 bg-gray-300 w-1/2 h-4"></div>
            <div className="animate-pulse bg-gray-300 w-full h-4"></div>
          </div>
        </div>
      </div>

      {false && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-75">
          <div className="animate-pulse w-full md:w-[90%] h-[90vh] bg-gray-300 rounded-lg"></div>
        </div>
      )}
    </div>
  );
}
