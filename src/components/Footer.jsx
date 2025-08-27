import { useI18n } from "../i18n";

export default function Footer() {
  const { lang } = useI18n();

  const content = {
    copyright: "© 2025 Esteban Javier Scalerandi | FullStack Developer",
    copyright_en: "© 2025 Esteban Javier Scalerandi | Full-Stack Developer",
    linkedin: "LinkedIn",
    linkedin_en: "LinkedIn",
    github: "GitHub",
    github_en: "GitHub",
  };

  return (
    <>
      <style>{`
        .footer-stars::before {
          content: '';
          position: absolute;
          inset: 0;
          background: transparent url('https://www.transparenttextures.com/patterns/stardust.png') repeat;
          opacity: 0.1;
          animation: moveStarsFooter 90s linear infinite;
          z-index: 1;
        }
        @keyframes moveStarsFooter {
          0% { background-position: 0 0; }
          100% { background-position: 800px 800px; }
        }
      `}</style>

      <footer
        className="
          relative overflow-hidden footer-stars text-slate-100
          px-4 sm:px-6 lg:px-8 py-6
          text-center mt-16 sm:mt-20 border-t border-blue-900 z-10
        "
        style={{
          backgroundImage: `url('/Footer.png')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Overlay para mejorar contraste del texto sobre la imagen */}
        <div className="absolute inset-0 bg-black/30 -z-0" aria-hidden="true" />

        <p className="relative z-10 text-sm sm:text-base">
          {lang === "en" ? content.copyright_en : content.copyright}
        </p>

        <p className="mt-2 relative z-10 flex flex-col items-center gap-2 sm:flex-row sm:justify-center sm:gap-4">
          <a
            href="https://www.linkedin.com/in/esteban-javier-scalerandi-807386277"
            target="_blank"
            rel="noreferrer"
            className="underline hover:text-blue-400 transition text-sm sm:text-base"
          >
            {lang === "en" ? content.linkedin_en : content.linkedin}
          </a>

          <span className="hidden sm:inline text-slate-300">|</span>

          <a
            href="https://github.com/EJScalerandi"
            target="_blank"
            rel="noreferrer"
            className="underline hover:text-blue-400 transition text-sm sm:text-base"
          >
            {lang === "en" ? content.github_en : content.github}
          </a>
        </p>
      </footer>
    </>
  );
}
