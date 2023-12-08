import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { ThunkDispatch } from '@reduxjs/toolkit'

import { IoIosArrowForward, IoIosArrowBack } from 'react-icons/io'
import { UseLanguageContext } from '../../../../contexts/LanguageContext'
import LoadingSkeletonPage from '../../../SinglePage/LoadingSkeletonPage'
import { GetSinglePropert } from '../../../../Redux/Property/property-thunk'

export default function PropertyMoreInfo() {
  const { lang } = UseLanguageContext()
  const { singleId } = useParams()
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>()

  const { singleProperty, loading, error } = useSelector(
    (state: any) => state.propertyReducer,
  )

  const {
    buildYear,
    description,
    featureType,
    location,
    mainPicture,
    pictures,
    price,
    propertyName,
    propertyType,
    sqArea,
    status,
    uploadetAt,
    fullName,
    email,
    phoneNumber,
  } = singleProperty
  const [editedProperty, setEditedProperty] = useState<any>()
  useEffect(() => {
    setEditedProperty({ ...singleProperty })
  }, [singleProperty])
  const [zoomedImage, setZoomedImage] = useState(null)
  const openZoomedImage = (imagePath: any) => {
    setZoomedImage(imagePath)
  }

  const closeZoomedImage = () => {
    setZoomedImage(null)
  }

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    console.log(singleId)
    if (singleId) {
      dispatch(GetSinglePropert(singleId))
    }
  }, [singleId])
  const [mainPhoto, setMainPhoto] = useState('')
  const mainPhotoHandler = (img: string) => {
    setMainPhoto(img)
  }
  const [countIndex, setCountIndex] = useState(0)
  const setImageByArrow = (type: string) => {
    let newIndex = 0

    if (type === 'add') {
      newIndex = (countIndex + 1) % pictures.length
    } else if (type === 'sub') {
      newIndex = (countIndex - 1 + pictures.length) % pictures.length
    }

    setCountIndex(newIndex)
    setMainPhoto(pictures[newIndex].picturePath)
  }

  useEffect(() => {
    setMainPhoto(mainPicture)
  }, [mainPicture])
  if (loading) {
    return <LoadingSkeletonPage />
  }
  const handleInputChange = (e: any) => {
    const { name, value } = e.target
    setEditedProperty((prev: any) => ({ ...prev, [name]: value }))
  }
  return (
    <section className="flex   gap-8 overflow-y-scroll">
      <div className=" mx-auto p-8 mt-10 bg-brand-green/80 backdrop-blur-xl rounded-md shadow-lg items-center justify-center flex   w-[100%]  flex-col">
        {/* Main Content Grid */}
        <div className=" flex    items-center justify-center gap-8">
          {/* Image Section */}
          <div className="flex  flex-col  items-center justify-center select-none bg-brand-white shadow-md w-[90%] p-5 rounded-md ">
            <img
              src={`data:image/jpeg;base64,${mainPhoto}`}
              alt={propertyName}
              className="w-[500px] h-[500px] max_smm1:h-[200px] max_smm1:w-[100%] rounded-lg mb-4 cursor-pointer"
              onClick={() =>
                openZoomedImage(`data:image/jpeg;base64,${mainPhoto}`)
              }
            />
            <div className="flex gap-2 text-[3rem] text-brand-white mb-5 ">
              <IoIosArrowBack
                className="cursor-pointer hover:text-gray-300"
                onClick={() => setImageByArrow('sub')}
              />
              <IoIosArrowForward
                className="cursor-pointer hover:text-gray-300"
                onClick={() => setImageByArrow('add')}
              />
            </div>
            {/* Thumbnail Images */}
            <div className="flex gap-2">
              {pictures?.map((pic: any, index: any) => (
                <img
                  key={pic.id}
                  src={`data:image/jpeg;base64,${pic.picturePath}`}
                  alt={propertyName}
                  className="w-[120px] h-[120px] mb-2 cursor-pointer rounded-lg"
                  onClick={() => mainPhotoHandler(pic.picturePath)}
                />
              ))}
            </div>
          </div>

          {/* Property Details Section */}
          <div className="flex flex-col justify-between   w-[90%] max_smm1:h-[100%] max_smm1:w-[100%] max_smm1:p-4  max_smm1:text-[14px] max_smm1:w-[100%] bg-brand-white shadow-md rounded-[5px] p-5">
            {/* User owenr info */}
            <div>
              <div className="flex gap-2">
                <div className="mb-3 flex flex-col">
                  <label className="mr-2 font-bold">სახელი</label>
                  <input
                    type="text"
                    name="fullName"
                    value={editedProperty?.fullName as string}
                    onChange={handleInputChange}
                    className="border p-1"
                  />
                </div>
                <div className="mb-3 flex flex-col">
                  <label className="mr-2 font-bold">ემაილი</label>
                  <input
                    type="text"
                    name="email"
                    value={editedProperty?.email as string}
                    onChange={handleInputChange}
                    className="border p-1"
                  />
                </div>
                <div className="mb-3 flex flex-col">
                  <label className="mr-2 font-bold">ნომერი</label>
                  <input
                    type="text"
                    name="phoneNumber"
                    value={editedProperty?.phoneNumber as string}
                    onChange={handleInputChange}
                    className="border p-1"
                  />
                </div>
              </div>
            </div>
            {/* Title */}
            <h1 className="text-4xl font-bold mb-4 text-gray-600">
              {propertyName}
            </h1>

            {/* Description Section */}
            <div className="mb-6">
              <p className="text-gray-600 font-bold mb-2">
                {lang ? 'აღწერა' : 'Description'}:
              </p>
              <p className="text-gray-700">{description}</p>
            </div>

            {/* Information Section */}
            <div className="grid grid-col   gap-4 ">
              <div className="text-gray-600">
                <div className="flex justify-between items-center border-b border-gray-600 pb-2">
                  <p className="font-bold">
                    {lang ? 'მდებარეობა' : 'Location'}:
                  </p>
                  <p>{location}</p>
                </div>
                <div className="flex justify-between items-center border-b border-gray-600 pb-2">
                  <p className="font-bold">
                    {lang ? 'აშენების წელი' : 'Build Year'}:
                  </p>
                  <p>{buildYear}</p>
                </div>
                <div className="flex justify-between items-center border-b border-gray-600 pb-2">
                  <p className="font-bold">
                    {lang ? 'უძრავი ქონების ტიპი' : 'Property Type'}:
                  </p>
                  <p>{propertyType}</p>
                </div>
              </div>

              <div className="text-gray-600 gap-2">
                <div className="flex justify-between items-center border-b border-gray-600 pb-2">
                  <p className="font-bold">
                    {lang ? 'კვადრატული ფართი' : 'Square Area'}:
                  </p>
                  <p>{sqArea} sq. meters</p>
                </div>
                <div className="flex justify-between items-center border-b border-gray-600 pb-2">
                  <p className="font-bold">{lang ? 'ფასი' : 'Price'}:</p>
                  <p>${price}</p>
                </div>
                <div className="flex justify-between items-center border-b border-gray-600 pb-2">
                  <p className="font-bold">{lang ? 'სტატუსი' : 'Status'}:</p>
                  <p>{status}</p>
                </div>
              </div>
            </div>

            {/* Additional Information */}
            <div className="flex  gap-3 justify-center">
              <p className="text-gray-600  font-bold mb-2">
                {lang ? 'ატვირთულია' : 'Uploaded At'}:
              </p>
              <p>{uploadetAt?.slice(0, 10)}</p>
              <p className="text-gray-600 font-bold mb-2">
                {lang ? 'ფიჩერის ტიპი' : 'Feature Type'}:
              </p>
              <p>{featureType}</p>
            </div>
          </div>
        </div>

        {/* Zoomed Image Section */}
        {zoomedImage && (
          <div className="fixed inset-0 mb-60   flex items-center justify-center  z-70 bg-black bg-opacity-75">
            <img
              src={zoomedImage}
              alt="Zoomed In"
              className="w-full md:w-[90%] h-[90vh] cursor-pointer rounded-lg"
              onClick={closeZoomedImage}
            />
          </div>
        )}
      </div>
    </section>
  )
}
