import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Hook interno (sin importar nada externo)
function useChatInline(apiBase = import.meta.env.VITE_API_URL || "") {
  const [msgs, setMsgs] = useState([]); // [{role:"user"|"assistant", content:string}]
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const abortRef = useRef(null);

  async function send(text) {
    const prompt = String(text || "").trim();
    if (!prompt || loading) return;

    const next = [...msgs, { role: "user", content: prompt }];
    setMsgs(next);
    setError("");
    setLoading(true);

    abortRef.current?.abort?.();
    abortRef.current = new AbortController();

    try {
      if (!apiBase) throw new Error("Falta VITE_API_URL en el frontend.");
      const res = await fetch(`${apiBase}/api/ask`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        signal: abortRef.current.signal,
        body: JSON.stringify({
          prompt,
          history: next.slice(-8) // últimos 8 mensajes
        })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Error de red");
      setMsgs(prev => [...prev, { role: "assistant", content: data.reply || "(sin respuesta)" }]);
    } catch (e) {
      if (e.name !== "AbortError") setError(e.message || "Error");
    } finally {
      setLoading(false);
    }
  }

  function reset() { setMsgs([]); setError(""); }
  function abort() { abortRef.current?.abort?.(); setLoading(false); }

  return { msgs, loading, error, send, reset, abort };
}

export default function ChatWidg() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const { msgs, loading, error, send, reset } = useChatInline();
  const listRef = useRef(null);

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" });
  }, [msgs, open]);

  const onSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    send(input);
    setInput("");
  };

  const onKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      onSubmit(e);
    }
  };

  return (
    <>
      {/* Botón flotante */}
      <button
        onClick={() => setOpen(v => !v)}
        className="fixed bottom-5 right-5 z-50 rounded-full bg-indigo-600 text-white w-14 h-14 shadow-lg hover:bg-indigo-700 focus:outline-none"
        aria-label="Abrir chat"
        title="Chat"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path d="M21 15a4 4 0 0 1-4 4H7l-4 4V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4z"/>
        </svg>
      </button>

      {/* Ventana de chat */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.98 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-24 right-5 z-50 w-[min(92vw,380px)] rounded-xl border border-white/10 bg-[#0b1020]/95 backdrop-blur text-white shadow-2xl"
          >
            {/* Header */}
            <div className="px-4 py-3 border-b border-white/10 flex items-center gap-2">
              <span className="inline-block w-2.5 h-2.5 bg-emerald-400 rounded-full" />
              <strong>Chat con Esteban</strong>
              <span className="ml-auto text-xs opacity-70">{loading ? "escribiendo…" : "listo"}</span>
              <button
                onClick={reset}
                className="ml-2 px-2 py-1 text-xs rounded bg-white/10 hover:bg-white/20"
                title="Nueva conversación"
              >
                Nuevo
              </button>
            </div>

            {/* Lista de mensajes */}
            <div ref={listRef} className="px-3 py-3 h-80 overflow-y-auto space-y-2">
              {msgs.length === 0 && (
                <div className="text-center text-sm opacity-80 p-4 rounded-lg bg-white/5">
                  👋 Hola, soy Esteban. Preguntame sobre mi stack, proyectos o pedime código.
                  <div className="opacity-60 text-xs mt-1">Las respuestas salen de mi API en Vercel.</div>
                </div>
              )}

              {msgs.map((m, i) => (
                <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[80%] whitespace-pre-wrap rounded-xl px-3 py-2 text-sm leading-snug
                      ${m.role === "user" ? "bg-indigo-600" : "bg-white/10 border border-white/10"}`}
                  >
                    {m.content}
                  </div>
                </div>
              ))}

              {error && (
                <div className="text-red-300 bg-red-900/40 border border-red-500/40 px-3 py-2 rounded text-xs">
                  ⚠️ {error}
                </div>
              )}
            </div>

            {/* Input */}
            <form onSubmit={onSubmit} className="p-3 border-t border-white/10">
              <div className="flex gap-2">
                <textarea
                  rows={2}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={onKeyDown}
                  placeholder="Escribí tu mensaje… (Enter envía, Shift+Enter salto de línea)"
                  className="flex-1 resize-none rounded-lg bg-white/5 border border-white/10 focus:outline-none focus:ring-2 focus:ring-indigo-500 px-3 py-2 text-sm"
                />
                <button
                  disabled={!input.trim() || loading}
                  className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50"
                >
                  {loading ? "Enviando…" : "Enviar"}
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
