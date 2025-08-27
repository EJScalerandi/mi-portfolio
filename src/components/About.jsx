import { useI18n, pickByLang } from "../i18n";

export default function About() {
  const { lang } = useI18n();

  const content = {
    title: "Sobre mí",
    title_en: "About Me",
    text: `Soy un FullStack Developer con experiencia previa en logística y compras, lo que ha fortalecido mis habilidades en trabajo en equipo, análisis de datos masivos y toma de decisiones rápidas con enfoque empresarial.
Especializado en Front-end y Back-end, con conocimientos en metodologías ágiles, GIT, estructura de datos, algoritmos y frameworks CSS.
Actualmente, estoy interesado en ampliar mis conocimientos en Python para complementar mi formación.
Además, tengo experiencia en GraphApi, C# y .NET, lo que me permite ofrecer soluciones más robustas y escalables en proyectos de desarrollo.
Mi nivel de inglés es intermedio/avanzado.`,
    text_en: `I am a Full-Stack Developer with previous experience in logistics and purchasing, which has strengthened my skills in teamwork, big data analysis, and quick business-oriented decision-making.
Specialized in Front-end and Back-end, with knowledge of agile methodologies, GIT, data structures, algorithms, and CSS frameworks.
I am currently interested in expanding my knowledge of Python to complement my training.
Additionally, I have experience with GraphApi, C#, and .NET, which allows me to deliver more robust and scalable development solutions.
My English level is intermediate/advanced.`,
  };

  return (
    <section className="max-w-3xl mx-auto my-12 p-6 bg-white rounded-xl shadow-lg transform hover:scale-[1.02] transition-transform duration-300">
      <h2 className="text-3xl font-bold mb-4 text-center text-blue-800">
        {pickByLang(content, "title", lang)}
      </h2>
      <p className="text-gray-700 leading-relaxed whitespace-pre-line">
        {pickByLang(content, "text", lang)}
      </p>
    </section>
  );
}
