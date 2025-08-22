import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ─────────────────────── Datos ───────────────────────
const projects = [
  {
    slug: "degrandis",
    title: "Sistema Interno de Producción",
    period: "Abr 2025 – Actualidad",
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
      "Diseño de vistas por sector y actualizaciones en tiempo real"
    ],
    tech: ["React", "Vite", "Material UI", "JavaScript", "Node.js", "PostgreSQL"],
    repo: "https://github.com/EJScalerandi/DeGrandisPortones",
    deploy: "",
    highlights: ["Estados en tiempo real", "Resumen ejecutivo por estado", "Mejora de flujo de trabajo"]
  },
  {
    slug: "msf",
    title: "Micrositio MSF LATAM",
    period: "Ene 2025 – Actualidad",
    started: "2025-01",
    purpose:
      "Backend y base de datos alineado a la identidad visual de Médicos Sin Fronteras LATAM.",
    description:
      "Diseño del modelo de datos, consultas optimizadas y servidor PHP sobre Apache.",
    role: "Full Stack Web Developer (Pasantía no rentada)",
    team: "Individual / Colaborativo",
    responsibilities: [
      "Diseño y desarrollo de la base de datos en MySQL",
      "Procedimientos y consultas optimizadas",
      "Backend en PHP para la lógica del sitio",
      "Configuración de servidor Apache (XAMPP)"
    ],
    tech: ["PHP", "MySQL", "XAMPP", "Apache"],
    repo: "https://github.com/Manuochoa16/msf_micrositio",
    deploy: "",
    highlights: ["Modelo de datos optimizado", "Despliegue estable", "Buen rendimiento en consultas"]
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
      "Gestión de estados con Redux"
    ],
    tech: ["JavaScript", "Next.js", "React", "Redux", "Node.js", "Next.js", "Firebase", "Cloudinary", "PostgreSQL", "Sequelize"],
    repo: "https://github.com/germiiii/Woofer",
    deploy: "https://woofer-taupe.vercel.app/",
    highlights: ["Autenticación", "Feed dinámico", "Arquitectura cliente/servidor clara"]
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
      "Notificaciones para mejorar la UX"
    ],
    tech: ["JavaScript", "React", "Redux", "Node.js", "Sequelize", "PostgreSQL"],
    repo: "https://github.com/EJScalerandi/VideoGames",
    deploy: "",
    highlights: ["SPA con filtros/búsquedas", "Estado global", "Persistencia robusta"]
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
    responsibilities: [
      "Diseño de endpoints REST",
      "Validaciones y control de errores",
      "Modelo relacional y queries"
    ],
    tech: ["Node.js", "Express", "PostgreSQL"],
    repo: "https://github.com/EJScalerandi/BackFicticia",
    deploy: "https://proyecto-ficticia-78jw.vercel.app/",
    highlights: ["Validaciones robustas", "Modelo limpio", "Control de errores"]
  },
  {
    slug: "presupuestador",
    title: "Presupuestador Freelance",
    period: "Ago 2025 – Actualidad",
    started: "2025-08",
    purpose: "Herramienta propia para armar presupuestos de servicios freelance.",
    description:
      "Calcula costos, totales y genera presupuestos exportables para clientes.",
    role: "Full Stack Web Developer",
    team: "Individual",
    responsibilities: [
      "Formulario de servicios y precios",
      "Cálculo automático de totales",
      "Exportación de presupuesto a PDF/JSON"
    ],
    tech: ["React", "Tailwind", "Framer Motion"],
    repo: "",
    deploy: "/presupuestador",
    highlights: ["Automatiza presupuestos", "Ahorra tiempo", "Personalizable"]
  }
];

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
    <section className="max-w-6xl mx-auto my-20 px-4 text-center">
      <h2 className="text-4xl font-bold mb-12 text-blue-100 drop-shadow-md">Proyectos</h2>

      {/* Grid de tarjetas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 place-items-center">
        {projects.map((p, iProj) => {
          const techs = uniqStr(p.tech);
          const cardKey = p.slug ?? `proj-${iProj}`;
          return (
            <motion.button
              key={cardKey}
              type="button"
              onClick={() => handleOpen(p)}
              whileHover={{ scale: 1.04 }}
              transition={{ type: "spring", stiffness: 260, damping: 18 }}
              className="group relative w-80 h-80 rounded-2xl overflow-hidden ring-1 ring-white/10 
                         bg-gradient-to-br from-slate-800/70 via-slate-900/70 to-black/60
                         backdrop-blur-[1px] shadow-lg transition-colors duration-300 text-center"
            >
              <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-colors duration-300" />
              <div className="relative z-10 h-full flex flex-col justify-between p-4 text-slate-100">
                <div>
                  <h3 className="text-xl font-extrabold tracking-tight">{p.title}</h3>
                  <p className="mt-1 text-xs opacity-80">{p.period}</p>
                  <p className="mt-3 text-sm opacity-90 line-clamp-4">{p.description}</p>
                </div>
                <div className="flex flex-wrap gap-2 mt-3 justify-center">
                  {techs.map((t, iTech) => (
                    <span
                      key={`${cardKey}-tech-${iTech}`}
                      className="px-2 py-0.5 text-xs rounded-full bg-white/15 text-slate-100 ring-1 ring-white/10"
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

      {/* Modal mejorado */}
      <AnimatePresence>
        {selected && (
          <motion.div
            key="overlay"
            className="fixed inset-0 bg-black/60 backdrop-blur-[2px] z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
          >
            <motion.div
              key="modal"
              className="w-full max-w-3xl rounded-2xl bg-white text-slate-900 shadow-2xl relative overflow-hidden"
              initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 40, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header con gradient y chips */}
              <div className="relative">
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
                <button
                  onClick={() => setSelected(null)}
                  className="absolute top-3 right-3 inline-flex items-center justify-center rounded-full w-9 h-9 bg-white/90 hover:bg-white text-slate-700 shadow"
                  aria-label="Cerrar"
                  title="Cerrar (Esc)"
                >
                  ✕
                </button>
              </div>

              {/* Contenido */}
              <div className="pt-12 px-6 pb-6">
                <div className="grid md:grid-cols-3 gap-6">
                  {/* Columna izquierda (detalles) */}
                  <div className="md:col-span-2 space-y-4">
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
                  <aside className="space-y-4">
                    <div className="rounded-xl border border-slate-200 p-4">
                      <p className="text-sm font-semibold mb-2">Tecnologías</p>
                      <div className="flex flex-wrap gap-2">
                        {uniqStr(selected.tech).map((t, i) => (
                          <span
                            key={`${selected.slug}-tech-${i}`}
                            className="px-2 py-0.5 text-xs rounded-full bg-slate-100 text-slate-800 ring-1 ring-slate-200"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="rounded-xl border border-slate-200 p-4">
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
