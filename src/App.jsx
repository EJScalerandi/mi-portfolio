import { motion } from "framer-motion";
import useParallax from "./Hooks/useParallax";
import Header from "./components/Header";
import About from "./components/About";
import Projects from "./components/Projects";
import Footer from "./components/Footer";
import CursorSpark from "./components/CursorSpark";
import galaxi from "./assets/Galaxy2.png";

import ChatWidget from "./components/chatWidget"

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
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
    >
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <Header />
      </motion.div>

      <main className="flex-grow max-w-5xl mx-auto w-full px-4 relative z-10">
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          <About />
        </motion.div>

        <motion.div
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="mt-16"
        >
          <Projects />
        </motion.div>
      </main>

      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="relative z-10"
      >
        <Footer />
      </motion.div>

      {/* 👇 botón flotante + chat */}
      <ChatWidget />

      <CursorSpark />
    </motion.div>
  );
}
