// src/components/Presupuestador.jsx
// Presupuestador freelance simple (sin dependencias extra). Tailwind + React.
// Guarda en localStorage, exporta JSON y permite imprimir (PDF via imprimir).
// 🔐 Los botones "Imprimir / PDF" y "Exportar JSON" piden una clave (VITE_PRESU_KEY).

import { useEffect, useMemo, useState } from "react";

const CURRENCIES = [
  { code: "ARS", symbol: "$" },
  { code: "USD", symbol: "US$" },
  { code: "EUR", symbol: "€" },
];

const PRESU_KEY = import.meta.env.VITE_PRESU_KEY || "";

const fmt = (n) =>
  Number.isFinite(n)
    ? n.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })
    : "0.00";
const todayISO = () => new Date().toISOString().slice(0, 10);

const emptyItem = () => ({ id: crypto.randomUUID(), desc: "", qty: 1, price: 0 });

export default function Presupuestador() {
  const [currency, setCurrency] = useState(CURRENCIES[0]);
  const [issuer, setIssuer] = useState({
    name: "Esteban Javier Scalerandi",
    email: "estebanscalerandi.dev@gmail.com",
    phone: "3572-400170",
    city: "Córdoba, Argentina",
  });
  const [client, setClient] = useState({ name: "", email: "", phone: "" });
  const [meta, setMeta] = useState({
    quoteNumber: `P-${new Date().getFullYear()}-${String(Math.floor(Math.random() * 10000)).padStart(4, "0")}`,
    issueDate: todayISO(),
    dueDate: todayISO(),
    notes: "Gracias por tu consulta. Este presupuesto tiene validez de 7 días.",
  });

  const [items, setItems] = useState([emptyItem()]);
  const [discountPct, setDiscountPct] = useState(0); // % sobre subtotal
  const [taxPct, setTaxPct] = useState(21); // IVA por defecto

  // Persistencia
  useEffect(() => {
    const saved = localStorage.getItem("presupuestador:v1");
    if (saved) {
      try {
        const s = JSON.parse(saved);
        setCurrency(s.currency || CURRENCIES[0]);
        setIssuer(s.issuer || {});
        setClient(s.client || {});
        setMeta(s.meta || {});
        setItems(s.items && s.items.length ? s.items : [emptyItem()]);
        setDiscountPct(s.discountPct ?? 0);
        setTaxPct(s.taxPct ?? 21);
      } catch {}
    }
  }, []);

  useEffect(() => {
    const payload = { currency, issuer, client, meta, items, discountPct, taxPct };
    localStorage.setItem("presupuestador:v1", JSON.stringify(payload));
  }, [currency, issuer, client, meta, items, discountPct, taxPct]);

  // Cálculos
  const totals = useMemo(() => {
    const subtotal = items.reduce((acc, it) => acc + (Number(it.qty) || 0) * (Number(it.price) || 0), 0);
    const discount = (subtotal * (Number(discountPct) || 0)) / 100;
    const taxable = Math.max(subtotal - discount, 0);
    const tax = (taxable * (Number(taxPct) || 0)) / 100;
    const total = taxable + tax;
    return { subtotal, discount, tax, total };
  }, [items, discountPct, taxPct]);

  // Helpers
  const setItem = (id, patch) => setItems((prev) => prev.map((it) => (it.id === id ? { ...it, ...patch } : it)));
  const addItem = () => setItems((prev) => [...prev, emptyItem()]);
  const removeItem = (id) => setItems((prev) => (prev.length > 1 ? prev.filter((it) => it.id !== id) : prev));
  const clearAll = () => {
    setClient({ name: "", email: "", phone: "" });
    setItems([emptyItem()]);
    setDiscountPct(0);
    setTaxPct(21);
    setMeta((m) => ({
      ...m,
      notes: "",
      quoteNumber: `P-${new Date().getFullYear()}-${String(Math.floor(Math.random() * 10000)).padStart(4, "0")}`,
    }));
  };

  // 🔐 Gate de clave
  const checkKey = () => {
    const k = window.prompt("Ingresá la clave del presupuestador:");
    if (k == null) return false; // cancelado
    const ok = String(k).trim() === PRESU_KEY;
    if (!ok) {
      window.alert("Clave incorrecta. Contactate con Esteban para el uso del presupuestador.");
    }
    return ok;
  };

  const exportJSON = () => {
    if (!checkKey()) return;
    const blob = new Blob(
      [JSON.stringify({ currency, issuer, client, meta, items, discountPct, taxPct, totals }, null, 2)],
      { type: "application/json" }
    );
    const url = URL.createObjectURL(blob);
    const a = Object.assign(document.createElement("a"), {
      href: url,
      download: `${meta.quoteNumber || "presupuesto"}.json`,
    });
    a.click();
    URL.revokeObjectURL(url);
  };

  const printPDF = () => {
    if (!checkKey()) return;
    window.print(); // Usar diálogo de impresión → “Guardar como PDF”
  };

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-6 bg-slate-900/50 rounded-2xl border border-slate-700 text-slate-100">
      {/* Encabezado */}
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold">Presupuestador</h2>
          <p className="text-slate-300">Generá presupuestos rápidos para tus servicios freelance.</p>
        </div>
        <div className="flex items-center gap-2">
          <label className="text-sm text-slate-300">Moneda</label>
          <select
            className="bg-slate-800 border border-slate-700 rounded px-2 py-1"
            value={currency.code}
            onChange={(e) => setCurrency(CURRENCIES.find((c) => c.code === e.target.value) || CURRENCIES[0])}
          >
            {CURRENCIES.map((c) => (
              <option key={c.code} value={c.code}>
                {c.code} ({c.symbol})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Emisor / Cliente */}
      <div className="grid md:grid-cols-2 gap-4 mt-6">
        <div className="bg-slate-800/60 p-4 rounded-xl border border-slate-700">
          <h3 className="font-semibold mb-3">Emisor</h3>
          <div className="grid gap-2">
            <input className="input" placeholder="Nombre" value={issuer.name} onChange={(e) => setIssuer({ ...issuer, name: e.target.value })} />
            <input className="input" placeholder="Email" value={issuer.email} onChange={(e) => setIssuer({ ...issuer, email: e.target.value })} />
            <input className="input" placeholder="Teléfono" value={issuer.phone} onChange={(e) => setIssuer({ ...issuer, phone: e.target.value })} />
            <input className="input" placeholder="Ciudad" value={issuer.city} onChange={(e) => setIssuer({ ...issuer, city: e.target.value })} />
          </div>
        </div>
        <div className="bg-slate-800/60 p-4 rounded-xl border border-slate-700">
          <h3 className="font-semibold mb-3">Cliente</h3>
          <div className="grid gap-2">
            <input
              className="input"
              placeholder="Nombre / Razón Social"
              value={client.name}
              onChange={(e) => setClient({ ...client, name: e.target.value })}
            />
            <input className="input" placeholder="Email" value={client.email} onChange={(e) => setClient({ ...client, email: e.target.value })} />
            <input className="input" placeholder="Teléfono" value={client.phone} onChange={(e) => setClient({ ...client, phone: e.target.value })} />
          </div>
        </div>
      </div>

      {/* Meta */}
      <div className="grid md:grid-cols-3 gap-4 mt-4">
        <div className="bg-slate-800/60 p-4 rounded-xl border border-slate-700">
          <label className="text-sm text-slate-300">N° Presupuesto</label>
          <input className="input mt-1" value={meta.quoteNumber} onChange={(e) => setMeta({ ...meta, quoteNumber: e.target.value })} />
        </div>
        <div className="bg-slate-800/60 p-4 rounded-xl border border-slate-700">
          <label className="text-sm text-slate-300">Fecha emisión</label>
          <input type="date" className="input mt-1" value={meta.issueDate} onChange={(e) => setMeta({ ...meta, issueDate: e.target.value })} />
        </div>
        <div className="bg-slate-800/60 p-4 rounded-xl border border-slate-700">
          <label className="text-sm text-slate-300">Vencimiento</label>
          <input type="date" className="input mt-1" value={meta.dueDate} onChange={(e) => setMeta({ ...meta, dueDate: e.target.value })} />
        </div>
      </div>

      {/* Items */}
      <div className="mt-6 bg-slate-800/60 rounded-xl border border-slate-700 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-slate-800/80 text-slate-300">
            <tr>
              <th className="px-3 py-2 text-left">Descripción</th>
              <th className="px-3 py-2 text-right w-24">Cant.</th>
              <th className="px-3 py-2 text-right w-36">Precio</th>
              <th className="px-3 py-2 text-right w-36">Importe</th>
              <th className="px-3 py-2 w-12"></th>
            </tr>
          </thead>
          <tbody>
            {items.map((it) => {
              const amount = (Number(it.qty) || 0) * (Number(it.price) || 0);
              return (
                <tr key={it.id} className="border-t border-slate-700">
                  <td className="px-3 py-2">
                    <input
                      className="input"
                      placeholder="Descripción del ítem"
                      value={it.desc}
                      onChange={(e) => setItem(it.id, { desc: e.target.value })}
                    />
                  </td>
                  <td className="px-3 py-2 text-right">
                    <input
                      className="input text-right"
                      type="number"
                      min="0"
                      step="1"
                      value={it.qty}
                      onChange={(e) => setItem(it.id, { qty: Number(e.target.value) })}
                    />
                  </td>
                  <td className="px-3 py-2 text-right">
                    <div className="flex items-center gap-2 justify-end">
                      <span className="opacity-70">{currency.symbol}</span>
                      <input
                        className="input text-right"
                        type="number"
                        min="0"
                        step="0.01"
                        value={it.price}
                        onChange={(e) => setItem(it.id, { price: Number(e.target.value) })}
                      />
                    </div>
                  </td>
                  <td className="px-3 py-2 text-right">
                    {currency.symbol} {fmt(amount)}
                  </td>
                  <td className="px-3 py-2 text-center">
                    <button className="text-red-300 hover:text-red-400" onClick={() => removeItem(it.id)}>
                      ✕
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        <div className="p-3 flex justify-between items-center">
          <button className="px-3 py-2 rounded bg-slate-700 hover:bg-slate-600" onClick={addItem}>
            + Agregar ítem
          </button>
          <button className="px-3 py-2 rounded bg-slate-700 hover:bg-slate-600" onClick={clearAll}>
            Limpiar
          </button>
        </div>
      </div>

      {/* Descuentos / Impuestos */}
      <div className="grid md:grid-cols-2 gap-4 mt-4">
        <div className="bg-slate-800/60 p-4 rounded-xl border border-slate-700">
          <label className="text-sm text-slate-300">Notas</label>
          <textarea
            rows={4}
            className="input mt-1 min-h-[96px]"
            placeholder="Términos, alcance, entregables, forma de pago…"
            value={meta.notes}
            onChange={(e) => setMeta({ ...meta, notes: e.target.value })}
          />
        </div>
        <div className="bg-slate-800/60 p-4 rounded-xl border border-slate-700">
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm text-slate-300">Descuento (%)</label>
            <input
              className="input w-28 text-right"
              type="number"
              min="0"
              max="100"
              step="0.5"
              value={discountPct}
              onChange={(e) => setDiscountPct(Number(e.target.value))}
            />
          </div>
          <div className="flex items-center justify-between">
            <label className="text-sm text-slate-300">Impuesto (IVA %)</label>
            <input
              className="input w-28 text-right"
              type="number"
              min="0"
              max="27"
              step="0.5"
              value={taxPct}
              onChange={(e) => setTaxPct(Number(e.target.value))}
            />
          </div>
        </div>
      </div>

      {/* Totales */}
      <div className="mt-6 bg-slate-800/60 p-4 rounded-xl border border-slate-700">
        <div className="flex flex-col gap-2 w-full md:w-80 ml-auto">
          <Row label="Subtotal" value={`${currency.symbol} ${fmt(totals.subtotal)}`} />
          <Row label={`Descuento (${fmt(discountPct)}%)`} value={`- ${currency.symbol} ${fmt(totals.discount)}`} />
          <Row label={`Impuesto (${fmt(taxPct)}%)`} value={`${currency.symbol} ${fmt(totals.tax)}`} />
          <hr className="border-slate-700 my-1" />
          <Row strong label="TOTAL" value={`${currency.symbol} ${fmt(totals.total)}`} />
        </div>
      </div>

      {/* Acciones */}
      <div className="mt-6 flex flex-wrap gap-3">
        <button className="px-4 py-2 rounded bg-indigo-600 hover:bg-indigo-700" onClick={printPDF}>
          Imprimir / PDF
        </button>
        <button className="px-4 py-2 rounded bg-slate-700 hover:bg-slate-600" onClick={exportJSON}>
          Exportar JSON
        </button>
      </div>

      {/* Estilos de inputs */}
      <style>{`
        .input {
          width: 100%;
          background: rgba(15,23,42,0.7);
          border: 1px solid rgba(51,65,85,0.8);
          border-radius: 0.5rem;
          padding: 0.5rem 0.625rem;
          color: #e2e8f0;
          outline: none;
        }
        .input:focus { border-color: #6366f1; box-shadow: 0 0 0 2px rgba(99,102,241,0.3); }
        @media print {
          body { background: #fff !important; }
          .input, select, button { border: none !important; background: transparent !important; box-shadow: none !important; }
          a, button { display: none !important; }
          .border, .border-slate-700 { border-color: #ddd !important; }
          .bg-slate-800\\/60, .bg-slate-900\\/50 { background: #fff !important; }
          .text-slate-100, .text-slate-200, .text-slate-300 { color: #111 !important; }
        }
      `}</style>
    </div>
  );
}

function Row({ label, value, strong }) {
  return (
    <div className="flex items-center justify-between">
      <span className={`text-slate-300 ${strong ? "font-semibold text-slate-100" : ""}`}>{label}</span>
      <span className={`text-right ${strong ? "font-bold text-slate-100 text-lg" : ""}`}>{value}</span>
    </div>
  );
}
