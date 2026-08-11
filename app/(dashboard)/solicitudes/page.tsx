"use client";
import React, { useState } from "react";
import PageHeader from "@/app/_components/ui/PageHeader";
import Modal from "@/app/_components/ui/Modal";

// --- Tipos Mock ---
type TabName = "aperturas" | "aumentos" | "transferencias" | "operativas";

interface SolicitudApertura {
  id: string;
  nombre: string;
  coordinador: string;
  sucursal: string;
  fecha: string;
  riesgo: "Alto" | "Medio" | "Bajo";
}

interface SolicitudAumento {
  id: string;
  distribuidora: string;
  limiteActual: number;
  limiteSolicitado: number;
  historial: string; // Buen pagador, etc.
}

// --- Componentes Internos de las Pestañas ---

function ExpedienteModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Evaluación de Riesgo - Nueva Distribuidora" maxWidth="2xl">
      <div className="space-y-6">
        {/* Datos Personales */}
        <section>
          <h4 className="text-sm font-bold text-slate-800 border-b border-slate-200 pb-2 mb-3">Datos Generales</h4>
          <div className="grid grid-cols-3 gap-4 text-sm">
            <div><span className="text-slate-500 block text-xs">Nombre Completo</span><span className="font-semibold text-slate-700">María López Ramírez</span></div>
            <div><span className="text-slate-500 block text-xs">CURP</span><span className="font-mono text-slate-700">LORM850512MDF</span></div>
            <div><span className="text-slate-500 block text-xs">RFC</span><span className="font-mono text-slate-700">LORM8505128Y3</span></div>
            <div className="col-span-3"><span className="text-slate-500 block text-xs">Domicilio</span><span className="text-slate-700">Calle Girasoles 123, Col. Centro, Culiacán, Sinaloa</span></div>
          </div>
        </section>
        
        {/* Datos de Riesgo */}
        <section>
          <h4 className="text-sm font-bold text-slate-800 border-b border-slate-200 pb-2 mb-3">Expediente de Riesgo</h4>
          <div className="grid grid-cols-2 gap-4 text-sm bg-slate-50 p-4 rounded-lg">
            <div><span className="text-slate-500 block text-xs">Tipo de Vivienda</span><span className="font-medium text-slate-700">Propia (Infonavit)</span></div>
            <div><span className="text-slate-500 block text-xs">Vehículos</span><span className="font-medium text-slate-700">1 (Nissan Sentra 2018)</span></div>
            <div><span className="text-slate-500 block text-xs">Estado Civil / Familia</span><span className="font-medium text-slate-700">Casada, 2 Hijos (15 y 18 años)</span></div>
            <div><span className="text-slate-500 block text-xs">Referencias Anteriores</span><span className="font-medium text-green-600">Positivas (3 verificadas)</span></div>
          </div>
        </section>

        {/* Límite de Crédito Propuesto */}
        <section className="bg-blue-50 border border-blue-100 p-4 rounded-lg flex items-center justify-between">
          <div>
            <h4 className="text-sm font-bold text-blue-900">Límite de Crédito Inicial</h4>
            <p className="text-xs text-blue-700 mt-0.5">Sugerido por el sistema basado en el expediente.</p>
          </div>
          <div className="text-right">
            <span className="text-2xl font-black text-blue-600">$10,000.00</span>
          </div>
        </section>

        <div className="flex justify-end gap-3 pt-4">
          <button onClick={onClose} className="px-4 py-2 text-sm font-semibold text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-colors">
            Rechazar
          </button>
          <button onClick={onClose} className="px-4 py-2 text-sm font-semibold text-white bg-green-600 hover:bg-green-700 rounded-lg transition-colors">
            Autorizar Apertura
          </button>
        </div>
      </div>
    </Modal>
  );
}

function AperturasTab() {
  const [modalOpen, setModalOpen] = useState(false);
  const data: SolicitudApertura[] = [
    { id: "AP-001", nombre: "María López Ramírez", coordinador: "Juan Pérez", sucursal: "Norte", fecha: "Hoy 10:30", riesgo: "Bajo" },
  ];

  return (
    <div>
      <ExpedienteModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
      <div className="space-y-4">
        {data.map((item) => (
          <div key={item.id} className="card p-5 flex items-center justify-between hover:shadow-md transition-shadow">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">
                {item.nombre.charAt(0)}
              </div>
              <div>
                <h4 className="font-bold text-slate-800">{item.nombre}</h4>
                <p className="text-xs text-slate-500">Coordinador: <span className="font-medium text-slate-700">{item.coordinador}</span> • Sucursal: {item.sucursal}</p>
              </div>
            </div>
            <div className="flex items-center gap-6">
              <div className="text-right">
                <span className="block text-xs text-slate-500">Nivel de Riesgo</span>
                <span className="badge bg-green-100 text-green-700 border-green-200 mt-1">{item.riesgo}</span>
              </div>
              <button 
                onClick={() => setModalOpen(true)}
                className="px-4 py-2 bg-primary text-white text-sm font-semibold rounded-lg hover:bg-primary-600 transition-colors"
              >
                Revisar Expediente
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function AumentosTab() {
  const data: SolicitudAumento[] = [
    { id: "AU-001", distribuidora: "Carmen García", limiteActual: 10000, limiteSolicitado: 15000, historial: "Excelente, sin atrasos" },
  ];

  return (
    <div className="space-y-4">
      {data.map((item) => (
        <div key={item.id} className="card border-l-4 border-l-warning p-5">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h4 className="font-bold text-slate-800">{item.distribuidora}</h4>
              <p className="text-xs text-slate-500">Solicitud de aumento de línea de crédito</p>
            </div>
            <span className="text-xs font-mono bg-slate-100 px-2 py-1 rounded text-slate-600">{item.id}</span>
          </div>

          <div className="flex items-center justify-between bg-slate-50 p-4 rounded-lg mb-4 border border-slate-100">
            <div className="text-center">
              <span className="block text-xs text-slate-500 mb-1">Límite Actual</span>
              <span className="text-lg font-bold text-slate-700">${item.limiteActual.toLocaleString()}</span>
            </div>
            <div className="text-slate-300">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </div>
            <div className="text-center">
              <span className="block text-xs text-slate-500 mb-1">Límite Solicitado</span>
              <span className="text-xl font-black text-warning">${item.limiteSolicitado.toLocaleString()}</span>
            </div>
          </div>

          {/* Recordatorio Regla de Negocio */}
          <div className="bg-yellow-50 border border-yellow-200 p-3 rounded-lg flex gap-3 mb-4 items-start">
            <svg className="text-yellow-600 mt-0.5 shrink-0" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0zM12 9v4M12 17h.01"/></svg>
            <div>
              <h5 className="text-sm font-bold text-yellow-800">Regla del Pre-vale (50%)</h5>
              <p className="text-xs text-yellow-700 mt-0.5">
                Al autorizar este aumento, la distribuidora tendrá $15,000 disponibles. Su siguiente cliente nuevo <strong>solo podrá pedir hasta $7,500 (±$500) en el primer vale</strong>.
              </p>
            </div>
          </div>

          <div className="flex justify-end gap-3">
            <button className="px-4 py-2 text-sm font-semibold text-red-600 hover:bg-red-50 rounded-lg transition-colors">Rechazar</button>
            <button className="px-4 py-2 text-sm font-semibold text-white bg-primary hover:bg-primary-600 rounded-lg transition-colors">Aprobar Aumento</button>
          </div>
        </div>
      ))}
    </div>
  );
}

// --- Vista Principal ---
export default function SolicitudesPage() {
  const [activeTab, setActiveTab] = useState<TabName>("aperturas");

  return (
    <div className="max-w-5xl mx-auto">
      <PageHeader 
        title="Bandeja de Autorizaciones" 
        description="Evalúa y autoriza los procesos críticos solicitados por las sucursales."
      />

      {/* Tabs Nav */}
      <div className="flex space-x-1 border-b border-slate-200 mb-6 overflow-x-auto">
        <button 
          onClick={() => setActiveTab("aperturas")}
          className={`px-4 py-3 text-sm font-semibold border-b-2 whitespace-nowrap transition-colors ${activeTab === "aperturas" ? "border-primary text-primary" : "border-transparent text-slate-500 hover:text-slate-700"}`}
        >
          Aperturas (Distribuidoras)
          <span className="ml-2 bg-red-100 text-red-600 py-0.5 px-2 rounded-full text-[10px]">1</span>
        </button>
        <button 
          onClick={() => setActiveTab("aumentos")}
          className={`px-4 py-3 text-sm font-semibold border-b-2 whitespace-nowrap transition-colors ${activeTab === "aumentos" ? "border-primary text-primary" : "border-transparent text-slate-500 hover:text-slate-700"}`}
        >
          Aumentos de Crédito
          <span className="ml-2 bg-slate-100 text-slate-600 py-0.5 px-2 rounded-full text-[10px]">1</span>
        </button>
        <button 
          onClick={() => setActiveTab("transferencias")}
          className={`px-4 py-3 text-sm font-semibold border-b-2 whitespace-nowrap transition-colors ${activeTab === "transferencias" ? "border-primary text-primary" : "border-transparent text-slate-500 hover:text-slate-700"}`}
        >
          Transferencias de Clientes
        </button>
        <button 
          onClick={() => setActiveTab("operativas")}
          className={`px-4 py-3 text-sm font-semibold border-b-2 whitespace-nowrap transition-colors ${activeTab === "operativas" ? "border-primary text-primary" : "border-transparent text-slate-500 hover:text-slate-700"}`}
        >
          Operativas (Cajeras)
        </button>
      </div>

      {/* Tab Content */}
      <div className="animate-fadeInUp">
        {activeTab === "aperturas" && <AperturasTab />}
        {activeTab === "aumentos" && <AumentosTab />}
        {activeTab === "transferencias" && (
          <div className="text-center py-12 bg-white rounded-xl border border-dashed border-slate-300">
            <p className="text-slate-500">No hay transferencias pendientes de autorización final.</p>
          </div>
        )}
        {activeTab === "operativas" && (
          <div className="text-center py-12 bg-white rounded-xl border border-dashed border-slate-300">
            <p className="text-slate-500">No hay solicitudes de conciliación manual ni cambios de datos.</p>
          </div>
        )}
      </div>
    </div>
  );
}
