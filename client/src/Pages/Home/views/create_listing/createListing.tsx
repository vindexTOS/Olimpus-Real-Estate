import React, { useEffect, useState } from "react";
import Info from "./components/Info";
import Form from "./components/Form";
import { UseGeneralContext } from "../../../../contexts/GeneralContext";
import { motion, useAnimation } from "framer-motion";
function createListing() {
  const { createRef } = UseGeneralContext();

  const [isVisible, setIsVisible] = useState(false);
  const controls = useAnimation();
  useEffect(() => {
    const handleScroll = () => {
      if (
        createRef.current &&
        window.scrollY + window.innerHeight >= createRef.current.offsetTop
      ) {
        setIsVisible(true);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [createRef]);

  useEffect(() => {
    if (isVisible) {
      controls.start({ opacity: 1, y: 0, transition: { duration: 1.5 } });
    }
  }, [isVisible, controls]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={controls}
      className="w-[100%]  relative h-[1200px] max_xl:flex-col  max_smm1:w-[100vw] bg-brand-green/80 backdrop-blur-md  flex   items-center justify-around  px-20  pt-40   "
    >
      <Info />
      <Form />
    </motion.div>
  );
}

export default createListing;
