import React, { useEffect, useState } from "react";
import { CiLocationOn, CiPhone, CiClock1 } from "react-icons/ci";
import { FaBars } from "react-icons/fa";
import logo from "../../assets/icons/logo.jpg"
import InformationComponent from "./InformationComponent";
import { UseLanguageContext } from "../../contexts/LanguageContext";
import { UseGeneralContext } from "../../contexts/GeneralContext";
import GeoFlag from "../../assets/icons/flag.png";
import EngFlag from "../../assets/icons/united-kingdom.png";
import { useLocation, useNavigate } from "react-router-dom";
import useOutClick from "../../hooks/useOutClick";
import { FaFacebook, FaLinkedin, FaInstagram } from "react-icons/fa";
function Nav() {
  const { homeRef, listingRef, createRef, agentsRef } = UseGeneralContext();
  const { translation, setLang, lang } = UseLanguageContext();
  const { nav } = translation;
  const { home, listing, createNew, agents } = nav;
  const [isNavFixed, setIsNavFixed] = useState(false);

  const navigation = useNavigate();
  const location = useLocation();
  const [dropDown, setDropDown] = useState(false);
  const handleScroll = () => {
    // Check if the user has scrolled beyond a certain point (e.g., the height of the contactSection)
    const scrollY = window.scrollY || document.documentElement.scrollTop;
    setIsNavFixed(scrollY > 40); // Adjust the value based on your design
  };
  const dropDownRef = React.useRef() as any;
  const handleDropDownCancle = () => {
    setDropDown(false);
  };
  useOutClick(dropDownRef, handleDropDownCancle);

  useEffect(() => {
    // Attach scroll event listener when the component mounts
    window.addEventListener("scroll", handleScroll);

    // Remove scroll event listener when the component unmounts
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  const style = {
    nav: `${location.pathname.includes("admin") && "hidden"}`,
    conntactSection:
      " flex items-center justify-around w-[100vw]  bg-brand-gold h-[90px]",
    logoDiv: "w-[80px] bg-[90px] rounded-[50%] cursor-pointer",
    conntactDiv: "flex justify-around gap-10   max_smm1:hidden",
    navSection: `bg-brand-brown h-[50px] max_lg:hidden flex justify-around items-center fixed w-[100%] z-60 ${
      isNavFixed
        ? "top-0 transition-all duration-200 ease-in-out"
        : "top-[90px] transition-all duration-200 ease-in-out"
    }`,
    linksDiv: `text-brand-white flex gap-2 min-w-[700px] max-w-[100%] `,
    authDiv: `text-brand-white`,
    link: `text-[12px] cursor-pointer hover:bg-gray-200 h-[50px] flex items-center justify-center px-5 hover:text-gray-600`,
  };

  const scrollToSection = (ref: any) => {
    if (location.pathname !== "/") {
      navigation("/");
      setTimeout(() => {
        if (ref && ref.current) {
          ref.current.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      }, 500);
    }
    if (ref && ref.current) {
      ref.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  const responsiveSelect = (ref: any) => {
    scrollToSection(ref);
    setDropDown(false);
  };
   return (
    <nav className={style.nav}>
      <section className={style.conntactSection}>
        <img onClick={()=>navigation("/")} src={logo} className={style.logoDiv} />  
        <div className={style.conntactDiv}>
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
      </section>
      <section className={style.navSection}>
        <div className={style.linksDiv}>
          <h1 onClick={() => scrollToSection(homeRef)} className={style.link}>
            {home}
          </h1>
          <h1
            onClick={() => scrollToSection(listingRef)}
            className={style.link}
          >
            {listing}
          </h1>
          <h1 onClick={() => scrollToSection(createRef)} className={style.link}>
            {createNew}
          </h1>
          <h1 onClick={() => scrollToSection(agentsRef)} className={style.link}>
            {agents}
          </h1>
        </div>
        {/* <div className={style.authDiv}>
          <button>Log in</button>
          <button>Sign up</button>
        </div> */}
        <div className="flex gap-10 items-center justify-center">
          <div>
            <img
              className="w-[30px] h-[30px] cursor-pointer hover:bg-gray-800"
              src={lang ? GeoFlag : EngFlag}
              onClick={() => setLang(!lang)}
            />
          </div>
          <div className="flex gap-2 text-[1.5rem]">
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
      </section>
      <div
        onClick={() => setDropDown(!dropDown)}
        className="lg:hidden top-0 text-[2rem]  text-brand-green absolute z-50 top-[3.4rem] "
      >
        <FaBars />
      </div>
      {dropDown && (
        <div
          ref={dropDownRef}
          className="bg-brand-brown h-[1200px] flex flex-col gap-10  absolute w-[250px] z-50 text-brand-white "
        >
          <div>
            <h1
              onClick={() => responsiveSelect(homeRef)}
              className={style.link}
            >
              {home}
            </h1>
            <h1
              onClick={() => responsiveSelect(listingRef)}
              className={style.link}
            >
              {listing}
            </h1>
            <h1
              onClick={() => responsiveSelect(createRef)}
              className={style.link}
            >
              {createNew}
            </h1>
            <h1
              onClick={() => responsiveSelect(agentsRef)}
              className={style.link}
            >
              {agents}
            </h1>
          </div>
          <div className="flex items-end justify-around  p-2">
            <div className="flex gap-2 text-[1.5rem]">
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
            <img
              className="w-[30px]  h-[30px] cursor-pointer hover:bg-gray-800"
              src={lang ? GeoFlag : EngFlag}
              onClick={() => setLang(!lang)}
            />
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
      )}
    </nav>
  );
}

export default Nav;
