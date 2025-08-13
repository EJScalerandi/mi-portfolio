import { useEffect, useState } from "react";

export default function CursorSpark() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [trail, setTrail] = useState([]);

  useEffect(() => {
    function handleMouseMove(e) {
      const { clientX, clientY } = e;
      setPos({ x: clientX, y: clientY });

      setTrail((prev) => [
        ...prev.slice(-15), // mantiene últimos 15 puntos
        { x: clientX, y: clientY, id: Date.now() },
      ]);
    }

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <>
      <style>{`
        body, * {
          cursor: none !important;
        }
        .comet-cursor {
          position: fixed;
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: #00ffff;
          box-shadow: 0 0 12px 4px #00ffff;
          pointer-events: none;
          z-index: 9999;
        }
        .trail-dot {
          position: fixed;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: rgba(0, 255, 255, 0.4);
          box-shadow: 0 0 8px 2px rgba(0, 255, 255, 0.3);
          pointer-events: none;
          z-index: 9998;
          animation: fadeOut 0.5s forwards;
        }
        @keyframes fadeOut {
          to {
            opacity: 0;
            transform: scale(0.5);
          }
        }
      `}</style>

      {/* Cometa principal */}
      <div
        className="comet-cursor"
        style={{
          transform: `translate(${pos.x - 6}px, ${pos.y - 6}px)`,
        }}
      />

      {/* Estela */}
      {trail.map((dot) => (
        <div
          key={dot.id}
          className="trail-dot"
          style={{
            left: dot.x - 4,
            top: dot.y - 4,
          }}
        />
      ))}
    </>
  );
}
