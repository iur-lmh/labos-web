import Link from "next/link";
import { ArrowUpRight, Download, Search, UserRound, Users } from "lucide-react";
import type { Metadata } from "next";

import { PatientCreateForm } from "@/components/shared/patient-create-form";
import { DemoBanner, PageHeader } from "@/components/shared/page-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { serverApiFetch } from "@/lib/api-server";
import { demoPacientes } from "@/lib/demo-data";
import type { Paciente, Paginated } from "@/lib/types";
import { ageFromBirthDate, formatDate, initials } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Pacientes",
};

export const dynamic = "force-dynamic";

interface PageProps {
  searchParams: Promise<{ q?: string }>;
}

export default async function PacientesPage({ searchParams }: PageProps) {
  const { q } = await searchParams;
  const query = q?.trim() ?? "";
  const response = await serverApiFetch<Paginated<Paciente>>(
    `/pacientes?limit=100&q=${encodeURIComponent(query)}`,
  );
  const demoMode = response === null;
  const normalizedQuery = query.toLowerCase();
  const source = demoMode ? demoPacientes : (response?.items ?? []);
  const pacientes = normalizedQuery
    ? source.filter((patient) =>
        `${patient.nombre} ${patient.apellido} ${patient.dni_anonimizado}`
          .toLowerCase()
          .includes(normalizedQuery),
      )
    : source;

  return (
    <div className="mx-auto max-w-7xl">
      <PageHeader
        eyebrow="Historia biomecánica"
        title="Pacientes"
        description="Buscá una historia, revisá sus evaluaciones y accedé a los archivos asociados."
        actions={
          <>
            <Button asChild variant="outline">
              <Link href="/api/labos/investigaciones/dataset?formato=csv">
                <Download />
                Exportar dataset
              </Link>
            </Button>
            <Button asChild>
              <Link href="#nuevo-paciente">
                <UserRound />
                Registrar paciente
              </Link>
            </Button>
          </>
        }
      />

      {demoMode && <DemoBanner />}

      <PatientCreateForm />

      <Card>
        <CardHeader className="gap-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
          <div>
            <CardTitle className="text-base">Listado de pacientes</CardTitle>
            <p className="mt-1 text-xs text-muted-foreground">
              {pacientes.length} {pacientes.length === 1 ? "registro" : "registros"}
              {query ? ` para “${query}”` : ""} · identificadores seudonimizados
            </p>
          </div>
          <form
            action="/profesionales/pacientes"
            method="get"
            className="flex w-full max-w-sm items-center gap-2"
          >
            <div className="relative flex-1">
              <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                name="q"
                defaultValue={query}
                placeholder="Buscar por nombre o seudónimo"
                className="pl-9"
                aria-label="Buscar pacientes"
              />
            </div>
            <Button type="submit" variant="secondary">
              Buscar
            </Button>
          </form>
        </CardHeader>
        <CardContent className="px-0 pb-2">
          {pacientes.length === 0 ? (
            <div className="px-6 py-16 text-center">
              <Users className="mx-auto size-8 text-muted-foreground/40" />
              <p className="mt-3 text-sm font-medium">Sin pacientes para mostrar</p>
              <p className="mt-1 text-xs text-muted-foreground">
                Probá con otro término o registrá el primer paciente.
              </p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Paciente</TableHead>
                  <TableHead className="hidden sm:table-cell">Edad</TableHead>
                  <TableHead className="hidden md:table-cell">Contexto</TableHead>
                  <TableHead className="hidden lg:table-cell">Actualizado</TableHead>
                  <TableHead className="text-right">Historia</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {pacientes.map((paciente) => {
                  const age = ageFromBirthDate(paciente.fecha_nacimiento);
                  const context =
                    typeof paciente.metadata.deporte === "string"
                      ? paciente.metadata.deporte
                      : typeof paciente.metadata.motivo === "string"
                        ? paciente.metadata.motivo
                        : null;
                  return (
                    <TableRow key={paciente.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-secondary text-[11px] font-semibold text-secondary-foreground">
                            {initials(`${paciente.nombre} ${paciente.apellido}`)}
                          </span>
                          <div>
                            <p className="text-sm font-medium">
                              {paciente.nombre} {paciente.apellido}
                            </p>
                            <p className="font-mono text-[10px] text-muted-foreground">
                              {paciente.dni_anonimizado}
                            </p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="hidden text-sm text-muted-foreground sm:table-cell">
                        {age !== null ? `${age} años` : "—"}
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        {context ? (
                          <Badge variant="secondary" className="font-normal">
                            {context}
                          </Badge>
                        ) : (
                          <span className="text-xs text-muted-foreground">—</span>
                        )}
                      </TableCell>
                      <TableCell className="hidden text-xs text-muted-foreground lg:table-cell">
                        {formatDate(paciente.updated_at)}
                      </TableCell>
                      <TableCell className="text-right">
                        <Button asChild variant="ghost" size="sm">
                          <Link href={`/profesionales/pacientes/${paciente.id}`}>
                            Abrir
                            <ArrowUpRight />
                          </Link>
                        </Button>
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
  );
}
