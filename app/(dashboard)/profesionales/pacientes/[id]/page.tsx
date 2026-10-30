import Link from "next/link";
import {
  ArrowLeft,
  CalendarDays,
  CheckCircle2,
  FileSpreadsheet,
  FileText,
  Film,
  Fingerprint,
  LineChart,
  Package,
  ShieldCheck,
  ShieldQuestion,
  Stethoscope,
} from "lucide-react";
import type { Metadata } from "next";

import { ForceCurveChart } from "@/components/biomechanics/force-curve-chart";
import { MetricTile } from "@/components/biomechanics/metric-tile";
import { ProtocolBadge } from "@/components/biomechanics/protocol-badge";
import { DemoBanner } from "@/components/shared/page-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { serverApiFetch } from "@/lib/api-server";
import { demoArchivos, demoEvaluaciones, demoPacientes } from "@/lib/demo-data";
import type { ArchivoAdjunto, Evaluacion, Paciente, Paginated } from "@/lib/types";
import {
  ageFromBirthDate,
  formatBytes,
  formatDate,
  initials,
  protocolLabel,
} from "@/lib/utils";
import { curveFromEvaluation } from "@/lib/curves";

export const metadata: Metadata = {
  title: "Historia del paciente",
};

export const dynamic = "force-dynamic";

interface PageProps {
  params: Promise<{ id: string }>;
}

const fileIcon = (type: string) => {
  if (type === "c3d" || type === "mp4") return Film;
  if (type === "csv" || type === "json") return FileSpreadsheet;
  if (type === "pdf") return FileText;
  return Package;
};

export default async function PacienteDetailPage({ params }: PageProps) {
  const { id } = await params;
  const [pacienteReal, evaluacionesPage] = await Promise.all([
    serverApiFetch<Paciente>(`/pacientes/${id}`),
    serverApiFetch<Paginated<Evaluacion>>(`/evaluaciones?paciente_id=${id}&limit=50`),
  ]);

  const demoMode = pacienteReal === null || evaluacionesPage === null;
  const paciente =
    pacienteReal ?? demoPacientes.find((item) => item.id === id) ?? demoPacientes[0];
  const evaluaciones = demoMode
    ? demoEvaluaciones.filter((item) => item.paciente_id === paciente.id)
    : (evaluacionesPage?.items ?? []);
  const latest = evaluaciones[0];
  const curve = curveFromEvaluation(latest);

  let archivos: ArchivoAdjunto[] = [];
  if (demoMode) {
    archivos = demoArchivos;
  } else if (latest) {
    archivos =
      (await serverApiFetch<ArchivoAdjunto[]>(`/evaluaciones/${latest.id}/archivos`)) ??
      [];
  }

  const age = ageFromBirthDate(paciente.fecha_nacimiento);
  const metrics = Object.entries(latest?.datos_raw.metricas ?? {})
    .filter(([, value]) => typeof value === "number")
    .slice(0, 4);
  const metadata = Object.entries(paciente.metadata).filter(
    ([, value]) => typeof value === "string" || typeof value === "number",
  );
  const consent =
    typeof paciente.metadata.consentimiento === "string"
      ? paciente.metadata.consentimiento
      : null;

  return (
    <div className="mx-auto max-w-7xl">
      <nav className="mb-5 flex items-center gap-2 text-xs text-muted-foreground">
        <Link
          href="/profesionales/pacientes"
          className="inline-flex items-center gap-1.5 hover:text-foreground"
        >
          <ArrowLeft className="size-3.5" />
          Pacientes
        </Link>
        <span className="text-border">/</span>
        <span className="text-foreground">
          {paciente.nombre} {paciente.apellido}
        </span>
      </nav>

      {demoMode && <DemoBanner />}

      <div className="surface mb-6 flex flex-col gap-5 p-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <span className="flex size-14 items-center justify-center rounded-full bg-primary font-display text-lg font-semibold text-primary-foreground">
            {initials(`${paciente.nombre} ${paciente.apellido}`)}
          </span>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="font-display text-2xl font-semibold tracking-tight">
                {paciente.nombre} {paciente.apellido}
              </h1>
              {consent === "vigente" ? (
                <Badge variant="success">
                  <CheckCircle2 className="mr-1 size-3" />
                  Consentimiento vigente
                </Badge>
              ) : (
                <Badge variant="warning">
                  <ShieldQuestion className="mr-1 size-3" />
                  Revisar consentimiento
                </Badge>
              )}
            </div>
            <p className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
              <span>{age !== null ? `${age} años` : "Edad no registrada"}</span>
              <span className="text-border">·</span>
              <span className="inline-flex items-center gap-1 font-mono">
                <Fingerprint className="size-3" />
                {paciente.dni_anonimizado}
              </span>
              <span className="text-border">·</span>
              <span className="inline-flex items-center gap-1">
                <CalendarDays className="size-3" />
                Alta {formatDate(paciente.created_at)}
              </span>
            </p>
          </div>
        </div>

        <Button asChild variant="outline">
          <Link href="/profesionales/investigacion">Preparar exportación</Link>
        </Button>
      </div>

      <div className="grid gap-4 xl:grid-cols-[1.45fr_0.55fr]">
        <div className="space-y-4">
          <Card>
            <CardHeader className="flex-row items-start justify-between space-y-0">
              <div>
                <p className="eyebrow">Última evaluación</p>
                <CardTitle className="mt-2">
                  {latest ? protocolLabel(latest.tipo_protocolo) : "Sin evaluaciones"}
                </CardTitle>
                <CardDescription className="mt-1">
                  {latest
                    ? `${formatDate(latest.fecha, true)} · ${latest.dispositivo_origen}`
                    : "Registrá una sesión para visualizar la curva"}
                </CardDescription>
              </div>
              {latest && <ProtocolBadge protocol={latest.tipo_protocolo} />}
            </CardHeader>
            <CardContent>
              {latest ? (
                <>
                  <div className="mb-3 flex items-center justify-between">
                    <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
                      Curva fuerza-tiempo
                    </span>
                    <span className="text-[10px] text-muted-foreground">
                      {curve
                        ? "Serie normalizada"
                        : demoMode
                          ? "Serie de demostración"
                          : "Serie pendiente"}
                    </span>
                  </div>
                  {curve ? (
                    <ForceCurveChart data={curve} height={280} />
                  ) : demoMode ? (
                    <ForceCurveChart height={280} />
                  ) : (
                    <div className="flex h-[280px] flex-col items-center justify-center rounded-lg border border-dashed bg-secondary/20 px-6 text-center">
                      <LineChart className="size-7 text-muted-foreground/50" />
                      <p className="mt-3 text-sm font-medium">
                        Serie cruda pendiente de ingestión
                      </p>
                      <p className="mt-1 max-w-sm text-xs leading-5 text-muted-foreground">
                        Las métricas de esta evaluación ya están disponibles. La curva
                        fuerza-tiempo se mostrará cuando se adjunte el archivo C3D/CSV
                        correspondiente.
                      </p>
                    </div>
                  )}

                  <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
                    {metrics.length > 0 ? (
                      metrics.map(([key, value]) => (
                        <MetricTile
                          key={key}
                          label={protocolLabel(key)}
                          value={Number(value).toLocaleString("es-AR", {
                            maximumFractionDigits: 1,
                          })}
                        />
                      ))
                    ) : (
                      <>
                        <MetricTile label="Altura" value="34,2" unit="cm" />
                        <MetricTile label="T. vuelo" value="512" unit="ms" />
                        <MetricTile label="Pico fuerza" value="1.820" unit="N" />
                        <MetricTile label="Asimetría" value="4,1" unit="%" />
                      </>
                    )}
                  </div>
                </>
              ) : (
                <div className="flex h-56 items-center justify-center rounded-lg border border-dashed bg-muted/20 text-sm text-muted-foreground">
                  Aún no hay datos biomecánicos para este paciente.
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Historial de evaluaciones</CardTitle>
              <CardDescription>
                {evaluaciones.length}{" "}
                {evaluaciones.length === 1 ? "sesión registrada" : "sesiones registradas"}
              </CardDescription>
            </CardHeader>
            <CardContent className="px-0 pb-2">
              {evaluaciones.length === 0 ? (
                <p className="px-5 pb-4 text-sm text-muted-foreground">
                  Sin evaluaciones registradas.
                </p>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Protocolo</TableHead>
                      <TableHead className="hidden sm:table-cell">Dispositivo</TableHead>
                      <TableHead className="hidden md:table-cell">Métricas</TableHead>
                      <TableHead className="text-right">Fecha</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {evaluaciones.map((evaluacion) => {
                      const count = Object.keys(
                        evaluacion.datos_raw.metricas ?? {},
                      ).length;
                      return (
                        <TableRow key={evaluacion.id}>
                          <TableCell>
                            <ProtocolBadge protocol={evaluacion.tipo_protocolo} />
                          </TableCell>
                          <TableCell className="hidden text-xs text-muted-foreground sm:table-cell">
                            {evaluacion.dispositivo_origen}
                          </TableCell>
                          <TableCell className="hidden text-xs text-muted-foreground md:table-cell">
                            {count} variables
                          </TableCell>
                          <TableCell className="text-right text-xs text-muted-foreground">
                            {formatDate(evaluacion.fecha)}
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </div>

        <aside className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Ficha clínica</CardTitle>
              <CardDescription>Datos mínimos y contexto</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div className="flex items-center justify-between gap-3 border-b pb-3">
                <span className="text-muted-foreground">Nacimiento</span>
                <span className="font-medium">
                  {paciente.fecha_nacimiento
                    ? formatDate(paciente.fecha_nacimiento)
                    : "—"}
                </span>
              </div>
              {metadata.map(([key, value]) => (
                <div
                  key={key}
                  className="flex items-center justify-between gap-3 border-b pb-3 last:border-0 last:pb-0"
                >
                  <span className="capitalize text-muted-foreground">
                    {key.replaceAll("_", " ")}
                  </span>
                  <span className="text-right font-medium">{String(value)}</span>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Archivos de la sesión</CardTitle>
              <CardDescription>
                {archivos.length} adjuntos · integridad SHA-256
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              {archivos.length === 0 ? (
                <p className="text-sm text-muted-foreground">Sin archivos registrados.</p>
              ) : (
                archivos.map((archivo) => {
                  const Icon = fileIcon(archivo.tipo_archivo);
                  const downloadable = archivo.url_storage.startsWith("http");
                  return (
                    <a
                      key={archivo.id}
                      href={downloadable ? archivo.url_storage : undefined}
                      target={downloadable ? "_blank" : undefined}
                      rel="noreferrer"
                      className="flex items-center gap-3 rounded-lg border bg-secondary/20 p-3 transition-colors hover:bg-secondary/40"
                    >
                      <span className="flex size-8 shrink-0 items-center justify-center rounded-md bg-background text-primary">
                        <Icon className="size-4" />
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-xs font-medium">
                          {archivo.nombre_original ?? `Archivo ${archivo.tipo_archivo}`}
                        </p>
                        <p className="font-mono text-[10px] text-muted-foreground">
                          {archivo.tipo_archivo.toUpperCase()} ·{" "}
                          {formatBytes(archivo.tamano_bytes)}
                        </p>
                      </div>
                    </a>
                  );
                })
              )}
            </CardContent>
          </Card>

          <Card className="border-accent/20 bg-accent/5">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2 text-sm font-medium">
                <ShieldCheck className="size-4 text-accent" />
                Privacidad
              </div>
            </CardHeader>
            <CardContent className="space-y-2 text-xs leading-5 text-muted-foreground">
              <p>
                El identificador visible es un seudónimo. La correspondencia con datos
                personales se custodia fuera de la plataforma.
              </p>
              <p className="flex items-center gap-1.5">
                <Stethoscope className="size-3.5" />
                Uso clínico y de investigación según consentimiento.
              </p>
            </CardContent>
          </Card>
        </aside>
      </div>
    </div>
  );
}
