import React from "react";
import Map from "../map/Map";

import { CiLocationOn, CiPhone, CiClock1 } from "react-icons/ci";

import { FaFacebook, FaLinkedin, FaInstagram } from "react-icons/fa";
import InformationComponent from "../navbar/InformationComponent";
import { useLocation } from "react-router-dom";
export default function Footer() {
  const location = useLocation();
  return (
    <footer
      className={`w-[100%] min-h-[440px] max-h-[100%] bg-brand-green flex max_smm1:flex-col items-center justify-between px-10  ${
        location.pathname.includes("admin") && "hidden"
      }  `}
    >
      <div className="flex">
        <div className="flex  items-end justify-around  p-2">
          <div className="flex   flex-col gap-10 text-[1.5rem]">
            <a target="_blank"  href="https://www.facebook.com/OlimpusProperties">
              <FaFacebook className="text-[#fccc63]" />
            </a>
            <a target="_blank" href="https://www.facebook.com/OlimpusProperties">
              <FaLinkedin className="text-[#fccc63]" />
            </a>
            <a target="_blank" href="https://www.instagram.com/olimpus_properties/?igshid=OGQ5ZDc2ODk2ZA%3D%3D&fbclid=IwAR277DY2CA2Cpq-WnX3ctYnyQe6D9nbfWiw1oemU-GW2wvlEcETlslBCTpk">
              <FaInstagram className="text-[#fccc63]" />
            </a>
          </div>
        </div>
        <div className="flex flex-col gap-5 justify-start  items-start px-8 w-[100%]">
          <InformationComponent
            Icon={CiPhone}
            topText="+995 574197746"
            bottomText="-info@Olimpusrealestate.ge"
          />
          <InformationComponent
            Icon={CiLocationOn}
            topText="Mitskevichi str #29a"
            bottomText="Tbilisi,Georgia"
          />
          <InformationComponent
            Icon={CiClock1}
            topText="11 am to 7 pm"
            bottomText="Monday to Friday"
          />
        </div>
      </div>
      <div>
        <a href="https://www.facebook.com/profile.php?id=61553239725559"  className=" text-[#ff1d1d]  text-xl"><span className="text-[#ffffff]">Copyright ©</span> RedLine Technologies </a>
      </div>
      <div>
        <Map lat={41.72372838392247} lng={44.76448475252844} />
      </div>
    </footer>
  );
}
