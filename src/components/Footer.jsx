export default function Footer() {
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
        className="relative overflow-hidden footer-stars text-slate-100 p-6 text-center mt-20 border-t border-blue-900 z-10"
        style={{
          backgroundImage: `url('/Footer.png')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <p className="relative z-10">© 2025 Esteban Javier Scalerandi | FullStack Developer</p>
        <p className="mt-2 relative z-10">
          <a
            href="https://www.linkedin.com/in/esteban-javier-scalerandi-807386277"
            target="_blank"
            rel="noreferrer"
            className="underline hover:text-blue-400 transition"
          >
            LinkedIn
          </a>{" "}
          |{" "}
          <a
            href="https://github.com/EJScalerandi"
            target="_blank"
            rel="noreferrer"
            className="underline hover:text-blue-400 transition"
          >
            GitHub
          </a>
        </p>
      </footer>
    </>
  );
}
