import React, { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { useDispatch, useSelector } from "react-redux";
import { CreateAgnet, GetAgents } from "../../../../Redux/Agents/agent-thunk";
import LoadingComponent from "../../../../components/Status-components/Loading";
import Succsess from "../../../../components/Status-components/Success";
import Error from "../../../../components/Status-components/Error";
import AgentCard from "./AgentCard";
import { AgentType } from "../../../../Types/AgentType";

const CreateRealtorForm = () => {
  const [formValues, setFormValues] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    description: "",
  });
  const { token } = useSelector((state: any) => state.AuthReducer);

  const [profilePicture, setProfilePicture] = useState<any>();
  const dispatchThunk = useDispatch<any>();
  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const onDrop = (acceptedFiles: any) => {
    const file = acceptedFiles[0];
    setProfilePicture(file);
    let htmlImg = URL.createObjectURL(file);
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/jpeg": [".jpg", ".jpeg"],
      "image/png": [".png"],
    },
    onDrop,
  });

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const { fullName, email, phoneNumber, description } = formValues;

    let bodyObj = {
      fullName,
      email,
      phoneNumber,
      description,
    };
    await dispatchThunk(CreateAgnet({ bodyObj, token, profilePicture }));

    setFormValues({
      fullName: "",
      email: "",
      phoneNumber: "",
      description: "",
    });
    setProfilePicture(null);
  };
  const { data, loading, succsess, error } = useSelector(
    (state: any) => state.agentReducer
  );

  useEffect(() => {
    dispatchThunk(GetAgents());
  }, []);
  return (
    <section>
      <form
        onSubmit={handleSubmit}
        className="max-w-md mx-auto my-8 p-4 bg-brand-white shadow-md rounded-md"
      >
        <LoadingComponent loading={loading} />
        <Succsess success={succsess} />
        <Error error={error} />
        <div className="mb-4">
          <label
            htmlFor="fullName"
            className="block text-sm font-medium text-gray-700"
          >
            სახელი
          </label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            onChange={handleInputChange}
            value={formValues.fullName}
            className="mt-1 p-2 w-full border rounded-md"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            onChange={handleInputChange}
            value={formValues.email}
            className="mt-1 p-2 w-full border rounded-md"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="phoneNumber"
            className="block text-sm font-medium text-gray-700"
          >
            ტელეფონის ნომერი
          </label>
          <input
            type="tel"
            id="phoneNumber"
            name="phoneNumber"
            onChange={handleInputChange}
            value={formValues.phoneNumber}
            className="mt-1 p-2 w-full border rounded-md"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700"
          >
            აღწერა
          </label>
          <textarea
            id="description"
            name="description"
            onChange={handleInputChange}
            value={formValues.description}
            className="mt-1 p-2 w-full border rounded-md"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="profilePicture"
            className="block text-sm font-medium text-gray-700"
          >
            ფოტო
          </label>
          <div
            {...getRootProps()}
            className="mt-1 p-2 border-dashed border-2 rounded-md cursor-pointer"
          >
            <input {...getInputProps()} />
            <p className="text-gray-500">
              Drag 'n' drop a profile picture here, or click to select one
            </p>
          </div>
          {profilePicture && (
            <p className="text-green-500 mt-2">
              Selected Profile Picture: {profilePicture.name}
            </p>
          )}
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-brand-white p-2 rounded-md hover:bg-blue-700"
        >
          აგენტის დამატება
        </button>
      </form>
      <div className="flex gap-2 flex-wrap w-[100%] mb-20 px-20">
        {data?.data?.map((val: AgentType) => {
          return <AgentCard key={val.id} data={val} />;
        })}
      </div>
    </section>
  );
};

export default CreateRealtorForm;
