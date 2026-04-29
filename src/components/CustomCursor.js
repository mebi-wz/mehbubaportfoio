import React, { useEffect, useRef, useState } from "react";

const CustomCursor = () => {
  const dotRef = useRef(null);
  const outlineRef = useRef(null);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const onMouseMove = (e) => {
      const { clientX, clientY } = e;
      
      // Immediate position for the dot
      if (dotRef.current) {
        dotRef.current.style.left = `${clientX}px`;
        dotRef.current.style.top = `${clientY}px`;
      }

      // Slightly delayed/lagged position for the outline (simple animation)
      if (outlineRef.current) {
        outlineRef.current.animate({
          left: `${clientX}px`,
          top: `${clientY}px`
        }, { duration: 400, fill: "forwards" });
      }
    };

    const onMouseOver = (e) => {
      if (e.target.closest("a, button, .skill-chip, .portfolio-item, .mehbubaimag, .profile-pic")) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseover", onMouseOver);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseover", onMouseOver);
    };
  }, []);

  return (
    <>
      <div 
        ref={dotRef} 
        className={`cursor-dot ${isHovering ? "cursor-hover-dot" : ""}`} 
      />
      <div 
        ref={outlineRef} 
        className={`cursor-outline ${isHovering ? "cursor-hover" : ""}`} 
      />
    </>
  );
};

export default CustomCursor;
