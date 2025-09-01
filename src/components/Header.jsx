import { useState, useEffect } from "react";
import { FaWhatsapp, FaLinkedin, FaGithub, FaDownload } from "react-icons/fa";
import { useI18n, pickByLang } from "../i18n";
import { Link, useNavigate } from "react-router-dom";

export default function Header() {
  const { lang, t } = useI18n();
  const navigate = useNavigate();

  const content = {
    name: "Esteban Javier Scalerandi",
    role: "Programador FullStack",
    role_en: "Full-Stack Developer",
    location: "Argentina, Córdoba",
    location_en: "Argentina, Córdoba",
    linkedin: "LinkedIn",
    linkedin_en: "LinkedIn",
    github: "GitHub",
    github_en: "GitHub",
    cv_btn: "Descargar CV",
    cv_btn_en: "Download CV",
  };

  const goPersonal = () => navigate("/personal");

  // Descarga robusta (programática + fallbacks)
  async function downloadWithFallback(paths, filename) {
    for (const raw of paths) {
      const urlAbs = new URL(raw, window.location.origin).toString() + `?t=${Date.now()}`;
      try {
        const res = await fetch(urlAbs, { cache: "no-store" });
        if (!res.ok) continue;
        const blob = await res.blob();
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = filename || (raw.split("/").pop() || "cv.pdf");
        document.body.appendChild(a);
        a.click();
        a.remove();
        URL.revokeObjectURL(url);
        return true;
      } catch (_) {}
    }
    alert(lang === "es"
      ? "No pude descargar el CV. Verificá que exista en /public/cv/."
      : "Couldn't download the CV. Please ensure it exists in /public/cv/."
    );
    return false;
  }

  const handleDownloadCV = async () => {
    if (lang === "en") {
      await downloadWithFallback(
        ["/cv/cv-en.pdf", "/cv/CV-EN.pdf", "/cv/cv_en.pdf"],
        "CV-Esteban-EN.pdf"
      );
    } else {
      await downloadWithFallback(
        ["/cv/cv-es.pdf", "/cv/CV-ES.pdf", "/cv/cv_es.pdf"],
        "CV-Esteban-ES.pdf"
      );
    }
  };

  useEffect(() => {
    // nada especial aquí; mantengo por si querés cerrar menús con Esc en el futuro
    const onKey = (e) => { if (e.key === "Escape") {/* noop */} };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <style>{`
        .starry-bg::before {
          content: '';
          position: absolute;
          inset: 0;
          background: transparent url('https://www.transparenttextures.com/patterns/stardust.png') repeat;
          opacity: 0.15;
          animation: moveStars 80s linear infinite;
          z-index: 0;
        }
        @keyframes moveStars {
          0% { background-position: 0 0; }
          100% { background-position: 1000px 1000px; }
        }
      `}</style>

      <header
        className="
          relative starry-bg bg-transparent text-slate-100
          px-4 sm:px-6 lg:px-8 py-6 sm:py-8
          text-center shadow-xl backdrop-blur-sm border-b border-blue-900 z-10
          overflow-visible
        "
      >
        {/* Nombre → Home */}
        <Link
          to="/"
          className="
            text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight
            drop-shadow-[0_0_10px_rgba(100,149,237,0.5)] relative z-10
            hover:text-blue-300 transition
          "
        >
          {content.name}
        </Link>

        <p className="text-lg sm:text-xl mt-2 font-semibold text-blue-300 relative z-10">
          {pickByLang(content, "role", lang)}
        </p>

        {/* Contacto */}
        <div className="mt-4 relative z-10 flex flex-col items-center gap-2 sm:flex-row sm:flex-wrap sm:justify-center sm:gap-4">
          <span className="text-sm sm:text-base">{pickByLang(content, "location", lang)}</span>
          <span className="hidden sm:inline text-slate-400">|</span>
          <a
            href="https://wa.me/543572400170"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 underline hover:text-green-400 transition text-sm sm:text-base"
          >
            <FaWhatsapp className="shrink-0" />
            <span>3572-400170</span>
          </a>
          <span className="hidden sm:inline text-slate-400">|</span>
          <a
            href="mailto:estebanscalerandi.dev@gmail.com"
            className="underline hover:text-blue-400 transition break-all text-sm sm:text-base"
          >
            estebanscalerandi.dev@gmail.com
          </a>
        </div>

        {/* Redes + Más personal + CV (un solo botón) */}
        <div className="mt-3 relative z-10 flex flex-col items-center gap-2 sm:flex-row sm:flex-wrap sm:justify-center sm:gap-6">
          <a
            href="https://www.linkedin.com/in/esteban-javier-scalerandi-807386277"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 hover:text-white underline transition text-sm sm:text-base"
          >
            <FaLinkedin className="shrink-0" />
            <span>{pickByLang(content, "linkedin", lang)}</span>
          </a>

          <span className="hidden sm:inline text-slate-400">|</span>

          <a
            href="https://github.com/EJScalerandi"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 hover:text-white underline transition text-sm sm:text-base"
          >
            <FaGithub className="shrink-0" />
            <span>{pickByLang(content, "github", lang)}</span>
          </a>

          <span className="hidden sm:inline text-slate-400">|</span>

          <button
            onClick={goPersonal}
            className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 bg-white/90 hover:bg-white text-slate-800 shadow ring-1 ring-slate-300 text-sm sm:text-base"
          >
            {t("morePersonal")}
          </button>

          <span className="hidden sm:inline text-slate-400">|</span>

          <button
            onClick={handleDownloadCV}
            className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 bg-white/90 hover:bg-white text-slate-800 shadow ring-1 ring-slate-300 text-sm sm:text-base"
            title={pickByLang(content, "cv_btn", lang)}
            aria-label={pickByLang(content, "cv_btn", lang)}
          >
            <FaDownload />
            {pickByLang(content, "cv_btn", lang)}
          </button>
        </div>
      </header>
    </>
  );
}
