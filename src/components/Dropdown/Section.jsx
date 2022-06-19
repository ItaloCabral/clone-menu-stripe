import React, { useContext } from "react";
import { motion } from "framer-motion";

import { Context } from ".";

export const DropDownSection = ({ option }) => {

  const { cachedId } = useContext(Context);
  const { id, centerX, dimensions } = option;

  const contentWidth = dimensions?.width || 0;
  const x = centerX - contentWidth / 2;

  const isOpen = id === cachedId;

  return (
    <motion.div
      className="dropdown-section"
      initial={{ x }}
      animate={{ x,
        opacity: isOpen ? 1 : 0,
        pointerEvents: isOpen ? "unset" : "none"
      }}
      transition={{ opacity: {duration: 0.2}, ease: "easeInOut" }}
    >
      <option.wrappedContent />
    </motion.div>
  );
}
