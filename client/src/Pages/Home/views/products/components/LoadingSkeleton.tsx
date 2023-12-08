import React from 'react'
import { RecivedPropertyTypes } from '../../../../../Types/propertyTypes'

const PropertyCard = () => {
  return (
    <div className=" bg-gray-200 shadow-md rounded-md overflow-hidden  h-[400px] w-[320px] mx-4 my-4 animate-pulse">
      <div className="w-full h-32 object-cover bg-gray-300 "></div>
      <div className="p-4">
        <div className="h-4 bg-gray-300 mb-2 animate-pulse"></div>
        <div className="h-4 bg-gray-300 mb-2 animate-pulse"></div>
        <div className="h-4 bg-gray-300 w-1/2 animate-pulse"></div>
      </div>
    </div>
  )
}

export default PropertyCard
