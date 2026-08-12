import React from "react";

export interface Column<T> {
  key: string;
  header: string;
  render?: (row: T) => React.ReactNode;
  align?: "left" | "center" | "right";
  width?: string;
}

interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  keyExtractor: (row: T) => string | number;
  emptyMessage?: string;
  isLoading?: boolean;
}

export default function DataTable<T>({ 
  data, 
  columns, 
  keyExtractor, 
  emptyMessage = "No hay registros para mostrar",
  isLoading = false
}: DataTableProps<T>) {
  return (
    <div className="card overflow-hidden">
      <div className="overflow-x-auto">
        <table className="data-table">
          <thead>
            <tr>
              {columns.map((col) => (
                <th 
                  key={col.key} 
                  style={{ 
                    textAlign: col.align || "left", 
                    width: col.width 
                  }}
                >
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={columns.length} className="text-center py-10 text-slate-400">
                  Cargando información...
                </td>
              </tr>
            ) : data.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="text-center py-10 text-slate-400">
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              data.map((row) => (
                <tr key={keyExtractor(row)}>
                  {columns.map((col) => (
                    <td 
                      key={col.key} 
                      style={{ textAlign: col.align || "left" }}
                    >
                      {col.render 
                        ? col.render(row) 
                        : (row as any)[col.key]
                      }
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
