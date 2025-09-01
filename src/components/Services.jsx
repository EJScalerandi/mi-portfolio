import { useI18n, pickByLang } from "../i18n";
import { FaLaptopCode, FaStore, FaCogs } from "react-icons/fa";

export default function Services() {
  const { lang } = useI18n();

  const services = [
    {
      icon: <FaLaptopCode className="text-3xl text-blue-600" />,
      title: "Desarrollo Web",
      title_en: "Web Development",
      text: "Creación de páginas web desde cero o modificación de sitios existentes.",
      text_en: "Building websites from scratch or improving existing ones.",
    },
    {
      icon: <FaStore className="text-3xl text-green-600" />,
      title: "E-commerce",
      title_en: "E-commerce",
      text: "Tiendas online con integración de pagos y gestión de productos.",
      text_en: "Online stores with payment integration and product management.",
    },
    {
      icon: <FaCogs className="text-3xl text-purple-600" />,
      title: "Software a medida",
      title_en: "Custom Software",
      text: "Aplicaciones y soluciones adaptadas a las necesidades de tu negocio.",
      text_en: "Applications and solutions tailored to your business needs.",
    },
  ];

  return (
    <section className="mx-auto my-16 px-4 max-w-5xl text-center">
      <h2 className="text-3xl sm:text-4xl font-bold mb-10 text-blue-100 drop-shadow-md">
        {lang === "es" ? "Servicios" : "Services"}
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((s, i) => (
          <div
            key={i}
            className="p-6 rounded-xl bg-white/90 shadow-lg hover:shadow-xl transition transform hover:-translate-y-1"
          >
            <div className="mb-4 flex justify-center">{s.icon}</div>
            <h3 className="text-xl font-semibold text-slate-800 mb-2">
              {pickByLang(s, "title", lang)}
            </h3>
            <p className="text-slate-600">
              {pickByLang(s, "text", lang)}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
