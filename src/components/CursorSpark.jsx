import { useEffect, useRef, useState } from "react";

export default function CursorSpark() {
  const [sparks, setSparks] = useState([]); // {id,x,y,vx,vy,life}
  const nextId = useRef(1);
  // Prefijo único por instancia para evitar colisiones entre múltiples montajes
  const instancePrefix = useRef(`${Math.random().toString(36).slice(2)}-`);

  // Generar chispas con el puntero
  useEffect(() => {
    const handleMove = (e) => {
      const id = nextId.current++; // ID incremental
      const s = {
        id,
        x: e.clientX,
        y: e.clientY,
        vx: (Math.random() - 0.5) * 1.5,
        vy: -Math.random() * 2 - 0.5,
        life: 0
      };
      setSparks((arr) => {
        const arr2 = arr.length >= 40 ? arr.slice(1) : arr.slice();
        arr2.push(s);
        return arr2;
      });
    };

    window.addEventListener("pointermove", handleMove, { passive: true });
    return () => window.removeEventListener("pointermove", handleMove);
  }, []);

  // Animación / fade-out
  useEffect(() => {
    let raf;
    const step = () => {
      setSparks((prev) =>
        prev
          .map((p) => ({
            ...p,
            x: p.x + p.vx,
            y: p.y + p.vy,
            life: p.life + 16
          }))
          .filter((p) => p.life < 700)
      );
      raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, []);

  const prefix = instancePrefix.current;

  return (
    <div className="pointer-events-none fixed inset-0 z-50">
      {sparks.map((s) => (
        <span
          key={`${prefix}${s.id}`} // ✅ clave única incluso si hay varias instancias
          className="absolute block rounded-full"
          style={{
            left: s.x,
            top: s.y,
            width: 6,
            height: 6,
            transform: "translate(-50%,-50%)",
            background: "rgba(255,255,255,0.9)",
            opacity: 1 - s.life / 700
          }}
        />
      ))}
    </div>
  );
}
