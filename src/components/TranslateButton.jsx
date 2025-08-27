import { useI18n } from "../i18n";

export default function TranslateButton() {
  const { lang, switchLang } = useI18n();

  return (
    <button
      onClick={switchLang}
      className="fixed z-[70] top-4 left-4 rounded-full px-4 py-2 bg-white/90 hover:bg-white shadow-lg ring-1 ring-slate-300 text-slate-800 text-sm font-medium backdrop-blur"
      title={lang === "es" ? "Switch to English" : "Cambiar a Español"}
      aria-label="Translate"
    >
      {lang === "es" ? "EN" : "ES"}
    </button>
  );
}
