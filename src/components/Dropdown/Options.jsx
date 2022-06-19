import React, { useRef, useState, useContext, useEffect } from "react";
import { motion } from "framer-motion";

import { useDimensions } from '.'
import { Context } from ".";

let lastId = 0;

export const DropdDownOptions = ({ name, content: Content, backgroundHeight }) => {

  const idRef = useRef(++lastId);
  const id = idRef.current;

  const [optionHook, optionDimensions] = useDimensions();
  const [registered, setRegistered] = useState(false);

  const { registerOption, updateOption, deleteOption, targetId, setTargetId } = useContext(Context);

  useEffect(() => {
    if(!registered && optionDimensions) {
      const WrappedContent = () => {
        const contentRef = useRef();

        useEffect(() => {
          const contentDimensions = contentRef.current.getBoundingClientRect();
          updateOption(id, { dimensions: contentDimensions });
        }, []);

        return (
          <div ref={contentRef}>
            <Content />
          </div>
        );
      };

      registerOption({
        id,
        optionDimensions,
        centerX: optionDimensions.x + optionDimensions.width / 2,
        wrappedContent: WrappedContent,
        height: optionDimensions.height
      });

      setRegistered(true);
    }

    if(registered && optionDimensions){
      updateOption(id, {
        optionDimensions,
        centerX: optionDimensions.x + optionDimensions.width / 2
      });
    }

  }, [registerOption, id, registered, optionDimensions, updateOption, deleteOption, backgroundHeight]);

  useEffect(() => deleteOption(id), [deleteOption, id]);

  const handleOpen = () => setTargetId(id);
  const handleClose = () => setTargetId(null);
  const handleTouch = () => (window.isMobile = true);

  const handleClick = (e) => {
    e.preventDefault();
    return targetId === id ? handleClose() : handleOpen();
  }

  return (
    <motion.button
      className="dropdown-option"
      ref={optionHook}
      onMouseDown={handleClick}
      onHoverStart={() => !window.isMobile && handleOpen()}
      onHoverEnd={() => !window.isMobile && handleClose()}
      onTouchStart={handleTouch}
      onFocus={handleOpen}
      onBlur={handleClose}
      >
        {name}
      </motion.button>
  );
}
