import { createContext, useContext, useMemo, useState } from "react";

const I18nContext = createContext();

const STRINGS = {
  es: {
    projects: "Proyectos",
    close: "Cerrar",
    start: "Inicio",
    role: "Rol",
    team: "Equipo",
    purpose: "Propósito",
    responsibilities: "Responsabilidades",
    highlights: "Puntos clave",
    technologies: "Tecnologías",
    actions: "Acciones",
    repository: "Repositorio",
    visit: "Visitar sitio",
  },
  en: {
    projects: "Projects",
    close: "Close",
    start: "Start",
    role: "Role",
    team: "Team",
    purpose: "Purpose",
    responsibilities: "Responsibilities",
    highlights: "Highlights",
    technologies: "Technologies",
    actions: "Actions",
    repository: "Repository",
    visit: "Visit site",
  },
};

export function I18nProvider({ children }) {
  const [lang, setLang] = useState("es");
  const value = useMemo(() => {
    const t = (key) => STRINGS[lang]?.[key] ?? key;
    const switchLang = () => setLang((p) => (p === "es" ? "en" : "es"));
    return { lang, t, setLang, switchLang };
  }, [lang]);
  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  return useContext(I18nContext);
}

/** Obtiene p[field_en] si lang==='en' y existe, si no p[field] */
export function pickByLang(obj, field, lang) {
  if (!obj) return "";
  if (lang === "en" && obj[`${field}_en`]) return obj[`${field}_en`];
  return obj[field] ?? "";
}
