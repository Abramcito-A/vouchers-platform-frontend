import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Créditos — MIS VALES",
};

export default function CreditosPage() {
  return (
    <div className="card p-8 text-center">
      <h1 className="text-2xl font-black text-slate-800 mb-2">Créditos</h1>
      <p className="text-slate-500">
        Gestión de líneas de crédito, aumentos e historial de distribuidoras.
      </p>
    </div>
  );
}
