import type { Metadata, Viewport } from "next";

import "./globals.css";

const appName = process.env.NEXT_PUBLIC_APP_NAME ?? "LabOS LMH";

export const metadata: Metadata = {
  title: {
    default: `${appName} · Laboratorio de Movimiento Humano`,
    template: `%s · ${appName}`,
  },
  description:
    "Plataforma de gestión biomecánica e investigación del Laboratorio de Movimiento Humano del Instituto Universitario de Rehabilitación (UCASAL).",
  applicationName: appName,
  authors: [{ name: "IUR · Laboratorio de Movimiento Humano" }],
  keywords: [
    "biomecánica",
    "rehabilitación",
    "laboratorio de movimiento humano",
    "UCASAL",
    "IUR",
    "datos clínicos",
  ],
  robots: { index: true, follow: true },
  openGraph: {
    title: `${appName} · Laboratorio de Movimiento Humano`,
    description:
      "Historia biomecánica, datos abiertos para investigación y una mesa de trabajo para el laboratorio.",
    locale: "es_AR",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#15576e",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es">
      <body className="min-h-screen font-sans">{children}</body>
    </html>
  );
}
