import { useEffect, useRef, useState } from "react";
import { useI18n } from "../i18n";

/**
 * Cómo cargar tus imágenes:
 * - Ponelas en /public/personal/imagen1.jpg, imagen2.jpg, etc.
 * - Lista sus rutas en el array IMAGES.
 */
const IMAGES = [
  "/personal/Galaxi.png",
  "/personal/jupiter.png",
  "/personal/sun.jpeg",
  "/personal/venus.png",
];


export default function PersonalGallery() {
  const { t } = useI18n();
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const timerRef = useRef(null);

  const clamp = (i) => (IMAGES.length ? (i + IMAGES.length) % IMAGES.length : 0);
  const next = () => setIndex((i) => clamp(i + 1));
  const prev = () => setIndex((i) => clamp(i - 1));

  // Autoplay cada 5s (pausa si hovered/touched)
  useEffect(() => {
    if (paused || IMAGES.length <= 1) return;
    timerRef.current = setInterval(next, 5000);
    return () => clearInterval(timerRef.current);
  }, [paused]);

  // Pausa con teclado y flechas
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowRight") { setPaused(true); next(); }
      if (e.key === "ArrowLeft") { setPaused(true); prev(); }
      if (e.key === " ") { e.preventDefault(); setPaused((p) => !p); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Swipe en mobile
  const touchStart = useRef(null);
  const onTouchStart = (e) => {
    setPaused(true);
    touchStart.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e) => {
    const start = touchStart.current;
    if (start == null) return;
    const dx = e.changedTouches[0].clientX - start;
    if (Math.abs(dx) > 40) {
      if (dx < 0) next();
      else prev();
    }
    setPaused(false);
    touchStart.current = null;
  };

  return (
    <section className="mx-auto my-12 sm:my-16 lg:my-20 px-3 sm:px-6 max-w-5xl">
      <div
        className="relative rounded-2xl overflow-hidden bg-black/30 ring-1 ring-white/10 shadow-xl"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        {/* Carril */}
        <div className="overflow-hidden">
          <div
            className="flex transition-transform duration-700 ease-in-out"
            style={{ transform: `translateX(-${index * 100}%)` }}
          >
            {IMAGES.map((src, i) => (
              <div key={src + i} className="w-full shrink-0 aspect-video bg-black/60 flex items-center justify-center">
                {/* imagen */}
                <img
                  src={src}
                  alt={`slide-${i}`}
                  className="w-full h-full object-contain md:object-cover"
                  draggable={false}
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Flechas laterales */}
        <button
          onClick={() => { setPaused(true); prev(); }}
          aria-label={t("previous")}
          title={t("previous")}
          className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-white/90 hover:bg-white text-slate-800 shadow px-3 py-2 ring-1 ring-slate-300"
        >
          ‹
        </button>
        <button
          onClick={() => { setPaused(true); next(); }}
          aria-label={t("next")}
          title={t("next")}
          className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-white/90 hover:bg-white text-slate-800 shadow px-3 py-2 ring-1 ring-slate-300"
        >
          ›
        </button>

        {/* Indicadores + estado de pausa */}
        <div className="absolute bottom-2 left-0 right-0 flex items-center justify-center gap-2">
          {IMAGES.map((_, i) => (
            <button
              key={i}
              onClick={() => { setPaused(true); setIndex(i); }}
              className={`h-2.5 w-2.5 rounded-full transition ${i === index ? "bg-white" : "bg-white/50"}`}
              aria-label={`Go to ${i + 1}`}
            />
          ))}
        </div>

        {paused && (
          <div className="absolute inset-0 pointer-events-none flex items-start justify-end p-2 sm:p-3">
            <span className="text-[10px] sm:text-xs bg-black/50 text-white px-2 py-1 rounded">
              {/** Info visual de pausa, opcional */}
              ⏸
            </span>
          </div>
        )}
      </div>
    </section>
  );
}
