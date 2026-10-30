import type { Metadata } from "next";
import {
  Activity,
  CalendarDays,
  HeartPulse,
  LineChart as LineChartIcon,
  Microscope,
  ShieldCheck,
  Stethoscope,
} from "lucide-react";

import { ForceCurveChart } from "@/components/biomechanics/force-curve-chart";
import { MetricTile } from "@/components/biomechanics/metric-tile";
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
import { serverApiFetch } from "@/lib/api-server";
import { demoEvaluaciones } from "@/lib/demo-data";
import type { Evaluacion, Paginated } from "@/lib/types";
import { curveFromEvaluation } from "@/lib/curves";
import { formatDate, protocolLabel } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Mi evolución",
};

export const dynamic = "force-dynamic";

export default async function PacientePortalPage() {
  const response = await serverApiFetch<Paginated<Evaluacion>>("/evaluaciones?limit=50");
  const demoMode = response === null;
  const evaluaciones = demoMode
    ? demoEvaluaciones.filter((item) => item.paciente_id === "demo-pac-001")
    : (response?.items ?? []);
  const latest = evaluaciones[0];
  const curve = curveFromEvaluation(latest);
  const protocols = new Set(evaluaciones.map((item) => item.tipo_protocolo));
  const devices = new Set(evaluaciones.map((item) => item.dispositivo_origen));
  const metrics = Object.entries(latest?.datos_raw.metricas ?? {}).slice(0, 4);

  return (
    <div className="mx-auto max-w-6xl">
      <PageHeader
        eyebrow="Portal de pacientes"
        title="Mi evolución"
        description="Tus evaluaciones biomecánicas, explicadas de forma simple y con tus datos protegidos."
        actions={
          <Badge variant="outline" className="bg-background">
            <ShieldCheck className="mr-1 size-3.5 text-accent" />
            Acceso personal
          </Badge>
        }
      />

      {demoMode && <DemoBanner />}

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <MetricCard
          label="Evaluaciones"
          value={evaluaciones.length}
          hint="Sesiones registradas"
          icon={Activity}
          tone="accent"
        />
        <MetricCard
          label="Última sesión"
          value={latest ? formatDate(latest.fecha) : "—"}
          hint={latest?.dispositivo_origen ?? "Sin registros"}
          icon={CalendarDays}
        />
        <MetricCard
          label="Áreas evaluadas"
          value={protocols.size}
          hint="Protocolos distintos"
          icon={HeartPulse}
        />
        <MetricCard
          label="Dispositivos"
          value={devices.size}
          hint="Equipamiento utilizado"
          icon={Microscope}
          tone="amber"
        />
      </div>

      <div className="mt-6 grid gap-4 xl:grid-cols-[1.35fr_0.65fr]">
        <Card>
          <CardHeader className="flex-row items-start justify-between space-y-0">
            <div>
              <CardTitle className="text-base">Tu última evaluación</CardTitle>
              <CardDescription className="mt-1">
                {latest
                  ? `${protocolLabel(latest.tipo_protocolo)} · ${formatDate(latest.fecha, true)}`
                  : "Todavía no hay evaluaciones registradas"}
              </CardDescription>
            </div>
            {latest && <ProtocolBadge protocol={latest.tipo_protocolo} />}
          </CardHeader>
          <CardContent>
            {latest ? (
              <>
                <div className="rounded-lg border bg-secondary/20 p-2">
                  {curve ? (
                    <ForceCurveChart data={curve} height={250} />
                  ) : demoMode ? (
                    <ForceCurveChart height={250} />
                  ) : (
                    <div className="flex h-[250px] flex-col items-center justify-center px-6 text-center">
                      <LineChartIcon className="size-7 text-muted-foreground/50" />
                      <p className="mt-3 text-sm font-medium">
                        Tu curva estará disponible pronto
                      </p>
                      <p className="mt-1 max-w-sm text-xs leading-5 text-muted-foreground">
                        Las métricas de la sesión ya fueron registradas. El equipo del
                        laboratorio adjuntará la serie fuerza-tiempo.
                      </p>
                    </div>
                  )}
                </div>
                <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
                  {metrics.length > 0 ? (
                    metrics.map(([key, value]) => (
                      <MetricTile
                        key={key}
                        label={protocolLabel(key)}
                        value={
                          typeof value === "number"
                            ? value.toLocaleString("es-AR", {
                                maximumFractionDigits: 1,
                              })
                            : String(value)
                        }
                      />
                    ))
                  ) : (
                    <>
                      <MetricTile label="Altura" value="34,2" unit="cm" />
                      <MetricTile label="Tiempo de vuelo" value="512" unit="ms" />
                      <MetricTile label="Fuerza" value="1.820" unit="N" />
                      <MetricTile label="Asimetría" value="4,1" unit="%" />
                    </>
                  )}
                </div>
                {(curve || demoMode) && (
                  <p className="mt-3 text-[11px] leading-5 text-muted-foreground">
                    La curva muestra la fuerza que generás contra el suelo durante un
                    salto. Tu profesional interpreta estos valores junto con el contexto
                    clínico.
                  </p>
                )}
              </>
            ) : (
              <div className="flex h-56 items-center justify-center rounded-lg border border-dashed text-sm text-muted-foreground">
                Cuando se registre tu primera evaluación, vas a verla acá.
              </div>
            )}
          </CardContent>
        </Card>

        <div className="space-y-4">
          <Card className="border-accent/20 bg-accent/5">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2 text-sm font-medium">
                <ShieldCheck className="size-4 text-accent" />
                Tus datos están protegidos
              </div>
            </CardHeader>
            <CardContent className="space-y-3 text-xs leading-5 text-muted-foreground">
              <p>
                Solo vos y el equipo profesional autorizado pueden ver esta información.
                No se comparte con terceros sin tu consentimiento.
              </p>
              <p>
                Las investigaciones usan datos seudonimizados: tu nombre no aparece en los
                datasets.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">¿Dudas sobre tus resultados?</CardTitle>
              <CardDescription>Coordiná una consulta con el laboratorio.</CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild variant="outline" className="w-full">
                <a href="mailto:laboratoriodemovimientoucasal@ucasal.edu.ar">
                  <Stethoscope />
                  Contactar al equipo
                </a>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="mt-6">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="font-display text-2xl font-semibold tracking-tight">
            Línea de tiempo
          </h2>
          <span className="text-xs text-muted-foreground">
            {evaluaciones.length} {evaluaciones.length === 1 ? "sesión" : "sesiones"}
          </span>
        </div>

        <div className="space-y-3">
          {evaluaciones.map((evaluacion, index) => (
            <div
              key={evaluacion.id}
              className="surface flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="flex items-start gap-4">
                <div className="flex flex-col items-center">
                  <span className="flex size-9 items-center justify-center rounded-full bg-secondary text-xs font-semibold text-primary">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  {index < evaluaciones.length - 1 && (
                    <span className="mt-2 h-8 w-px bg-border" />
                  )}
                </div>
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <ProtocolBadge protocol={evaluacion.tipo_protocolo} />
                    <span className="text-xs text-muted-foreground">
                      {evaluacion.dispositivo_origen}
                    </span>
                  </div>
                  <p className="mt-2 text-sm font-medium">
                    {protocolLabel(evaluacion.tipo_protocolo)}
                  </p>
                  <p className="mt-0.5 text-xs text-muted-foreground">
                    {formatDate(evaluacion.fecha, true)}
                  </p>
                  <p className="mt-1 text-[11px] text-muted-foreground">
                    {Object.keys(evaluacion.datos_raw.metricas ?? {}).length} variables
                    registradas
                  </p>
                </div>
              </div>
              <Badge variant="muted">Registrada</Badge>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
