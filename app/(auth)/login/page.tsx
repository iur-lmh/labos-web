import type { Metadata } from "next";
import Link from "next/link";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Activity, ArrowLeft, Database, FlaskConical, ShieldCheck } from "lucide-react";

import { LoginForm } from "@/app/(auth)/login/login-form";
import { Logo } from "@/components/shared/logo";

export const metadata: Metadata = {
  title: "Acceso institucional",
  description:
    "Acceso al portal de profesionales, investigadores y pacientes del Laboratorio de Movimiento Humano.",
};

const features = [
  {
    icon: Activity,
    title: "Historia biomecánica",
    text: "Evaluaciones, curvas y archivos en una sola línea de tiempo.",
  },
  {
    icon: FlaskConical,
    title: "Mesa de investigación",
    text: "Filtros y exportaciones seudonimizadas listas para analizar.",
  },
  {
    icon: Database,
    title: "Datos trazables",
    text: "Cada archivo con hash, dispositivo y protocolo asociado.",
  },
];

export default async function LoginPage() {
  const token = (await cookies()).get("labos_token")?.value;
  if (token) redirect("/profesionales");

  return (
    <div className="grid min-h-screen lg:grid-cols-[1.05fr_1fr]">
      <aside className="relative hidden overflow-hidden bg-clinical-950 p-12 text-white lg:flex lg:flex-col lg:justify-between">
        <div className="dot-pattern pointer-events-none absolute inset-0 opacity-20" />
        <div className="pointer-events-none absolute -right-32 top-1/4 size-[420px] rounded-full bg-clinical-700/30 blur-3xl" />

        <div className="relative">
          <Logo inverted />
        </div>

        <div className="relative max-w-md">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-clinical-300">
            Plataforma LabOS
          </p>
          <h1 className="mt-4 text-balance font-display text-4xl font-semibold leading-tight tracking-tight">
            La evidencia clínica empieza por un dato bien cuidado.
          </h1>
          <p className="mt-4 text-sm leading-7 text-white/60">
            Accedé a las evaluaciones del laboratorio, revisá resultados y prepará
            datasets para investigación con controles de privacidad desde el origen.
          </p>

          <div className="mt-8 space-y-4">
            {features.map((feature) => (
              <div key={feature.title} className="flex gap-3">
                <span className="flex size-8 shrink-0 items-center justify-center rounded-md border border-white/15 bg-white/5">
                  <feature.icon className="size-4 text-clinical-300" />
                </span>
                <div>
                  <p className="text-xs font-medium">{feature.title}</p>
                  <p className="mt-0.5 text-[11px] leading-5 text-white/45">
                    {feature.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="relative flex items-center justify-between text-[10px] text-white/35">
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="size-3.5" />
            RBAC · JWT · Argon2
          </span>
          <span>IUR · UCASAL · 2026</span>
        </div>
      </aside>

      <main className="flex flex-col">
        <div className="flex h-16 items-center justify-between border-b px-5 lg:hidden">
          <Logo />
          <Link
            href="/"
            className="flex items-center gap-1.5 text-xs text-muted-foreground"
          >
            <ArrowLeft className="size-3.5" />
            Volver
          </Link>
        </div>

        <div className="flex flex-1 items-center justify-center px-5 py-12 sm:px-10">
          <div className="w-full max-w-[400px]">
            <div className="mb-8">
              <p className="eyebrow">Acceso institucional</p>
              <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight">
                Bienvenido de nuevo.
              </h2>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                Ingresá con las credenciales asignadas por el laboratorio. Si todavía no
                tenés acceso, contactá a coordinación.
              </p>
            </div>

            <LoginForm />

            <div className="mt-8 flex items-center justify-between border-t pt-5 text-[11px] text-muted-foreground">
              <Link href="/" className="hover:text-foreground">
                ← Volver al hub público
              </Link>
              <a
                href="mailto:laboratoriodemovimientoucasal@ucasal.edu.ar"
                className="hover:text-foreground"
              >
                Solicitar acceso
              </a>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
