import React, { useState } from "react";
import { AgentType } from "../../../../Types/AgentType";
import { UseLanguageContext } from "../../../../contexts/LanguageContext";
import { useDispatch, useSelector } from "react-redux";
import { DeleteAgent } from "../../../../Redux/Agents/agent-thunk";

export default function AgentCard({ data }: { data: AgentType }) {
  const { lang } = UseLanguageContext();
  const { token } = useSelector((state: any) => state.AuthReducer);
  const dispatchThunk = useDispatch<any>();
  const { fullName, picturePath, Email, phoneNumber, Description, id } = data;
  const [readMore, setReadmore] = useState(false);
  const deleteAgnet = () => {
    if (id) dispatchThunk(DeleteAgent({ id, token }));
  };
  const style = {
    mainDiv: `  max_smm1:w-[90%] min-h-[500px] max-h-[100%] w-[400px] gap-5 p-5 bg-brand-white flex flex-col items-center jsutify-around hover:scale-110 duration-700 rounded-[7px]   hover:shadow-md `,
    img: `w-[190px] h-[160px]   rounded-[50%] `,
    contactDiv: `text-[14px] flex flex-col items-start justify-center`,
  };
  return (
    <div className={style.mainDiv}>
      {token && (
        <button
          className="text-brand-white bg-red-500 p-3 rounded-[1rem]"
          onClick={deleteAgnet}
        >
          DELETE
        </button>
      )}
      <img
        className={style.img}
        src={`data:image/jpeg;base64,${picturePath}`}
      />
      <h1 className="text-brand-green text-center text-[15px] font-bold items-center justify-center ">
        {fullName}
      </h1>

      <div className={style.contactDiv}>
        <h1 className="flex gap-2">
          <span className="font-bold text-brand-green">
            {lang ? "ტ.ნ" : "P.N"}
          </span>
          <span className="font-bold text-brand-gold">{phoneNumber}</span>
        </h1>
        <h1 className="flex gap-2">
          <span className="font-bold text-brand-green">
            {lang ? "ელ-ფოსტა" : "Email"}
          </span>
          <span className="font-bold text-brand-gold">{Email}</span>
        </h1>
      </div>
      <p className="text-gray-800 text-[11px] break-words	">
        {Description.slice(0, 90)},{" "}
        {!readMore && Description.split("").length > 90 && (
          <p
            className="text-blue-400 hover:text-blue-300 font-bold cursor-pointer"
            onClick={() => setReadmore(!readMore)}
          >
            {" "}
            Read more ...{" "}
          </p>
        )}
        {readMore && (
          <p className="text-gray-800 text-[11px] break-words	">{Description}</p>
        )}
        {readMore && (
          <p
            className="text-blue-400 hover:text-blue-300 font-bold cursor-pointer"
            onClick={() => setReadmore(!readMore)}
          >
            Read Less ...
          </p>
        )}
      </p>
    </div>
  );
}
