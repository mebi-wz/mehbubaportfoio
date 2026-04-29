/**
 * Compatibility shim replacing react-reveal.
 * Uses framer-motion for animations — no peer dependency issues with React 18.
 */
import React from "react";
import { motion } from "framer-motion";

const getInitial = ({ bottom, top, left, right, distance = "40px" }) => {
  if (bottom)  return { opacity: 0, y: distance };
  if (top)     return { opacity: 0, y: `-${distance}` };
  if (left)    return { opacity: 0, x: `-${distance}` };
  if (right)   return { opacity: 0, x: distance };
  return { opacity: 0 };
};

const animate = { opacity: 1, x: 0, y: 0 };

export const Fade = ({ bottom, top, left, right, duration = 800, delay = 0, distance, children, ...rest }) => (
  <motion.div
    initial={getInitial({ bottom, top, left, right, distance })}
    whileInView={animate}
    viewport={{ once: true }}
    transition={{ duration: duration / 1000, delay: delay / 1000, ease: "easeOut" }}
    {...rest}
  >
    {children}
  </motion.div>
);

export const Slide = ({ left, right, bottom, top, duration = 800, delay = 0, children, ...rest }) => (
  <motion.div
    initial={getInitial({ left, right, bottom, top, distance: "60px" })}
    whileInView={animate}
    viewport={{ once: true }}
    transition={{ duration: duration / 1000, delay: delay / 1000, ease: "easeOut" }}
    {...rest}
  >
    {children}
  </motion.div>
);

// Default export = Fade (for files that do `import Fade from "react-reveal"`)
export default Fade;
