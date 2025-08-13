import { useState, useEffect } from "react";

export default function useParallax(strength = 30) {
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    function handleMouseMove(e) {
      const x = (window.innerWidth / 2 - e.clientX) / strength;
      const y = (window.innerHeight / 2 - e.clientY) / strength;
      setOffset({ x, y });
    }
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [strength]);

  return offset;
}
