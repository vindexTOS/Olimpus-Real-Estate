import React, { useState } from "react";
import { UseLanguageContext } from "../../../../contexts/LanguageContext";
import { useDispatch, useSelector } from "react-redux";
import { ThunkDispatch } from "@reduxjs/toolkit";
import {
  Deleteproperty,
  Updateproperty,
} from "../../../../Redux/Property/property-thunk";
import { useNavigate } from "react-router-dom";

const EditableProperty = ({ property }: { property: any }) => {
  const [editedProperty, setEditedProperty] = useState({ ...property });
  const { token } = useSelector((state: any) => state.AuthReducer);
  const { refrenceData } = UseLanguageContext();
  const dispatchThunk = useDispatch<ThunkDispatch<any, any, any>>();
  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setEditedProperty((prev: any) => ({ ...prev, [name]: value }));
  };
  const naviagtion = useNavigate();

  const goToSinglePage = () => {
    naviagtion(`/admin-dashboard/${editedProperty.id}`);
  };
  const handleSave = () => {
    const {
      status,
      propertyName,
      propertyType,
      featureType,
      location,
      description,
      price,
      buildYear,
      sqArea,
    } = editedProperty;

    let newObj = {
      sqArea: Number(sqArea),
      buildYear: Number(buildYear),
      price: Number(price),
      status,
      propertyName,
      propertyType,
      featureType,
      location,
      description,
    };

    dispatchThunk(
      Updateproperty({ data: newObj, id: editedProperty.id, token })
    );
  };

  const deleteProp = () => {
    dispatchThunk(Deleteproperty({ token, id: editedProperty.id }));
  };
  const style = {
    inputDiv: `mb-4 flex flex-col`,
    label: `mb-1 text-sm font-bold text-gray-600`,
    input: `px-3  py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300`,
    select: `px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300`,
  };
  return (
    <div
      onClick={() => console.log(editedProperty)}
      className="bg-brand-white w-[100%] h-[300px] p-5  rounded-[9px] shadow-md"
    >
      <div>
        <div className="flex gap-2">
          {/* <img
            src={
              editedProperty.mainPicture
                ? `data:image/jpeg;base64,${editedProperty.mainPicture}`
                : 'https://emacplan.co.za/wp-content/themes/homely/images/property-img-default.gif'
            }
            alt="Property"
            className="w-[90px] h-[90px] object-cover outline outline-[1px] outline-gray-100"
          /> */}
          <div className={style.inputDiv}>
            <label className={style.label}>Property Name:</label>
            <input
              type="text"
              name="propertyName"
              value={editedProperty.propertyName as string}
              onChange={handleInputChange}
              className={style.input}
            />
          </div>
          <div className={style.inputDiv}>
            <label className={style.label}>Property Type:</label>
            <select
              name="propertyType"
              value={editedProperty.propertyType as string}
              onChange={handleInputChange}
              className={style.select}
            >
              {refrenceData.propertyType.data.map((val: any) => (
                <option value={val.key} key={val.key} className="text-gray-800">
                  {val.key}
                </option>
              ))}
            </select>
          </div>
          <div className={style.inputDiv}>
            <label className={style.label}>Feature Type:</label>
            <select
              name="featureType"
              value={editedProperty.featureType as string}
              onChange={handleInputChange}
              className={style.select}
            >
              {refrenceData.featureType.data.map((val: any) => {
                return (
                  <option value={val.key} key={val.key}>
                    {val.key}
                  </option>
                );
              })}
            </select>
          </div>

          <div className={style.inputDiv}>
            <label className={style.label}>Feature Type:</label>
            <select
              name="location"
              value={editedProperty.location as string}
              onChange={handleInputChange}
              className={style.select}
            >
              {refrenceData.location.data.map((val: any, i: number) => {
                return (
                  <option value={val.key} key={val.key + String(i)}>
                    {val.key}
                  </option>
                );
              })}
            </select>
          </div>
          <div className={style.inputDiv}>
            <label className={style.label}>Square Area:</label>
            <input
              type="number"
              name="sqArea"
              value={Number(editedProperty.sqArea)}
              onChange={handleInputChange}
              className={style.input + " w-[8rem]"}
            />
          </div>
          <div className={style.inputDiv}>
            <label className={style.label}>Price:</label>
            <input
              type="number"
              name="price"
              value={Number(editedProperty.price)}
              onChange={handleInputChange}
              className={style.input + " w-[8rem]"}
            />
          </div>
          <div className={style.inputDiv}>
            <label className={style.label}>build year:</label>
            <input
              type="number"
              name="buildYear"
              value={Number(editedProperty.buildYear)}
              onChange={handleInputChange}
              className={style.input + " w-[8rem]"}
            />
          </div>
        </div>
      </div>
      <textarea
        name="description"
        value={editedProperty.description as string}
        onChange={handleInputChange}
        className={style.input + " w-[100%] h-[90px]"}
      ></textarea>

      <div className="mb-3  flex items-center justify-between ">
        <div>
          {" "}
          <label className="mr-2 font-bold">Status:</label>
          <select
            name="status"
            value={editedProperty.status}
            onChange={handleInputChange}
          >
            {refrenceData.statusType.data.map((val: any) => {
              return (
                <option key={val.key} value={val.key}>
                  {val.key}
                </option>
              );
            })}
            {/* Add other status options as needed */}
          </select>
          <span
            style={{
              color: editedProperty.status === "PENDING" ? "red" : "green",
            }}
          >
            {editedProperty.status} <span>აქტიურია თუ ელოდება</span>
          </span>
        </div>
        <div className="flex   gap-1">
          <button
            onClick={handleSave}
            className="bg-green-500   hover:bg-green-300 text-brand-white px-2 py-1  rounded-[5px]"
          >
            შენახვა
          </button>
          <button
            onClick={goToSinglePage}
            className="bg-blue-500 text-brand-white px-2 py-1 rounded-[5px] hover:bg-blue-300  "
          >
            მეტი ინფომრაციის ნახვა
          </button>
          <button
            onClick={deleteProp}
            className="bg-red-500 text-brand-white px-2 py-1 rounded-[5px] hover:bg-red-300  "
          >
            წაშლა
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditableProperty;
