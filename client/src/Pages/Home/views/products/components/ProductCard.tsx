import React from "react";

import { useNavigate } from "react-router-dom";

const PropertyCard = ({ property }: { property: any }) => {
  const naviagtion = useNavigate();
  const goToSinglePage = (id: string) => {
    naviagtion(`/property/${id}`);
  };

  return (
    <div
      onClick={() => goToSinglePage(property.id)}
      className=" bg-brand-white shadow-lg cursor-pointer rounded-lg overflow-hidden h-[400px] w-[320px] mx-4 my-4 transform transition-transform duration-300 hover:scale-105"
    >
      <img
        src={
          property.mainPicture
            ? `data:image/jpeg;base64,${property.mainPicture}`
            : "https://emacplan.co.za/wp-content/themes/homely/images/property-img-default.gif"
        }
        alt="Property"
        className="w-[100%] h-[200px] object-cover outline outline-[1px] outline-gray-100"
      />

      <div className="absolute top-0 right-0 p-2  drop-shadow-md  text-green-400 font-bold">
        ${property.price}
      </div>

      <div className="absolute top-0 left-0 p-2  bg-red-400 rounded-r-[4px] drop-shadow-md text-brand-white">
        {property.propertyType}
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-4 text-gray-400">
        <div className="flex flex-col items-center justify-between">
          <h2 className="text-xl font-semibold mb-2  ">
            {property.propertyName.slice(0, 40)}
            {property.propertyName.split("").length > 40 ? "..." : ""}
          </h2>
          <p className="text-gray-400 text-[14px]  ">
            Squar Area <span>{property.sqArea}</span>
          </p>
        </div>

        <p className="text-gray-600 text-sm mb-2">{property.location}</p>
        <p className="text-gray-600 text-sm mb-2">
          {property.description.slice(0, 80)}...
        </p>

        <p className="text-gray-600 white">
          Date <span>{property.uploadetAt.slice(0, 10)}</span>
        </p>
      </div>
    </div>
  );
};

export default PropertyCard;
