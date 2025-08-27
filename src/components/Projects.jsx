// src/components/Projects.jsx
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ─────────────────────── Datos ───────────────────────
const projects = [ {
    slug: "Odoo DeGrandis Portones",
    title: "Implementación ERP ODOO Enterprise",
    period: "Agos 2025 – Actualidad",
    started: "2025-04",
    purpose:
      "Integración y reemplado de diferentes software para lograr integración",
    description:
      "Implementación de Odoo, comenzando con el módulo de contabilidad, inventario y productos. De manera gradual se irán reemplazando los sistemas que se utilizan actualmente por la modularización que ofrece Odoo",
    role: "Full Stack Web Developer",
    team: "Individual",
    responsibilities: ["GitHub", "Python", "Integración Odoo"],
    tech: ["Python, Odoo Studio"],
    repo: "",
    deploy: "",
    highlights: ["Integracion", "Odoo sistema", "Optimización flujo de trabajo"],
  },
  {
    slug: "De Grandis Portones",
    title: "Sistema Interno de Producción",
    period: "Abr 2025 – Jun 2025",
    started: "2025-04",
    purpose:
      "Trazabilidad y control de fabricación por secciones/subsecciones, estados en tiempo real y resúmenes por sector.",
    description:
      "Optimiza planificación y toma de decisiones con paneles, estados y métrricas por sector productivo.",
    role: "Full Stack Web Developer",
    team: "Individual",
    responsibilities: [
      "Frontend con React + Vite y componentes dinámicos (Material UI)",
      "Backend con Node.js",
      "Integración con base de datos PostgreSQL",
      "Diseño de vistas por sector y actualizaciones en tiempo real",
    ],
    tech: ["React", "Vite", "Material UI", "JavaScript", "Node.js", "PostgreSQL"],
    repo: "https://github.com/EJScalerandi/DeGrandisPortones",
    deploy: "",
    highlights: ["Estados en tiempo real", "Resumen ejecutivo por estado", "Mejora de flujo de trabajo"],
  },
  {
    slug: "msf",
    title: "Micrositio Medicos sin Fronteras LATAM",
    period: "Ene 2025 – Actualidad",
    started: "2025-01",
    purpose:
      "Backend y base de datos alineado a la identidad visual de Médicos Sin Fronteras LATAM.",
    description:
      "Diseño del modelo de datos, consultas optimizadas y servidor PHP sobre Apache para micrositio de médicos sin fronteras, montando un mmanual de marcas que se utiliza en todo latinoamérica.",
    role: "Full Stack Web Developer (Pasantía no rentada)",
    team: "Individual / Colaborativo",
    responsibilities: [
      "Diseño y desarrollo de la base de datos en MySQL",
      "Procedimientos y consultas optimizadas",
      "Backend en PHP para la lógica del sitio",
      "Configuración de servidor Apache (XAMPP)",
    ],
    tech: ["PHP", "MySQL", "XAMPP", "Apache"],
    repo: "https://github.com/Manuochoa16/msf_micrositio",
    deploy: "",
    highlights: ["Modelo de datos optimizado", "Despliegue estable", "Buen rendimiento en consultas"],
  },
  {
    slug: "woofer",
    title: "Woofer",
    period: "Dic 2023 – Ene 2024",
    started: "2023-12",
    purpose: "App social con publicaciones, perfiles y notificaciones.",
    description:
      "Proyecto final Henry. Integración cliente/cliente, feed dinámico y manejo de sesión.",
    role: "Full Stack Web Developer (Proyecto final Henry)",
    team: "7 personas",
    responsibilities: [
      "Frontend con Next.js/React (HomeWalker)",
      "Integración de comunicación entre clientes",
      "Sistema de notificaciones",
      "Gestión de estados con Redux",
    ],
    tech: [
      "JavaScript",
      "Next.js",
      "React",
      "Redux",
      "Node.js",
      "Next.js",
      "Firebase",
      "Cloudinary",
      "PostgreSQL",
      "Sequelize",
    ],
    repo: "https://github.com/germiiii/Woofer",
    deploy: "https://woofer-taupe.vercel.app/",
    highlights: ["Autenticación", "Feed dinámico", "Arquitectura cliente/servidor clara"],
  },
  {
    slug: "videogames",
    title: "Videogames",
    period: "Nov 2023 – Dic 2023",
    started: "2023-11",
    purpose: "Proyecto individual tipo SPA con catálogo/búsqueda y gestión.",
    description:
      "Aplicación full stack con React/Redux y Node/Sequelize/PostgreSQL; foco en UX y notificaciones.",
    role: "Full Stack Web Developer (Proyecto individual)",
    team: "Individual",
    responsibilities: [
      "Frontend con React + Redux",
      "Backend con Node.js + Sequelize",
      "Modelo y relaciones en PostgreSQL",
      "Notificaciones para mejorar la UX",
    ],
    tech: ["JavaScript", "React", "Redux", "Node.js", "Sequelize", "PostgreSQL"],
    repo: "https://github.com/EJScalerandi/VideoGames",
    deploy: "",
    highlights: ["SPA con filtros/búsquedas", "Estado global", "Persistencia robusta"],
  },
  {
    slug: "backficticia",
    title: "BackFicticia (Seguro de Vida)",
    period: "Nov 2024",
    started: "2024-11",
    purpose: "API REST para registro y gestión de clientes de seguros.",
    description:
      "Prueba técnica 48hs. Aprendizaje de tecnologías nuevas para cumplir requisitos. Mayor foco en base de datos; deploy en entorno gratuito.",
    role: "Backend Developer",
    team: "Individual",
    responsibilities: ["Diseño de endpoints REST", "Validaciones y control de errores", "Modelo relacional y queries"],
    tech: ["Node.js", "Express", "PostgreSQL"],
    repo: "https://github.com/EJScalerandi/BackFicticia",
    deploy: "https://proyecto-ficticia-78jw.vercel.app/",
    highlights: ["Validaciones robustas", "Modelo limpio", "Control de errores"],
  },
  {
    slug: "presupuestador",
    title: "Presupuestador Freelance",
    period: "Ago 2025 – Ago 2025",
    started: "2025-08",
    purpose: "Herramienta propia para armar presupuestos de servicios freelance.",
    description:
      "Calcula costos, totales y genera presupuestos exportables para clientes. Es un presupuestador hecho para ofrecer el servicio de freelance a clientes que lo requieran.",
    role: "Full Stack Web Developer",
    team: "Individual",
    responsibilities: ["Formulario de servicios y precios", "Cálculo automático de totales", "Exportación de presupuesto a PDF/JSON"],
    tech: ["React", "Tailwind", "Framer Motion"],
    repo: "",
    deploy: "/presupuestador",
    highlights: ["Automatiza presupuestos", "Ahorra tiempo", "Personalizable"],
  },
  {
    slug: "portfolio",
    title: "Portfolio + Chatbot (FullStack)",
    period: "Ago 2025 – Actualidad",
    started: "2025-08",
    purpose: "Sitio personal con presentación, proyectos y widget de chat conectado a API propia.",
    description:
      "SPA con React + Vite y Tailwind; animaciones con Framer Motion. Chat embebido que consume un backend serverless en Vercel (OpenRouter) con CORS configurado y system prompt personalizado. Incluye Presupuestador en /presupuestador.",
    role: "Full Stack Web Developer",
    team: "Individual",
    responsibilities: [
      "UI/UX y layout responsivo (Tailwind + Framer Motion)",
      "Widget de chat con historial y abort controller",
      "Backend serverless en Vercel que proxea OpenRouter con fallback de modelo",
      "CORS y preflight ajustados; health-check",
      "CI/CD con Vercel y variables de entorno",
    ],
    tech: ["React", "Vite", "Tailwind", "Framer Motion", "Node.js", "Vercel Functions", "OpenRouter", "CORS"],
    repo: "https://github.com/EJScalerandi/mi-portfolio",
    deploy: "/",
    highlights: ["Widget de chat integrado", "Presupuestador en /presupuestador", "Backend propio (OpenRouter) y CORS"],
  },];

// ─────────────────────── Auxiliares ───────────────────────
const uniqStr = (arr = []) => [...new Set(arr.filter(Boolean))];

function InfoRow({ label, value }) {
  return (
    <div className="text-sm">
      <span className="font-semibold">{label}: </span>
      <span>{value}</span>
    </div>
  );
}

function formatYM(ym) {
  if (!ym) return "—";
  const [y, m] = ym.split("-");
  const meses = ["Ene","Feb","Mar","Abr","May","Jun","Jul","Ago","Sep","Oct","Nov","Dic"];
  return `${meses[(+m || 1) - 1]} ${y}`;
}

// ─────────────────────── UI ───────────────────────
export default function Projects() {
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && setSelected(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const handleOpen = (p) => setSelected(p);

  return (
    <section className="mx-auto my-12 sm:my-16 lg:my-20 px-3 sm:px-4 lg:px-6 text-center">
      <h2 className="text-3xl sm:text-4xl font-bold mb-8 sm:mb-10 lg:mb-12 text-blue-100 drop-shadow-md">
        Proyectos
      </h2>

      {/* Grid responsive */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 place-items-stretch">
        {projects.map((p, iProj) => {
          const techs = uniqStr(p.tech);
          const cardKey = p.slug ?? `proj-${iProj}`;
          return (
            <motion.button
              key={cardKey}
              type="button"
              onClick={() => handleOpen(p)}
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 240, damping: 20 }}
              className="group relative w-full h-full rounded-2xl overflow-hidden ring-1 ring-white/10 
                         bg-gradient-to-br from-slate-800/70 via-slate-900/70 to-black/60
                         backdrop-blur-[1px] shadow-lg transition-colors duration-300 text-left"
            >
              <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-colors duration-300" />
              <div className="relative z-10 flex flex-col justify-between p-4 sm:p-5 text-slate-100 min-h-[16rem] sm:min-h-[18rem]">
                <div>
                  <h3 className="text-lg sm:text-xl font-extrabold tracking-tight">{p.title}</h3>
                  <p className="mt-1 text-xs sm:text-sm opacity-80">{p.period}</p>
                  <p className="mt-3 text-sm opacity-90 line-clamp-5 sm:line-clamp-4">{p.description}</p>
                </div>
                <div className="flex flex-wrap gap-1.5 sm:gap-2 mt-3">
                  {techs.map((t, iTech) => (
                    <span
                      key={`${cardKey}-tech-${iTech}`}
                      className="px-2 py-0.5 text-[11px] sm:text-xs rounded-full bg-white/15 text-slate-100 ring-1 ring-white/10"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
              <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-white/10 group-hover:ring-slate-300" />
              <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300
                              shadow-[0_0_45px_10px_rgba(255,255,255,0.35)] rounded-2xl" />
            </motion.button>
          );
        })}
      </div>

      {/* Modal responsive */}
      <AnimatePresence>
        {selected && (
          <motion.div
            key="overlay"
            className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-[2px] flex items-start sm:items-center justify-center p-2 sm:p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
          >
            <motion.div
              key="modal"
              className="w-full max-w-xl sm:max-w-3xl mx-auto rounded-2xl bg-white text-slate-900 shadow-2xl relative overflow-hidden"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 30, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Cerrar */}
              <button
                onClick={() => setSelected(null)}
                className="absolute top-2 right-2 sm:top-3 sm:right-3 inline-flex items-center justify-center rounded-full w-8 h-8 sm:w-9 sm:h-9 bg-white/90 hover:bg-white text-slate-700 shadow z-10"
                aria-label="Cerrar"
                title="Cerrar (Esc)"
              >
                ✕
              </button>

              {/* HEADER:
                 - En mobile: header simple (sin flotante)
                 - En sm+: gradient + tarjeta flotante */}
              {/* Mobile header simple */}
              <div className="sm:hidden p-4 border-b border-slate-200">
                <h3 className="text-xl font-extrabold tracking-tight">{selected.title}</h3>
                <p className="text-xs text-slate-500">{selected.period}</p>
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {uniqStr(selected.tech).slice(0, 5).map((t, i) => (
                    <span key={`${selected.slug}-mobtech-${i}`} className="px-2 py-0.5 text-[11px] rounded-full bg-slate-100 text-slate-700 ring-1 ring-slate-200">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Desktop/Tablet header con flotante */}
              <div className="relative hidden sm:block">
                <div className="h-28 bg-gradient-to-r from-gray-900 via-gray-600 to-gray-300" />
                <div className="absolute inset-x-0 -bottom-8 px-6">
                  <div className="bg-white rounded-xl border border-slate-200 shadow-md p-4">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                      <div>
                        <h3 className="text-2xl font-extrabold tracking-tight">{selected.title}</h3>
                        <p className="text-sm text-slate-500">{selected.period}</p>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {uniqStr(selected.tech).slice(0, 5).map((t, i) => (
                          <span key={`${selected.slug}-toptech-${i}`} className="px-2 py-0.5 text-xs rounded-full bg-slate-100 text-slate-700 ring-1 ring-slate-200">
                            {t}
                          </span>
                        ))}
                        {uniqStr(selected.tech).length > 5 && (
                          <span className="px-2 py-0.5 text-xs rounded-full bg-slate-100 text-slate-700 ring-1 ring-slate-200">
                            +{uniqStr(selected.tech).length - 5}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contenedor scrollable (para que RESPONDA en móvil) */}
              <div className="sm:pt-12 p-3 sm:px-6 sm:pb-6 max-h-[90dvh] overflow-y-auto">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
                  {/* Columna izquierda (detalles) */}
                  <div className="md:col-span-2 space-y-3 sm:space-y-4">
                    <p className="text-sm text-slate-700">{selected.description}</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <InfoRow label="Inicio" value={formatYM(selected.started)} />
                      {selected.role ? <InfoRow label="Rol" value={selected.role} /> : null}
                      {selected.team ? <InfoRow label="Equipo" value={selected.team} /> : null}
                      <InfoRow label="Propósito" value={selected.purpose} />
                    </div>

                    {Array.isArray(selected.responsibilities) && selected.responsibilities.length > 0 && (
                      <div>
                        <p className="text-sm font-semibold mb-2">Responsabilidades</p>
                        <ul className="list-disc pl-5 text-sm space-y-1">
                          {selected.responsibilities.map((r, i) => (
                            <li key={`${selected.slug}-resp-${i}`}>{r}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {Array.isArray(selected.highlights) && selected.highlights.length > 0 && (
                      <div>
                        <p className="text-sm font-semibold mb-2">Puntos clave</p>
                        <ul className="list-disc pl-5 text-sm space-y-1">
                          {selected.highlights.map((h, i) => (
                            <li key={`${selected.slug}-hl-${i}`}>{h}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>

                  {/* Columna derecha (sidebar) */}
                  <aside className="space-y-3 sm:space-y-4">
                    <div className="rounded-xl border border-slate-200 p-3 sm:p-4">
                      <p className="text-sm font-semibold mb-2">Tecnologías</p>
                      <div className="flex flex-wrap gap-1.5 sm:gap-2">
                        {uniqStr(selected.tech).map((t, i) => (
                          <span
                            key={`${selected.slug}-tech-${i}`}
                            className="px-2 py-0.5 text-[11px] sm:text-xs rounded-full bg-slate-100 text-slate-800 ring-1 ring-slate-200"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="rounded-xl border border-slate-200 p-3 sm:p-4">
                      <p className="text-sm font-semibold mb-2">Acciones</p>
                      <div className="flex flex-wrap gap-2">
                        {selected.repo ? (
                          <a
                            href={selected.repo}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-2 rounded-md px-3 py-1.5 border border-slate-300 hover:bg-slate-50 text-sm"
                          >
                            <span>🗂️</span> Repositorio
                          </a>
                        ) : null}
                        {selected.deploy ? (
                          <a
                            href={selected.deploy}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-2 rounded-md px-3 py-1.5 bg-slate-900 text-white hover:bg-slate-700 text-sm"
                          >
                            <span>🔗</span> Visitar sitio
                          </a>
                        ) : null}
                      </div>
                    </div>
                  </aside>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
