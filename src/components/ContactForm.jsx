// src/components/ContactForm.jsx
import { useState, useEffect } from "react";
import { useI18n } from "../i18n";

export default function ContactForm() {
  const { lang } = useI18n();
  const [form, setForm] = useState({ name: "", email: "", message: "", hp: "" });
  const [state, setState] = useState({ loading: false, ok: null, error: "" });
  const [cooldown, setCooldown] = useState(0); // segundos restantes

  // 🔹 Mensajes traducidos
  const L = {
    title: { es: "Contacto", en: "Contact" },
    subtitle: {
      es: "¿Tienes un proyecto? Hablemos.",
      en: "Got a project? Let’s talk.",
    },
    name: { es: "Nombre", en: "Name" },
    email: { es: "Email", en: "Email" },
    msg: { es: "Mensaje", en: "Message" },
    send: { es: "Enviar", en: "Send" },
    sending: { es: "Enviando…", en: "Sending…" },
    ok: {
      es: "¡Gracias! Te responderé a la brevedad.",
      en: "Thanks! I’ll get back to you shortly.",
    },
    fail: {
      es: "No se pudo enviar. Intenta más tarde o escríbeme por LinkedIn.",
      en: "Couldn’t send. Try later or ping me on LinkedIn.",
    },
    required: { es: "Completa todos los campos", en: "Please fill all fields" },
    invalidEmail: { es: "Email inválido", en: "Invalid email" },
    wait: {
      es: "Espera",
      en: "Wait",
    },
  };

  const text = (k) => (lang === "en" ? L[k].en : L[k].es);

  // 🔹 Cooldown timer
  useEffect(() => {
    if (cooldown <= 0) return;
    const id = setInterval(() => setCooldown((c) => c - 1), 1000);
    return () => clearInterval(id);
  }, [cooldown]);

  const onChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const validate = () => {
    if (!form.name || !form.email || !form.message) {
      setState({ loading: false, ok: null, error: text("required") });
      return false;
    }
    const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email);
    if (!isEmail) {
      setState({ loading: false, ok: null, error: text("invalidEmail") });
      return false;
    }
    return true;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!validate() || cooldown > 0) return;

    setState({ loading: true, ok: null, error: "" });
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (data.ok) {
        setState({ loading: false, ok: true, error: "" });
        setForm({ name: "", email: "", message: "", hp: "" });
        setCooldown(180); // 3 minutos = 180s
      } else {
        setState({ loading: false, ok: false, error: text("fail") });
      }
    } catch {
      setState({ loading: false, ok: false, error: text("fail") });
    }
  };

  return (
    <section className="mx-auto my-12 sm:my-16 lg:my-20 px-4 max-w-3xl">
      <div className="rounded-2xl bg-white/90 backdrop-blur shadow-xl ring-1 ring-white/20 p-6 sm:p-8 text-slate-800">
        <h2 className="text-2xl sm:text-3xl font-bold mb-2">{text("title")}</h2>
        <p className="text-slate-600 mb-6">{text("subtitle")}</p>

        <form onSubmit={onSubmit} className="space-y-4">
          {/* Honeypot anti-spam */}
          <input
            type="text"
            name="hp"
            value={form.hp}
            onChange={onChange}
            className="hidden"
            tabIndex={-1}
            autoComplete="off"
          />

          {/* Nombre y Email */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">{text("name")}</label>
              <input
                name="name"
                value={form.name}
                onChange={onChange}
                className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
                placeholder={lang === "en" ? "Your name" : "Tu nombre"}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">{text("email")}</label>
              <input
                name="email"
                type="email"
                value={form.email}
                onChange={onChange}
                className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="you@email.com"
              />
            </div>
          </div>

          {/* Mensaje */}
          <div>
            <label className="block text-sm font-medium mb-1">{text("msg")}</label>
            <textarea
              name="message"
              value={form.message}
              onChange={onChange}
              rows={5}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500 resize-y"
              placeholder={lang === "en" ? "Tell me about your idea…" : "Contame tu idea…"}
            />
          </div>

          {/* Mensajes de estado */}
          {state.error && <p className="text-sm text-red-600">{state.error}</p>}
          {state.ok && <p className="text-sm text-green-700">{text("ok")}</p>}

          {/* Botón con cooldown */}
          <button
            type="submit"
            disabled={state.loading || cooldown > 0}
            className="inline-flex items-center justify-center rounded-lg px-4 py-2 bg-slate-900 text-white hover:bg-slate-700 disabled:opacity-60"
          >
            {state.loading
              ? text("sending")
              : cooldown > 0
              ? `${text("wait")} ${cooldown}s`
              : text("send")}
          </button>
        </form>
      </div>
    </section>
  );
}
