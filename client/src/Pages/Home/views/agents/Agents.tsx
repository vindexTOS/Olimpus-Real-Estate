import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetAgents } from "../../../../Redux/Agents/agent-thunk";
import { AgentType } from "../../../../Types/AgentType";
import AgentCard from "../../../Admin/views/AgentAdd/AgentCard";
import { UseLanguageContext } from "../../../../contexts/LanguageContext";
import { motion, useAnimation } from "framer-motion";
import { UseGeneralContext } from "../../../../contexts/GeneralContext";
export default function Agents() {
  const { lang } = UseLanguageContext();
  const { agentsRef } = UseGeneralContext();
  const { data } = useSelector((state: any) => state.agentReducer);
  const dispatchThunk = useDispatch<any>();

  useEffect(() => {
    dispatchThunk(GetAgents());
  }, []);

  const [isVisible, setIsVisible] = useState(false);
  const controls = useAnimation();
  useEffect(() => {
    const handleScroll = () => {
      if (
        agentsRef.current &&
        window.scrollY + window.innerHeight >= agentsRef.current.offsetTop
      ) {
        setIsVisible(true);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [agentsRef]);

  useEffect(() => {
    if (isVisible) {
      controls.start({ opacity: 1, y: 0, transition: { duration: 5 } });
    }
  }, [isVisible, controls]);

  return (
    <motion.div
      ref={agentsRef}
      initial={{ opacity: 0, y: 20 }}
      animate={controls}
      className="bg-brand-green/60 flex flex-col justify-center items-center gap-10 backdrop-blur-md  max_smm1:mt-[20rem] w-[100%] min-h-[800px] max-h-[100%]"
    >
      <h1 className="text-brand-gold text-[4rem] font-geo max_smm1:text-[2rem] text-center">
        {lang ? "გაიცანით ჩვენი აგენტები" : "Meet Our Agents"}
      </h1>
      <div className="flex gap-2 justify-center items-center flex-wrap w-[100%] max_smm1:p-0 mb-20 px-20">
        {data?.data?.map((val: AgentType) => {
          return <AgentCard key={val.id} data={val} />;
        })}
      </div>
    </motion.div>
  );
}
