"use client";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { relacionDonutData } from "@/app/_lib/mock-data";

const total = relacionDonutData.reduce((sum, d) => sum + d.value, 0);

export default function RelationsDonutChart() {
  return (
    <div className="card h-full">
      <div className="card-header">
        <div>
          <h3 className="font-bold text-slate-800 text-sm">Distribución de Relaciones</h3>
          <p className="text-xs text-slate-400 mt-0.5">Estado actual de estados de cuenta</p>
        </div>
      </div>
      <div className="card-body flex flex-col">
        <div className="relative">
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie
                data={relacionDonutData}
                cx="50%"
                cy="50%"
                innerRadius={65}
                outerRadius={95}
                paddingAngle={3}
                dataKey="value"
              >
                {relacionDonutData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                formatter={(value: any, name: any) => [
                  `${(value as number).toLocaleString("es-MX")} (${(((value as number) / total) * 100).toFixed(1)}%)`,
                  name as string,
                ]}
                contentStyle={{ borderRadius: 10, border: "1px solid #e2e8f0", boxShadow: "0 4px 12px rgba(0,0,0,0.08)" }}
              />
            </PieChart>
          </ResponsiveContainer>
          {/* Centro del donut */}
          <div
            className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none"
            style={{ top: 0 }}
          >
            <p className="text-2xl font-black text-slate-800">{total.toLocaleString("es-MX")}</p>
            <p className="text-xs text-slate-400 font-medium">Total</p>
          </div>
        </div>

        {/* Leyenda personalizada */}
        <div className="grid grid-cols-2 gap-2 mt-2">
          {relacionDonutData.map((d) => (
            <div key={d.name} className="flex items-center gap-2 p-2.5 rounded-lg" style={{ background: "#f8fafc" }}>
              <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ background: d.color }} />
              <div className="min-w-0">
                <p className="text-xs font-semibold text-slate-700 truncate">{d.name}</p>
                <p className="text-[10px] text-slate-400">
                  {d.value.toLocaleString("es-MX")} · {((d.value / total) * 100).toFixed(1)}%
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
