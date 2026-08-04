import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "MIS VALES — Sistema de Administración",
  description:
    "Plataforma web para la administración de distribuidoras que otorgan vales (créditos) a clientes. Panel de control del Gerente General.",
  keywords: ["vales", "crédito", "distribuidoras", "administración", "finanzas"],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full">{children}</body>
    </html>
  );
}
