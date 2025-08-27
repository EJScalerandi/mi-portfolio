// src/components/PersonalGallery.jsx
import { useEffect, useRef, useState } from "react";
import { useI18n, pickByLang } from "../i18n";

const SLIDES = [
  {
    src: "/personal/Galaxi.png",
    title: "Vía Láctea",
    title_en: "Milky Way",
    text:
      "Foto que me inspira para experimentar con UI/UX y fondos parallax en mis proyectos.",
    text_en:
      "Photo that inspires me to experiment with UI/UX and parallax backgrounds in my projects.",
  },
  {
    src: "/personal/jupiter.png",
    title: "Júpiter",
    title_en: "Jupiter",
    text:
      "Me recuerda que los sistemas complejos pueden ser bellos si se modelan bien.",
    text_en:
      "Reminds me that complex systems can be beautiful when modeled well.",
  },
  {
    src: "/personal/sun.jpeg",
    title: "Sol",
    title_en: "Sun",
    text:
      "Un toque de energía: foco en rendimiento, accesibilidad y DX para construir sólido.",
    text_en:
      "A spark of energy: focus on performance, accessibility and DX to build solid products.",
  },
  {
    src: "/personal/venus.png",
    title: "Venus",
    title_en: "Venus",
    text:
      "Cada detalle cuenta: pequeñas mejoras visuales pueden cambiar toda la percepción.",
    text_en:
      "Every detail counts: small visual tweaks can change overall perception.",
  },
];

export default function PersonalGallery() {
  const { t, lang } = useI18n();
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const timerRef = useRef(null);

  const clamp = (i) => (SLIDES.length ? (i + SLIDES.length) % SLIDES.length : 0);
  const next = () => setIndex((i) => clamp(i + 1));
  const prev = () => setIndex((i) => clamp(i - 1));

  useEffect(() => {
    if (paused || SLIDES.length <= 1) return;
    timerRef.current = setInterval(next, 5000);
    return () => clearInterval(timerRef.current);
  }, [paused]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowRight") { setPaused(true); next(); }
      if (e.key === "ArrowLeft") { setPaused(true); prev(); }
      if (e.key === " ") { e.preventDefault(); setPaused((p) => !p); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const touchStart = useRef(null);
  const onTouchStart = (e) => {
    setPaused(true);
    touchStart.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e) => {
    const start = touchStart.current;
    if (start == null) return;
    const dx = e.changedTouches[0].clientX - start;
    if (Math.abs(dx) > 40) (dx < 0 ? next() : prev());
    setPaused(false);
    touchStart.current = null;
  };

  return (
    <section className="mx-auto my-12 sm:my-16 lg:my-20 px-3 sm:px-6 max-w-6xl">
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
            {SLIDES.map((s, i) => (
              <div key={s.src + i} className="w-full shrink-0">
                {/* Imagen izquierda + texto derecha */}
                <div className="grid md:grid-cols-2 gap-0">
                  {/* Contenedor de IMAGEN con altura fija responsive */}
                  <div className="relative overflow-hidden bg-black/60
                                  h-[260px] sm:h-[320px] md:h-[420px] lg:h-[520px]">
                    <img
                      src={s.src}
                      alt={pickByLang(s, "title", lang) || `slide-${i}`}
                      className="absolute inset-0 w-full h-full object-cover"
                      draggable={false}
                      loading="lazy"
                    />
                  </div>

                  {/* Texto */}
                  <aside className="p-4 sm:p-6 md:p-8 bg-white/90 text-slate-900 flex flex-col justify-center">
                    <h3 className="text-xl sm:text-2xl font-bold mb-2">
                      {pickByLang(s, "title", lang)}
                    </h3>
                    <p className="text-sm sm:text-base leading-relaxed">
                      {pickByLang(s, "text", lang)}
                    </p>
                  </aside>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Flechas */}
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

        {/* Dots */}
        <div className="absolute bottom-2 left-0 right-0 flex items-center justify-center gap-2">
          {SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => { setPaused(true); setIndex(i); }}
              className={`h-2.5 w-2.5 rounded-full transition ${i === index ? "bg-white" : "bg-white/50"}`}
              aria-label={`Go to ${i + 1}`}
            />
          ))}
        </div>

        {/* Indicador de pausa (opcional) */}
        {paused && (
          <div className="absolute inset-0 pointer-events-none flex items-start justify-end p-2 sm:p-3">
            <span className="text-[10px] sm:text-xs bg-black/50 text-white px-2 py-1 rounded">⏸</span>
          </div>
        )}
      </div>
    </section>
  );
}
