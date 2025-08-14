// Mantiene historial y llama a tu backend /api/ask
import { useRef, useState } from "react";

export default function useChat(apiBase = import.meta.env.VITE_API_URL || "") {
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
          history: next.slice(-8) // manda últimos 8 mensajes como contexto
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
