import Link from "next/link";
import {
  ArrowUpRight,
  Database,
  FlaskConical,
  Plus,
  Users,
  Activity,
  CalendarClock,
  ChevronRight,
} from "lucide-react";

import { ProtocolDistributionChart } from "@/components/biomechanics/protocol-distribution-chart";
import { ProtocolBadge } from "@/components/biomechanics/protocol-badge";
import { MetricCard } from "@/components/shared/metric-card";
import { DemoBanner, PageHeader } from "@/components/shared/page-header";
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
import { demoEvaluaciones, demoPacientes, demoResumen } from "@/lib/demo-data";
import type { Evaluacion, Paciente, Paginated, ResumenInvestigacion } from "@/lib/types";
import { formatDate, formatBytes, initials, protocolLabel } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default async function ProfesionalesPage() {
  const [resumen, evaluaciones, pacientes] = await Promise.all([
    serverApiFetch<ResumenInvestigacion>("/investigaciones/resumen"),
    serverApiFetch<Paginated<Evaluacion>>("/evaluaciones?limit=6"),
    serverApiFetch<Paginated<Paciente>>("/pacientes?limit=200"),
  ]);

  const demoMode = resumen === null;
  const data = resumen ?? demoResumen;
  const recent = demoMode ? demoEvaluaciones.slice(0, 5) : (evaluaciones?.items ?? []);
  const patientList = demoMode ? demoPacientes : (pacientes?.items ?? []);
  const patientMap = new Map(patientList.map((patient) => [patient.id, patient]));
  const lastEvaluation = data.ultima_evaluacion;

  return (
    <div className="mx-auto max-w-7xl">
      <PageHeader
        eyebrow="Panel de profesionales"
        title="Resumen del laboratorio"
        description="Estado de la actividad clínica, últimos registros y distribución de protocolos."
        actions={
          <>
            <Button asChild variant="outline">
              <Link href="/profesionales/investigacion">
                Mesa de I+D
                <ArrowUpRight />
              </Link>
            </Button>
            <Button asChild>
              <Link href="/profesionales/pacientes">
                <Plus />
                Nueva evaluación
              </Link>
            </Button>
          </>
        }
      />

      {demoMode && <DemoBanner />}

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <MetricCard
          label="Pacientes registrados"
          value={data.totales.pacientes}
          hint="Historia biomecánica activa"
          icon={Users}
        />
        <MetricCard
          label="Evaluaciones"
          value={data.totales.evaluaciones}
          hint={`Última: ${lastEvaluation ? formatDate(lastEvaluation) : "sin registros"}`}
          icon={Activity}
          tone="accent"
        />
        <MetricCard
          label="Archivos adjuntos"
          value={data.totales.archivos}
          hint={`${formatBytes(data.totales.bytes_almacenados)} en storage`}
          icon={Database}
          tone="amber"
        />
        <MetricCard
          label="Protocolos en uso"
          value={data.por_protocolo.length}
          hint="Salto, marcha, fuerza, EMG…"
          icon={FlaskConical}
        />
      </div>

      <div className="mt-6 grid gap-4 xl:grid-cols-[1.35fr_0.65fr] xl:items-start">
        <Card>
          <CardHeader className="flex-row items-start justify-between space-y-0">
            <div>
              <CardTitle className="text-base">Últimas evaluaciones</CardTitle>
              <CardDescription className="mt-1">
                Registros recientes del laboratorio
              </CardDescription>
            </div>
            <Button asChild variant="ghost" size="sm">
              <Link href="/profesionales/pacientes">
                Ver pacientes
                <ChevronRight />
              </Link>
            </Button>
          </CardHeader>
          <CardContent className="px-0 pb-2">
            {recent.length === 0 ? (
              <div className="px-5 py-12 text-center">
                <CalendarClock className="mx-auto size-8 text-muted-foreground/50" />
                <p className="mt-3 text-sm font-medium">Todavía no hay evaluaciones</p>
                <p className="mt-1 text-xs text-muted-foreground">
                  Cargá la primera sesión desde la API o la ficha de un paciente.
                </p>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Paciente</TableHead>
                    <TableHead>Protocolo</TableHead>
                    <TableHead className="hidden sm:table-cell">Dispositivo</TableHead>
                    <TableHead className="text-right">Fecha</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recent.map((evaluacion) => {
                    const patient = patientMap.get(evaluacion.paciente_id);
                    return (
                      <TableRow key={evaluacion.id}>
                        <TableCell>
                          <div className="flex items-center gap-2.5">
                            <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-secondary text-[10px] font-semibold text-secondary-foreground">
                              {patient
                                ? initials(`${patient.nombre} ${patient.apellido}`)
                                : "—"}
                            </span>
                            <div className="min-w-0">
                              <p className="truncate text-sm font-medium">
                                {patient
                                  ? `${patient.nombre} ${patient.apellido}`
                                  : "Paciente"}
                              </p>
                              <p className="truncate font-mono text-[10px] text-muted-foreground">
                                {patient?.dni_anonimizado ??
                                  evaluacion.paciente_id.slice(0, 8)}
                              </p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <ProtocolBadge protocol={evaluacion.tipo_protocolo} />
                        </TableCell>
                        <TableCell className="hidden text-xs text-muted-foreground sm:table-cell">
                          {evaluacion.dispositivo_origen}
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

        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Distribución por protocolo</CardTitle>
              <CardDescription>Evaluaciones acumuladas</CardDescription>
            </CardHeader>
            <CardContent>
              <ProtocolDistributionChart data={data.por_protocolo} height={220} />
            </CardContent>
          </Card>

          <Card className="bg-clinical-950 text-white">
            <CardHeader>
              <div className="flex items-center justify-between">
                <FlaskConical className="size-5 text-clinical-300" />
                <Badge className="border-white/15 bg-white/10 text-white">I+D</Badge>
              </div>
              <CardTitle className="mt-3 text-base text-white">
                Preparar un dataset
              </CardTitle>
              <CardDescription className="text-white/60">
                Filtrá por protocolo y dispositivo, y exportá datos seudonimizados.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild variant="secondary" className="w-full">
                <Link href="/profesionales/investigacion">
                  Abrir mesa de trabajo
                  <ArrowUpRight />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-3">
        {[
          {
            title: "Pacientes",
            description: "Buscá una historia y revisá sus evaluaciones.",
            href: "/profesionales/pacientes",
            icon: Users,
          },
          {
            title: "Protocolos",
            description: "Salto, marcha, fuerza, EMG y movilidad.",
            href: "/profesionales/investigacion",
            icon: Activity,
          },
          {
            title: "Exportaciones",
            description: "Datasets anonimizados para R y Python.",
            href: "/profesionales/investigacion",
            icon: Database,
          },
        ].map((item) => (
          <Link
            key={item.title}
            href={item.href}
            className="surface group flex items-center gap-3 p-4 transition-colors hover:border-clinical-300"
          >
            <span className="flex size-9 items-center justify-center rounded-md bg-secondary text-primary">
              <item.icon className="size-4" />
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium">{item.title}</p>
              <p className="truncate text-xs text-muted-foreground">{item.description}</p>
            </div>
            <ChevronRight className="size-4 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
          </Link>
        ))}
      </div>

      <p className="mt-6 text-[11px] text-muted-foreground">
        Los protocolos activos son{" "}
        {data.por_protocolo.map((item) => protocolLabel(item.protocolo)).join(", ") ||
          "—"}
        . El acceso a datos identificables está restringido por rol.
      </p>
    </div>
  );
}
