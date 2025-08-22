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

function Home() {
  return (
    <main className="flex-grow max-w-5xl mx-auto w-full px-4 relative z-10">
      <About />
      <div className="mt-16">
        <Projects />
      </div>
      <Footer />
    </main>
  );
}

export default function App() {
  const { x, y } = useParallax(40);

  return (
    <motion.div
      className="min-h-screen flex flex-col overflow-hidden relative"
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
      </Routes>

      <ChatWidg />
      <CursorSpark />
    </motion.div>
  );
}
