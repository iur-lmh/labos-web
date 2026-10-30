import Link from "next/link";
import {
  Activity,
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  Database,
  FileText,
  FlaskConical,
  Gauge,
  Layers,
  LineChart,
  Lock,
  Microscope,
  ShieldCheck,
  Sparkles,
  Users,
  Waves,
  Workflow,
} from "lucide-react";

import { ForceCurveChart } from "@/components/biomechanics/force-curve-chart";
import { MetricTile } from "@/components/biomechanics/metric-tile";
import { ProtocolBadge } from "@/components/biomechanics/protocol-badge";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { demoPublicaciones, demoResumen } from "@/lib/demo-data";
import { formatDate } from "@/lib/utils";

const capabilities = [
  {
    icon: Users,
    title: "Historia biomecánica",
    description:
      "Cada paciente con sus evaluaciones, dispositivos, archivos y métricas en una línea de tiempo trazable.",
    detail: "Pacientes · Sesiones · Adjuntos",
  },
  {
    icon: Database,
    title: "Data lake unificado",
    description:
      "Exportaciones de Biobit, mDurance, C3D y CSV normalizadas en un modelo de datos común y versionado.",
    detail: "JSONB · Parquet · CSV",
  },
  {
    icon: FlaskConical,
    title: "Mesa de I+D",
    description:
      "Filtros por protocolo y dispositivo, agregados listos para analizar y exportaciones seudonimizadas.",
    detail: "R · Python · Estadística",
  },
];

const architecture = [
  {
    step: "01",
    icon: Waves,
    title: "Captura",
    text: "Plataformas de fuerza, IMUs, video y EMG.",
  },
  {
    step: "02",
    icon: Workflow,
    title: "Ingestión",
    text: "Parsing, normalización y hash SHA-256.",
  },
  {
    step: "03",
    icon: Database,
    title: "Persistencia",
    text: "PostgreSQL 16 + object storage S3.",
  },
  {
    step: "04",
    icon: LineChart,
    title: "Investigación",
    text: "Datasets anonimizados y reproducibles.",
  },
];

const researchLines = [
  {
    icon: Activity,
    title: "Rendimiento y asimetrías",
    text: "Salto vertical, fuerza y desequilibrios en deportistas universitarios.",
    protocols: ["salto_vertical", "fuerza"],
  },
  {
    icon: Gauge,
    title: "Rehabilitación funcional",
    text: "Marcha, equilibrio y movilidad como marcadores de evolución clínica.",
    protocols: ["marcha", "equilibrio"],
  },
  {
    icon: Microscope,
    title: "Calidad de datos",
    text: "Protocolos de captura, diccionarios y reproducibilidad entre dispositivos.",
    protocols: ["emg", "movilidad"],
  },
];

export default function HomePage() {
  return (
    <>
      <section className="relative overflow-hidden border-b">
        <div className="grid-pattern pointer-events-none absolute inset-0 opacity-70" />
        <div className="pointer-events-none absolute -right-32 top-10 size-[520px] rounded-full bg-clinical-100/60 blur-3xl" />
        <div className="container relative grid items-center gap-14 py-16 lg:grid-cols-[1.02fr_0.98fr] lg:py-24">
          <div className="animate-fade-up">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border bg-background/80 px-3 py-1.5 text-xs text-muted-foreground backdrop-blur">
              <span className="size-1.5 rounded-full bg-accent" />
              Laboratorio de Movimiento Humano · IUR / UCASAL
            </div>

            <h1 className="max-w-2xl text-balance font-display text-[42px] font-semibold leading-[1.05] tracking-tight text-foreground sm:text-6xl">
              Del laboratorio al <span className="text-primary">dato</span> que transforma
              la rehabilitación.
            </h1>

            <p className="mt-6 max-w-xl text-pretty text-[16px] leading-7 text-muted-foreground">
              Una plataforma abierta para ordenar la historia biomecánica, conectar
              dispositivos heterogéneos y convertir cada sesión en evidencia clínica y
              científica.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Button asChild size="lg">
                <Link href="/login">
                  Ingresar a la plataforma
                  <ArrowRight />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/publicaciones">
                  Explorar investigación
                  <ArrowUpRight />
                </Link>
              </Button>
            </div>

            <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-xs text-muted-foreground">
              {["Open source", "PostgreSQL + JSONB", "Datos seudonimizados"].map(
                (item) => (
                  <li key={item} className="flex items-center gap-1.5">
                    <CheckCircle2 className="size-3.5 text-accent" />
                    {item}
                  </li>
                ),
              )}
            </ul>
          </div>

          <div className="relative animate-fade-up [animation-delay:120ms]">
            <Card className="overflow-hidden border-clinical-200/80 shadow-[0_24px_80px_-32px_rgba(15,87,110,0.35)]">
              <CardHeader className="flex-row items-start justify-between space-y-0 border-b bg-gradient-to-br from-clinical-50 to-background pb-4">
                <div>
                  <p className="eyebrow">Evaluación biomecánica</p>
                  <CardTitle className="mt-2 text-lg">
                    Salto con contramovimiento
                  </CardTitle>
                  <CardDescription className="mt-1">
                    Curva fuerza-tiempo · Biobit
                  </CardDescription>
                </div>
                <Badge variant="success">Procesada</Badge>
              </CardHeader>

              <CardContent className="pt-5">
                <div className="mb-3 flex items-center justify-between">
                  <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
                    Fuerza vertical
                  </span>
                  <span className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
                    <span className="size-1.5 rounded-full bg-emerald-500" />1 kHz · 450
                    muestras
                  </span>
                </div>
                <ForceCurveChart height={236} />

                <div className="mt-4 grid grid-cols-3 gap-2">
                  <MetricTile label="Altura" value="34,2" unit="cm" />
                  <MetricTile label="T. vuelo" value="512" unit="ms" />
                  <MetricTile label="Asimetría" value="4,1" unit="%" />
                </div>
              </CardContent>

              <div className="flex items-center justify-between border-t bg-muted/30 px-5 py-3 text-[11px] text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="size-3.5 text-accent" />
                  Datos sintéticos de demostración
                </span>
                <span className="font-mono">SHA-256 ✓</span>
              </div>
            </Card>

            <div className="absolute -bottom-4 right-5 z-10 hidden items-center gap-2 rounded-lg border bg-background px-3 py-2 shadow-sm sm:flex">
              <Lock className="size-3.5 text-accent" />
              <span className="text-[11px] font-medium">Acceso por roles</span>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b bg-background">
        <div className="container grid grid-cols-2 divide-x divide-border py-8 lg:grid-cols-4">
          {[
            {
              value: "4",
              label: "protocolos priorizados",
              detail: "salto · fuerza · marcha · EMG",
            },
            {
              value: "3",
              label: "dispositivos integrados",
              detail: "Biobit · mDurance · C3D",
            },
            { value: "100%", label: "trazabilidad de archivos", detail: "URL + SHA-256" },
            {
              value: "0 $",
              label: "costo de infraestructura",
              detail: "free tiers + open source",
            },
          ].map((stat) => (
            <div key={stat.label} className="px-5 first:pl-0 last:pr-0">
              <p className="font-display text-3xl font-semibold tracking-tight text-primary">
                {stat.value}
              </p>
              <p className="mt-1 text-xs font-medium text-foreground">{stat.label}</p>
              <p className="mt-0.5 font-mono text-[10px] uppercase tracking-wide text-muted-foreground">
                {stat.detail}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-20">
        <div className="container">
          <div className="max-w-2xl">
            <p className="eyebrow">Qué resuelve</p>
            <h2 className="mt-3 text-balance font-display text-4xl font-semibold tracking-tight">
              Menos planillas dispersas. Más decisiones fundamentadas.
            </h2>
            <p className="mt-4 text-[15px] leading-7 text-muted-foreground">
              El laboratorio produce datos valiosos que hoy viven en exportaciones
              sueltas. LabOS los ordena sin sacrificar la flexibilidad de cada
              dispositivo.
            </p>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {capabilities.map((capability) => (
              <Card
                key={capability.title}
                className="group relative overflow-hidden transition-shadow hover:shadow-[0_18px_50px_-24px_rgba(15,87,110,0.35)]"
              >
                <CardHeader>
                  <span className="mb-2 flex size-10 items-center justify-center rounded-lg bg-secondary text-primary">
                    <capability.icon className="size-5" />
                  </span>
                  <CardTitle>{capability.title}</CardTitle>
                  <CardDescription className="leading-6">
                    {capability.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="border-t pt-3 font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
                    {capability.detail}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y bg-clinical-950 py-20 text-white">
        <div className="container">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-clinical-300">
                Arquitectura
              </p>
              <h2 className="mt-3 text-balance font-display text-4xl font-semibold tracking-tight">
                Un flujo, cuatro fronteras claras.
              </h2>
              <p className="mt-4 max-w-md text-sm leading-7 text-white/60">
                La API es la única puerta de escritura. Los binarios viven en object
                storage. La investigación recibe datasets seudonimizados.
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {architecture.map((item) => (
                <div
                  key={item.step}
                  className="rounded-xl border border-white/10 bg-white/[0.04] p-5 transition-colors hover:bg-white/[0.07]"
                >
                  <div className="flex items-center justify-between">
                    <item.icon className="size-5 text-clinical-300" />
                    <span className="font-mono text-[10px] text-white/30">
                      {item.step}
                    </span>
                  </div>
                  <p className="mt-4 text-sm font-medium">{item.title}</p>
                  <p className="mt-1 text-xs leading-5 text-white/50">{item.text}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3 border-t border-white/10 pt-6 font-mono text-[10px] uppercase tracking-[0.16em] text-white/40">
            <span className="flex items-center gap-2">
              <Layers className="size-3.5" /> FastAPI · Next.js · PostgreSQL 16
            </span>
            <span className="flex items-center gap-2">
              <FileText className="size-3.5" /> C3D · CSV · MP4 · PDF
            </span>
            <span className="flex items-center gap-2">
              <Sparkles className="size-3.5" /> Despliegue con free tiers
            </span>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container">
          <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <div className="max-w-xl">
              <p className="eyebrow">Líneas de investigación</p>
              <h2 className="mt-3 font-display text-4xl font-semibold tracking-tight">
                Preguntas clínicas, datos trazables.
              </h2>
            </div>
            <Button asChild variant="outline">
              <Link href="/publicaciones">
                Ver producción
                <ArrowUpRight />
              </Link>
            </Button>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {researchLines.map((line) => (
              <Card key={line.title} className="flex flex-col">
                <CardHeader>
                  <line.icon className="size-5 text-accent" />
                  <CardTitle className="mt-3">{line.title}</CardTitle>
                  <CardDescription className="leading-6">{line.text}</CardDescription>
                </CardHeader>
                <CardContent className="mt-auto flex flex-wrap gap-1.5 pt-0">
                  {line.protocols.map((protocol) => (
                    <ProtocolBadge key={protocol} protocol={protocol} />
                  ))}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t bg-secondary/25 py-20">
        <div className="container grid gap-10 lg:grid-cols-[1fr_1.1fr]">
          <div>
            <p className="eyebrow">Producción reciente</p>
            <h2 className="mt-3 font-display text-4xl font-semibold tracking-tight">
              Investigación que vuelve al territorio.
            </h2>
            <p className="mt-4 max-w-md text-[15px] leading-7 text-muted-foreground">
              Pre-prints, artículos y datasets del laboratorio. Todo el material público
              se construye sobre datos seudonimizados y consentimiento informado.
            </p>
            <div className="mt-6 flex items-center gap-3 rounded-lg border bg-background px-4 py-3 text-xs text-muted-foreground">
              <ShieldCheck className="size-4 shrink-0 text-accent" />
              Contenido de demostración hasta la carga de producción real.
            </div>
          </div>

          <div className="space-y-3">
            {demoPublicaciones.slice(0, 3).map((publication) => (
              <Link
                key={publication.titulo}
                href="/publicaciones"
                className="group flex items-start justify-between gap-4 rounded-xl border bg-background p-5 transition-colors hover:border-clinical-300"
              >
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge variant="secondary">{publication.tipo}</Badge>
                    <span className="text-[11px] text-muted-foreground">
                      {publication.estado} · {publication.year}
                    </span>
                  </div>
                  <p className="mt-2 font-medium leading-6">{publication.titulo}</p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {publication.autores}
                  </p>
                </div>
                <ArrowUpRight className="mt-1 size-4 shrink-0 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container">
          <div className="relative overflow-hidden rounded-2xl border bg-gradient-to-br from-clinical-50 via-background to-secondary/40 px-6 py-12 sm:px-12">
            <div className="dot-pattern pointer-events-none absolute inset-y-0 right-0 w-1/2 opacity-60" />
            <div className="relative grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
              <div>
                <Badge variant="outline" className="border-clinical-300 bg-background">
                  Para el equipo del laboratorio
                </Badge>
                <h2 className="mt-4 max-w-xl text-balance font-display text-4xl font-semibold tracking-tight">
                  Una mesa de trabajo pensada para medir mejor.
                </h2>
                <p className="mt-3 max-w-lg text-sm leading-6 text-muted-foreground">
                  Cargá sesiones, revisá curvas, filtrá datos y exportá datasets sin salir
                  del navegador. Acceso con roles para profesionales, investigadores y
                  pacientes.
                </p>
              </div>
              <div className="flex flex-wrap gap-3 lg:justify-end">
                <Button asChild size="lg">
                  <Link href="/login">
                    Iniciar sesión
                    <ArrowRight />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <Link href="/equipo">Conocer el equipo</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t py-10">
        <div className="container flex flex-wrap items-center justify-between gap-4 text-xs text-muted-foreground">
          <p>
            Última actualización del resumen:{" "}
            <span className="font-medium text-foreground">
              {formatDate(demoResumen.generated_at, true)}
            </span>
          </p>
          <p className="font-mono text-[10px] uppercase tracking-[0.16em]">
            {demoResumen.totales.evaluaciones} evaluaciones ·{" "}
            {demoResumen.por_protocolo.length} protocolos
          </p>
        </div>
      </section>
    </>
  );
}
