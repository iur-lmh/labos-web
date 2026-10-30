"use client";

import { useMemo, useState } from "react";
import { Download, FileJson, FileSpreadsheet, Filter } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { protocolLabel } from "@/lib/utils";

interface DatasetExportProps {
  protocols: string[];
  devices: string[];
}

export function DatasetExport({ protocols, devices }: DatasetExportProps) {
  const [protocol, setProtocol] = useState("");
  const [device, setDevice] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

  const query = useMemo(() => {
    const params = new URLSearchParams();
    if (protocol) params.set("tipo_protocolo", protocol);
    if (device) params.set("dispositivo", device);
    if (from) params.set("desde", `${from}T00:00:00Z`);
    if (to) params.set("hasta", `${to}T23:59:59Z`);
    return params.toString();
  }, [protocol, device, from, to]);

  const base = `/api/labos/investigaciones/dataset?${query}`;

  return (
    <div className="space-y-4">
      <div className="grid gap-3 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="protocolo">Protocolo</Label>
          <select
            id="protocolo"
            value={protocol}
            onChange={(event) => setProtocol(event.target.value)}
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <option value="">Todos los protocolos</option>
            {protocols.map((item) => (
              <option key={item} value={item}>
                {protocolLabel(item)}
              </option>
            ))}
          </select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="dispositivo">Dispositivo</Label>
          <select
            id="dispositivo"
            value={device}
            onChange={(event) => setDevice(event.target.value)}
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <option value="">Todos los dispositivos</option>
            {devices.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="desde">Desde</Label>
          <Input
            id="desde"
            type="date"
            value={from}
            onChange={(event) => setFrom(event.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="hasta">Hasta</Label>
          <Input
            id="hasta"
            type="date"
            value={to}
            onChange={(event) => setTo(event.target.value)}
          />
        </div>
      </div>

      <div className="flex flex-col gap-2 rounded-lg border bg-secondary/25 p-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
          <Filter className="size-3.5" />
          {query ? "Filtros activos" : "Sin filtros: dataset completo"}
        </p>
        <div className="flex flex-wrap gap-2">
          <Button asChild size="sm" variant="outline">
            <a href={`${base}&formato=json`}>
              <FileJson />
              JSON
            </a>
          </Button>
          <Button asChild size="sm">
            <a href={`${base}&formato=csv`} download>
              <FileSpreadsheet />
              Descargar CSV
              <Download />
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
}
