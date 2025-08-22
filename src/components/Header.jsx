import { FaWhatsapp, FaLinkedin, FaGithub } from "react-icons/fa";

export default function Header() {
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

      <header className="relative overflow-hidden starry-bg bg-transparent text-slate-100 p-8 text-center shadow-xl backdrop-blur-sm border-b border-blue-900 z-10">
        <h1 className="text-4xl font-extrabold tracking-tight drop-shadow-[0_0_10px_rgba(100,149,237,0.5)] relative z-10">
          Esteban Javier Scalerandi
        </h1>
        <p className="text-xl mt-2 font-semibold text-blue-300 relative z-10">
          Programador FullStack
        </p>

        <p className="mt-3 space-x-4 text-slate-300 relative z-10 flex justify-center items-center gap-4">
          <span>Argentina, Córdoba</span> |{" "}
          <a
            href="https://wa.me/543572400170"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1 underline hover:text-green-400 transition"
          >
            <FaWhatsapp /> 3572-400170
          </a>{" "}
          |{" "}
          <a
            href="mailto:estebanscalerandi.dev@gmail.com"
            className="underline hover:text-blue-400 transition"
          >
            estebanscalerandi.dev@gmail.com
          </a>
        </p>

        <p className="mt-2 space-x-4 text-slate-200 relative z-10 flex justify-center items-center gap-6">
          <a
            href="https://www.linkedin.com/in/esteban-javier-scalerandi-807386277"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1 hover:text-white underline transition"
          >
            <FaLinkedin /> LinkedIn
          </a>{" "}
          |{" "}
          <a
            href="https://github.com/EJScalerandi"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1 hover:text-white underline transition"
          >
            <FaGithub /> GitHub
          </a>
        </p>
      </header>
    </>
  );
}
