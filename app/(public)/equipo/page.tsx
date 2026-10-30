import type { Metadata } from "next";
import {
  ArrowUpRight,
  ClipboardCheck,
  Database,
  HeartPulse,
  Microscope,
  ShieldCheck,
  Stethoscope,
  Users,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { demoEquipo } from "@/lib/demo-data";

export const metadata: Metadata = {
  title: "Equipo y líneas de trabajo",
  description:
    "Equipo interdisciplinario del Laboratorio de Movimiento Humano del IUR — UCASAL.",
};

const iconMap = {
  stethoscope: Stethoscope,
  clipboard: ClipboardCheck,
  database: Database,
  microscope: Microscope,
} as const;

const principles = [
  {
    icon: HeartPulse,
    title: "Clínica primero",
    text: "Cada decisión técnica se evalúa por su impacto real en la evaluación y el seguimiento de pacientes.",
  },
  {
    icon: ShieldCheck,
    title: "Privacidad por diseño",
    text: "Minimización de datos, roles estrictos y seudonimización antes de cualquier análisis.",
  },
  {
    icon: Users,
    title: "Trabajo interdisciplinario",
    text: "Kinesiología, medicina, ingeniería y ciencia de datos en un mismo flujo de trabajo.",
  },
];

export default function EquipoPage() {
  return (
    <>
      <section className="border-b bg-secondary/20">
        <div className="container py-16">
          <p className="eyebrow">Instituto Universitario de Rehabilitación</p>
          <h1 className="mt-3 max-w-3xl text-balance font-display text-5xl font-semibold tracking-tight">
            Un equipo que conecta movimiento, clínica y datos.
          </h1>
          <p className="mt-5 max-w-2xl text-[15px] leading-7 text-muted-foreground">
            El LMH articula docencia, asistencia e investigación en UCASAL. La plataforma
            es parte de su infraestructura científica y se desarrolla de forma abierta y
            colaborativa.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="container">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 className="font-display text-3xl font-semibold tracking-tight">
                Roles del laboratorio
              </h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Estructura funcional. Los nombres se incorporan cuando el laboratorio
                publique su equipo vigente.
              </p>
            </div>
            <Badge variant="outline" className="bg-background">
              Equipo interdisciplinario
            </Badge>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {demoEquipo.map((member) => {
              const Icon = iconMap[member.icono as keyof typeof iconMap] ?? Users;
              return (
                <Card key={member.rol} className="group">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <span className="flex size-11 items-center justify-center rounded-lg bg-secondary text-primary">
                        <Icon className="size-5" />
                      </span>
                      <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
                        {member.area}
                      </span>
                    </div>
                    <CardTitle className="mt-3">{member.rol}</CardTitle>
                    <CardDescription className="leading-6">
                      {member.descripcion}
                    </CardDescription>
                  </CardHeader>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      <section className="border-y bg-clinical-950 py-16 text-white">
        <div className="container grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-clinical-300">
              Cómo trabajamos
            </p>
            <h2 className="mt-3 text-balance font-display text-4xl font-semibold tracking-tight">
              Rigor científico sin perder humanidad.
            </h2>
            <p className="mt-4 max-w-md text-sm leading-7 text-white/60">
              La tecnología es un medio: el objetivo es comprender mejor el movimiento
              para mejorar la rehabilitación de las personas.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-3">
            {principles.map((principle) => (
              <div
                key={principle.title}
                className="rounded-xl border border-white/10 bg-white/[0.04] p-5"
              >
                <principle.icon className="size-5 text-clinical-300" />
                <p className="mt-4 text-sm font-medium">{principle.title}</p>
                <p className="mt-2 text-xs leading-5 text-white/50">{principle.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container grid gap-8 lg:grid-cols-[1fr_1fr] lg:items-center">
          <div>
            <p className="eyebrow">Articulación</p>
            <h2 className="mt-3 font-display text-4xl font-semibold tracking-tight">
              Abiertos a colaborar.
            </h2>
            <p className="mt-4 max-w-lg text-[15px] leading-7 text-muted-foreground">
              Si trabajás en rehabilitación, ciencias del movimiento, ingeniería de datos
              o querés desarrollar una práctica en el laboratorio, escribinos. También
              recibimos propuestas de investigación y tesinas.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button asChild>
                <a href="mailto:laboratoriodemovimientoucasal@ucasal.edu.ar">
                  Contactar al LMH
                  <ArrowUpRight />
                </a>
              </Button>
              <Button asChild variant="outline">
                <a
                  href="https://www.ucasal.edu.ar/laboratorio-de-movimiento-humano"
                  target="_blank"
                  rel="noreferrer"
                >
                  Sitio institucional
                  <ArrowUpRight />
                </a>
              </Button>
            </div>
          </div>

          <Card className="bg-secondary/30">
            <CardHeader>
              <CardTitle className="text-base">Datos institucionales</CardTitle>
              <CardDescription>
                Información pública del Laboratorio de Movimiento Humano.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 text-sm">
              <div className="flex justify-between gap-4 border-b pb-3">
                <span className="text-muted-foreground">Institución</span>
                <span className="text-right font-medium">
                  IUR · Universidad Católica de Salta
                </span>
              </div>
              <div className="flex justify-between gap-4 border-b pb-3">
                <span className="text-muted-foreground">Ubicación</span>
                <span className="text-right font-medium">Salta, Argentina</span>
              </div>
              <div className="flex justify-between gap-4 border-b pb-3">
                <span className="text-muted-foreground">Correo</span>
                <a
                  href="mailto:laboratoriodemovimientoucasal@ucasal.edu.ar"
                  className="text-right text-primary hover:underline"
                >
                  laboratoriodemovimientoucasal@ucasal.edu.ar
                </a>
              </div>
              <div className="flex justify-between gap-4">
                <span className="text-muted-foreground">Plataforma</span>
                <span className="text-right font-medium">LabOS · Fase 0</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </>
  );
}
