import type { Metadata } from "next";
import {
  Database,
  FileText,
  FlaskConical,
  HardDrive,
  ShieldCheck,
  Users,
} from "lucide-react";

import { ProtocolDistributionChart } from "@/components/biomechanics/protocol-distribution-chart";
import { DatasetExport } from "@/components/shared/dataset-export";
import { MetricCard } from "@/components/shared/metric-card";
import { DemoBanner, PageHeader } from "@/components/shared/page-header";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { serverApiFetch } from "@/lib/api-server";
import { demoResumen } from "@/lib/demo-data";
import type { ResumenInvestigacion } from "@/lib/types";
import { formatBytes, formatDate, protocolLabel } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Mesa de investigación",
};

export const dynamic = "force-dynamic";

const governance = [
  "Seudonimización HMAC de cada sujeto antes de exportar.",
  "Sin nombre, apellido, DNI, email ni fecha de nacimiento.",
  "Hash SHA-256 y versión del pipeline en cada archivo.",
  "k-anonimato ≥ 5 para cualquier publicación de agregados.",
];

export default async function InvestigacionPage() {
  const resumen = await serverApiFetch<ResumenInvestigacion>("/investigaciones/resumen");
  const demoMode = resumen === null;
  const data = resumen ?? demoResumen;
  const maxDevice = Math.max(...data.por_dispositivo.map((item) => item.total), 1);

  return (
    <div className="mx-auto max-w-7xl">
      <PageHeader
        eyebrow="Mesa de trabajo I+D"
        title="Investigación y datasets"
        description="Explorá la actividad del laboratorio y exportá datos preparados para análisis en R o Python."
        actions={
          <Badge variant="outline" className="bg-background">
            <ShieldCheck className="mr-1 size-3.5 text-accent" />
            Exportación seudonimizada
          </Badge>
        }
      />

      {demoMode && <DemoBanner />}

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <MetricCard
          label="Pacientes"
          value={data.totales.pacientes}
          hint="Sujetos con historia activa"
          icon={Users}
        />
        <MetricCard
          label="Evaluaciones"
          value={data.totales.evaluaciones}
          hint={
            data.ultima_evaluacion
              ? `Última ${formatDate(data.ultima_evaluacion)}`
              : "Sin registros"
          }
          icon={FlaskConical}
          tone="accent"
        />
        <MetricCard
          label="Archivos"
          value={data.totales.archivos}
          hint={`${formatBytes(data.totales.bytes_almacenados)} almacenados`}
          icon={HardDrive}
          tone="amber"
        />
        <MetricCard
          label="Protocolos"
          value={data.por_protocolo.length}
          hint={`${data.por_dispositivo.length} dispositivos`}
          icon={Database}
        />
      </div>

      <div className="mt-6 grid gap-4 xl:grid-cols-[1.15fr_0.85fr] xl:items-start">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Constructor de exportación</CardTitle>
            <CardDescription>
              Definí el recorte y descargá el dataset con tu sesión actual.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <DatasetExport
              protocols={data.por_protocolo.map((item) => item.protocolo)}
              devices={data.por_dispositivo.map((item) => item.dispositivo)}
            />
            <div className="mt-4 grid gap-2 rounded-lg border bg-muted/25 p-3 text-[11px] leading-5 text-muted-foreground sm:grid-cols-2">
              <p>
                <span className="font-medium text-foreground">JSON</span> incluye
                metadatos de exportación, filtros y total.
              </p>
              <p>
                <span className="font-medium text-foreground">CSV</span> aplana una fila
                por evaluación; las series quedan en JSON.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Distribución por protocolo</CardTitle>
            <CardDescription>Volumen acumulado de evaluaciones</CardDescription>
          </CardHeader>
          <CardContent>
            <ProtocolDistributionChart data={data.por_protocolo} height={230} />
          </CardContent>
        </Card>
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Dispositivos de origen</CardTitle>
            <CardDescription>Cada evaluación conserva su procedencia</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {data.por_dispositivo.map((device) => (
              <div key={device.dispositivo}>
                <div className="mb-1.5 flex items-center justify-between text-xs">
                  <span className="font-medium">{device.dispositivo}</span>
                  <span className="font-mono text-muted-foreground">{device.total}</span>
                </div>
                <div className="h-1.5 overflow-hidden rounded-full bg-secondary">
                  <div
                    className="h-full rounded-full bg-primary"
                    style={{ width: `${(device.total / maxDevice) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Gobernanza de datos</CardTitle>
            <CardDescription>Reglas aplicadas a toda exportación</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-3 sm:grid-cols-2">
            {governance.map((rule) => (
              <div
                key={rule}
                className="flex gap-2.5 rounded-lg border bg-secondary/20 p-3"
              >
                <ShieldCheck className="mt-0.5 size-4 shrink-0 text-accent" />
                <p className="text-xs leading-5 text-muted-foreground">{rule}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <Card className="mt-4">
        <CardHeader>
          <CardTitle className="text-base">Variables disponibles</CardTitle>
          <CardDescription>
            Diccionario resumido de las métricas más consultadas
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-3 text-xs sm:grid-cols-2 lg:grid-cols-4">
          {[
            { key: "altura_salto_cm", label: "Altura de salto", unit: "cm" },
            { key: "tiempo_vuelo_ms", label: "Tiempo de vuelo", unit: "ms" },
            { key: "pico_fuerza_n", label: "Pico de fuerza", unit: "N" },
            { key: "asimetria_pct", label: "Asimetría", unit: "%" },
            { key: "cadencia_pasos_min", label: "Cadencia", unit: "pasos/min" },
            { key: "velocidad_m_s", label: "Velocidad de marcha", unit: "m/s" },
            { key: "flexion_rodilla_deg", label: "Flexión de rodilla", unit: "°" },
            { key: "rms_vastolateral_mv", label: "RMS vasto lateral", unit: "mV" },
          ].map((variable) => (
            <div key={variable.key} className="rounded-md border bg-background p-3">
              <p className="text-[11px] font-medium text-foreground">{variable.label}</p>
              <p className="mt-1 font-mono text-[10px] text-muted-foreground">
                {variable.key} · {variable.unit}
              </p>
            </div>
          ))}
        </CardContent>
      </Card>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-3 rounded-lg border bg-background p-4 text-xs text-muted-foreground">
        <p className="flex items-center gap-2">
          <FileText className="size-4 text-muted-foreground" />
          Cada exportación debe registrarse en el cuaderno de investigación del
          laboratorio.
        </p>
        <p className="font-mono text-[10px] uppercase tracking-[0.14em]">
          {data.por_protocolo
            .map((item) => protocolLabel(item.protocolo))
            .slice(0, 3)
            .join(" · ")}
        </p>
      </div>
    </div>
  );
}
