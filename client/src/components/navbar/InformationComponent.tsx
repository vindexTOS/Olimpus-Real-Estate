import React, { FC } from "react";
import { IconType } from "react-icons";

type InfoPropType = {
  Icon: IconType;
  topText: string;
  bottomText: string;
};

const InformationComponent: FC<InfoPropType> = ({
  Icon,
  topText,
  bottomText,
}) => {
  return (
    <div className="flex items-center justify-center gap-2  max_smm1:text-[12px]">
      <Icon className="text-[1.8rem] text-brand-white  max_smm1:text-[12px] " />
      <div className="flex flex-col items-start justify-center">
        <div className="text-brand-white font-bold text-[1rem]  max_smm1:text-[12px]">
          {topText}
        </div>
        <div className="text-brand-white text-[14px]  max_smm1:text-[12px]">
          {bottomText}
        </div>
      </div>
    </div>
  );
};

export default InformationComponent;
