"use client";
import {
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { loanChartData } from "@/app/_lib/mock-data";

const formatMoney = (value: number) =>
  new Intl.NumberFormat("es-MX", { style: "currency", currency: "MXN", maximumFractionDigits: 0 }).format(value);

export default function LoansBehaviorChart() {
  return (
    <div className="card h-full">
      <div className="card-header">
        <div>
          <h3 className="font-bold text-slate-800 text-sm">Comportamiento de Préstamos</h3>
          <p className="text-xs text-slate-400 mt-0.5">Comparativo mensual — Ene–Ago 2026</p>
        </div>
        <div className="flex items-center gap-2">
          <select
            id="loans-chart-period"
            className="text-xs border border-slate-200 rounded-lg px-2 py-1.5 bg-white text-slate-600 outline-none focus:border-blue-400"
          >
            <option>2026</option>
            <option>2025</option>
          </select>
        </div>
      </div>
      <div className="card-body">
        <ResponsiveContainer width="100%" height={280}>
          <ComposedChart data={loanChartData} margin={{ top: 4, right: 8, left: 8, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
            <XAxis
              dataKey="mes"
              tick={{ fontSize: 11, fill: "#94a3b8" }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`}
              tick={{ fontSize: 10, fill: "#94a3b8" }}
              axisLine={false}
              tickLine={false}
              width={48}
            />
            <Tooltip
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              formatter={(value: any, name: any) => [formatMoney(value as number), name as string]}
              contentStyle={{ borderRadius: 10, border: "1px solid #e2e8f0", boxShadow: "0 4px 12px rgba(0,0,0,0.08)" }}
              labelStyle={{ fontWeight: 700, color: "#0f172a" }}
            />
            <Legend
              wrapperStyle={{ fontSize: 11, paddingTop: 8 }}
              iconType="circle"
              iconSize={8}
            />
            <Bar dataKey="prestamos" name="Préstamos" fill="#BFDBFE" radius={[4, 4, 0, 0]} />
            <Bar dataKey="recuperado" name="Recuperado" fill="#0D47A1" radius={[4, 4, 0, 0]} />
            <Line
              type="monotone"
              dataKey="pendiente"
              name="Pendiente"
              stroke="#f59e0b"
              strokeWidth={2.5}
              dot={{ fill: "#f59e0b", r: 4 }}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
