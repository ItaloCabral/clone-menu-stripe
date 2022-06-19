import React, { useContext, useMemo, useState, useEffect } from 'react';
import { motion } from 'framer-motion';

import { Context } from '.';
import { DropDownSection } from '.';

const refDuration = 0.2;

export const DropdownRoot = () => {
  const { options, cachedId, getOption, targetId } = useContext(Context);

  const cachedOption = useMemo(() => {
    return getOption(cachedId);
  }, [cachedId, getOption]);

  let [width, height, x] = [0, 0, 0];

  if(cachedOption) {
    const { dimensions, centerX } = cachedOption;
    width = dimensions.width;
    height = dimensions.height;
    x = centerX - width / 2;
  }

  const [hovering, setHovering] = useState(false);

  const isOpen = targetId !== null || hovering;

  const [hasInteracted, setHasInteracted] = useState(false);
  const isFirstInteraction = isOpen && !hasInteracted;

  if(isFirstInteraction) {
    setTimeout(() => {
      if(!hasInteracted) setHasInteracted(true);
    }, 15);
  }

  useEffect(() => {
    if(isOpen) return;

    let timeout = setTimeout(() => {
      setHasInteracted(false);
    }, refDuration * 1000 * 0.9);

    return () => clearTimeout(timeout);

  }, [isOpen]);

  return (
    <div style={{ perspective: 2000 }}>
      <motion.div
        className="dropdown-root"
        animate={{
          opacity: isOpen ? 1 : 0,
          rotateX: isOpen ? 0 : -15
        }}
        transition={{
          opacity: { duration: refDuration, delay: 0.05 },
          rotateX: { duration: refDuration, delay: 0.05 }
        }}
      >
        <motion.div
          className="dropdown-container"
          animate={{
            x,
            width,
            height,
            pointerEvents: isOpen ? "unset" : "none"
          }}
          transition={{
            ease: "easeOut",
            x: isFirstInteraction ? { duration: 0 } : refDuration,
            width: { duration: isFirstInteraction ? 0 : refDuration * 0.9 },
            height: { duration: isFirstInteraction ? 0 : refDuration * 0.9 },
            pointerEvents: { delay: 0.05 }
          }}
          onHoverStart={() => setHovering(true)}
          onHoverEnd={() => setHovering(false)}
        >
          <DropdownBackground />

          <motion.div
            animate={{
              x: -x
            }}
            transition={{
              x: isFirstInteraction ? { duration: 0 } : undefined
            }}
          >
          {options.map(option => (
            <DropDownSection key={option.id} option={option} />
          ))}
        </motion.div>
      </motion.div>
      <DropDownArrow isFirstInteraction={isFirstInteraction} />
    </motion.div>
    </div>
  );
}

export function DropdownBackground() {

  const { cachedId, getOption } = useContext(Context);

  const cachedOption = useMemo(() => {
    return getOption(cachedId);
  }, [cachedId, getOption]);

  const backgroundHeight = cachedOption?.backgroundHeight || 0;

  return (
    <motion.div
      className="dropdown-background"
      animate={{
        height: backgroundHeight
      }}
      transition={{
        ease: "easeOut",
        duration: refDuration
      }}
    />
  );
}

function DropDownArrow({ isFirstInteraction }){
  const { cachedId, getOption } = useContext(Context);

  const cachedOption = useMemo(() => {
    return getOption(cachedId);
  }, [cachedId, getOption]);

  const x = cachedOption?.centerX || 0;

  return (
    <motion.div
      className="dropdown-arrow"
      initial={{
        opacity: 0
      }}
      animate={{
        x,
        pointerEvents: 'none',
        opacity: x > 0 ? 1 : 0
      }}
      transition={{
        ease: "easeOut",
        x: { duration: isFirstInteraction ? 0 : refDuration }
      }}
    />
  );
}
