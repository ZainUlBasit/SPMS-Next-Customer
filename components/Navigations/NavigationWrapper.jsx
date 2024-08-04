import { motion } from "framer-motion";
import React from "react";

const NavigationWrapper = ({ children }) => {
  const container = {
    hidden: { opacity: 1, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2,
      },
    },
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="visible"
      className="flex justify-center items-center gap-x-3 flex-wrap gap-y-3 pt-[110px] mb-6"
    >
      {children}
    </motion.div>
  );
};

export default NavigationWrapper;
