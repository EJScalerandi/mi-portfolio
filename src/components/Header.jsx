import { FaWhatsapp, FaLinkedin, FaGithub } from "react-icons/fa";
import { useI18n, pickByLang } from "../i18n";

export default function Header() {
  const { lang } = useI18n();

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
  };

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
          relative overflow-hidden starry-bg bg-transparent text-slate-100
          px-4 sm:px-6 lg:px-8 py-6 sm:py-8
          text-center shadow-xl backdrop-blur-sm border-b border-blue-900 z-10
        "
      >
        {/* Nombre */}
        <h1
          className="
            text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight
            drop-shadow-[0_0_10px_rgba(100,149,237,0.5)] relative z-10
          "
        >
          {content.name}
        </h1>

        {/* Rol */}
        <p className="text-lg sm:text-xl mt-2 font-semibold text-blue-300 relative z-10">
          {pickByLang(content, "role", lang)}
        </p>

        {/* Contacto: en mobile apila, en sm+ usa fila con separadores */}
        <div
          className="
            mt-4 relative z-10
            flex flex-col items-center gap-2
            sm:flex-row sm:flex-wrap sm:justify-center sm:gap-4
            text-slate-300
          "
        >
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

        {/* Redes: en mobile apila; en sm+ fila con separadores */}
        <div
          className="
            mt-3 relative z-10
            flex flex-col items-center gap-2
            sm:flex-row sm:flex-wrap sm:justify-center sm:gap-6
            text-slate-200
          "
        >
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
        </div>
      </header>
    </>
  );
}
