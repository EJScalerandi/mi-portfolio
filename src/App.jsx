import { Routes, Route } from "react-router-dom";
import { motion } from "framer-motion";
import useParallax from "./Hooks/useParallax";
import Header from "./components/Header";
import About from "./components/About";
import Projects from "./components/Projects";
import Footer from "./components/Footer";
import CursorSpark from "./components/CursorSpark";
import galaxi from "./assets/Galaxy2.png";
import ChatWidg from "./components/ChatWidgets";
import Presupuestador from "./components/Presupuestador";
import { I18nProvider } from "./i18n";
import TranslateButton from "./components/TranslateButton";
import PersonalGallery from "./components/PersonalGallery";

function Home() {
  return (
    <main className="flex-grow w-full mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
      <About />
      <div className="mt-10 sm:mt-12 lg:mt-16">
        <Projects />
      </div>
      <Footer />
    </main>
  );
}

export default function App() {
  const isMobile = typeof window !== "undefined" && window.matchMedia("(max-width: 640px)").matches;
  const isTablet = typeof window !== "undefined" && window.matchMedia("(max-width: 1024px)").matches;
  const strength = isMobile ? 8 : isTablet ? 20 : 40;
  const { x, y } = useParallax(strength);

  return (
    <I18nProvider>
      <motion.div
        className="min-h-screen flex flex-col overflow-x-hidden relative"
        style={{
          backgroundImage: `url(${galaxi}), linear-gradient(to bottom, #011627cc, #000000cc)`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundPositionX: `${50 + x}%`,
          backgroundPositionY: `${50 + y}%`,
        }}
      >
        <Header />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/presupuestador" element={<Presupuestador />} />
          <Route path="/personal" element={<PersonalGallery />} />
        </Routes>

        <TranslateButton />
        <ChatWidg />
        <CursorSpark />
      </motion.div>
    </I18nProvider>
  );
}
