import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { UseLanguageContext } from "../../../../contexts/LanguageContext";
import { UseGeneralContext } from "../../../../contexts/GeneralContext";
import { getError } from "../../../../Redux/Property/property-slice";
import {
  OwnerInformationBluePrint,
  PropertyInformationBluePrint,
} from "../../../../Types/dto-class";
import { CreatePropertyThunk } from "../../../../Redux/Property/property-thunk";
import FormInput from "../../../../components/Inputs/FormInput";
import FormDropDown from "../../../../components/Inputs/FormDropDown";
import LoadingComponent from "../../../../components/Status-components/Loading";
import ImageUploader from "../../../../components/Inputs/ImageUpload";
import Textarea from "../../../../components/Inputs/Textarea";

export type SelectorType = {
  target: {
    name: string;
    value: string;
  };
};

function Form() {
  const { adminData } = UseGeneralContext();
  const { translation, refrenceData } = UseLanguageContext();
  const { form } = translation;
  const { userInfo, titles, propertyInfo } = form;
  const style = { 
    mainDiv: `bg-[#26a59a]/95 relative w-[60%]  max_smm1:w-[160%]  max_xl:w-[90%] max_lg:h-[2000px] max_lg:mt-40 max_lg:w-[100%]   max_xl:h-[100%]  max_lg:items-center max_lg:justify-center   rounded-r-[9px] flex-col flex p-5 gap-5`,
    userInfo: ` flex flex-col items-center gap-4`,
    userInfoInputWrapper: "flex max_lg:flex-col gap-1 justify-around w-[100%]",
    propertyInfo: `flex flex-col   gap-5 `,
    propertyDropDowns: `flex gap-2 max_lg:flex-col  `,
  };
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();

  const [images, setImages] = useState<any>([]);
  const { loading } = useSelector((state: any) => state.propertyReducer);
  const [propertyForm, setpropertyForm] = useState({
    email: adminData.userName,
    number: adminData.userName,
    firstName: adminData.userName,
    lastName: adminData.userName,
    location: "Tbilisi",
    feature: "SALE",
    propertyType: "HOUSE",
    price: 0,
    sqArea: 0,
    buildYear: 0,
    title: "",
    description: "",
    status: "ACTIVE",
  });
  const handleChange = (
    e: SelectorType | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setpropertyForm((prevData) => ({ ...prevData, [name]: value }));
  };
  const { createRef } = UseGeneralContext();

  const HandleSubmit = async () => {
    const emptyFields = Object.entries(propertyForm).filter(
      ([key, value]) => !value
    );
    if (emptyFields.length > 0) {
      dispatch(
        getError(
          `'Error: The following fields are required:',
        ${emptyFields.map(([key]) => key).join(", ")},`
        )
      );
      setTimeout(() => {
        dispatch(getError(""));
      }, 4000);
    } else {
      const {
        email,
        number,
        firstName,
        lastName,
        location,
        feature,
        price,
        sqArea,
        buildYear,
        propertyType,
        title,
        description,
        status,
      } = propertyForm;
      let OwnerInformation = new OwnerInformationBluePrint(
        `${firstName} ${lastName}`,
        email,
        number
      );
      let propertyInformation = new PropertyInformationBluePrint(
        title,
        propertyType,
        feature,
        Number(price),
        Number(buildYear),
        location,
        Number(sqArea),
        description,
        status
      );
      await dispatch(
        CreatePropertyThunk({
          OwnerInformation,
          propertyInformation,
          pictures: images,
        })
      );
      window.location.reload();
      if (createRef && createRef.current) {
        createRef.current.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    }
  };
  return (
    <div className={style.mainDiv}>
      <div className="flex items-center justify-center">
        <h1 className=" xl:hidden  text-[2rem] text-brand-white font-geo text-center">
          დაამატეთ საკუთარი განცხადება
        </h1>
      </div>

      <h1 className="w-[100%] text-center text-[1.6rem] font-bold text-brand-white font-geo">
        {titles.formHeader2}
      </h1>
      <FormInput
        handleChange={handleChange}
        name="title"
        title={propertyInfo.title}
        placeholder="test"
        inputType="text"
      />
      <Textarea
        name="description"
        title={propertyInfo.desc}
        handleChange={handleChange}
      />
      <div className={style.propertyInfo}>
        <div className={style.propertyDropDowns}>
          <FormDropDown
            name="location"
            handleChange={handleChange}
            data={refrenceData.location.data}
            title={propertyInfo.location}
          />
          <FormDropDown
            name="feature"
            handleChange={handleChange}
            data={refrenceData.featureType.data}
            title={propertyInfo.feature}
          />
          <FormDropDown
            name="propertyType"
            handleChange={handleChange}
            data={refrenceData.propertyType.data}
            title={propertyInfo.propertyType}
          />
        </div>
        <div className={style.propertyDropDowns}>
          <FormInput
            handleChange={handleChange}
            name="price"
            title={propertyInfo.price}
            placeholder="test"
            inputType="number"
          />
          <FormInput
            handleChange={handleChange}
            name="sqArea"
            title={propertyInfo.sqArea}
            placeholder="test"
            inputType="number"
          />

          <FormInput
            handleChange={handleChange}
            name="buildYear"
            title={propertyInfo.buildYear}
            placeholder="test"
            inputType="number"
          />
        </div>
      </div>
      <h1 className="w-[100%] text-center text-[1.6rem] font-bold text-brand-white font-geo">
        {titles.formHeader3}
        <LoadingComponent loading={loading} />
      </h1>
      <ImageUploader images={images} setImages={setImages} />

      <button
        onClick={HandleSubmit}
        className="bg-brand-yellow hover:bg-brand-yellow/95 text-brand-white font-bold py-2 px-4 rounded"
      >
        {propertyInfo.submit}
      </button>
    </div>
  );
}

export default Form;
