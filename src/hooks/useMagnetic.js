import { useRef, useEffect } from "react";

const useMagnetic = () => {
  const magneticRef = useRef(null);

  useEffect(() => {
    const magnetic = magneticRef.current;
    if (!magnetic) return;

    const onMouseMove = (e) => {
      const { clientX, clientY } = e;
      const { left, top, width, height } = magnetic.getBoundingClientRect();
      
      const centerX = left + width / 2;
      const centerY = top + height / 2;
      
      const distanceX = clientX - centerX;
      const distanceY = clientY - centerY;
      
      const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
      
      // Magnetic strength/reach
      const reach = 100;
      
      if (distance < reach) {
        // Calculate the power based on distance
        const power = 0.4; // 40% of the movement
        const x = distanceX * power;
        const y = distanceY * power;
        
        magnetic.style.transform = `translate(${x}px, ${y}px)`;
      } else {
        magnetic.style.transform = `translate(0px, 0px)`;
      }
    };

    const onMouseLeave = () => {
      magnetic.style.transform = `translate(0px, 0px)`;
    };

    window.addEventListener("mousemove", onMouseMove);
    magnetic.addEventListener("mouseleave", onMouseLeave);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      magnetic.removeEventListener("mouseleave", onMouseLeave);
    };
  }, []);

  return magneticRef;
};

export default useMagnetic;
