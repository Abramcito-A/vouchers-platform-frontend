export default function DistribuidorasLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // Fondo oscuro en computadoras para resaltar el celular
    <div className="min-h-screen bg-slate-900 flex justify-center items-center font-sans antialiased">
      {/* Contenedor que simula la pantalla del celular */}
      <div className="w-full max-w-md min-h-screen bg-white shadow-2xl relative overflow-x-hidden">
        {children}
      </div>
    </div>
  );
}