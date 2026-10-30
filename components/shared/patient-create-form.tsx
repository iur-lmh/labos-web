"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CheckCircle2, Loader2, Plus, UserPlus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { apiFetch } from "@/lib/api-client";
import type { Paciente } from "@/lib/types";

export function PatientCreateForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [created, setCreated] = useState<Paciente | null>(null);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setCreated(null);
    setLoading(true);

    const form = event.currentTarget;
    const data = new FormData(form);
    const deporte = String(data.get("deporte") ?? "").trim();

    try {
      const paciente = await apiFetch<Paciente>("/pacientes", {
        method: "POST",
        body: JSON.stringify({
          nombre: String(data.get("nombre") ?? ""),
          apellido: String(data.get("apellido") ?? ""),
          fecha_nacimiento: data.get("fecha_nacimiento") || null,
          dni_anonimizado: String(data.get("dni_anonimizado") ?? ""),
          metadata: deporte ? { deporte } : {},
        }),
      });
      setCreated(paciente);
      form.reset();
      router.refresh();
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "No se pudo crear el paciente.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <details id="nuevo-paciente" className="surface group mb-6 scroll-mt-24">
      <summary className="flex cursor-pointer list-none items-center justify-between gap-3 p-4 [&::-webkit-details-marker]:hidden">
        <div className="flex items-center gap-3">
          <span className="flex size-9 items-center justify-center rounded-md bg-secondary text-primary">
            <UserPlus className="size-4" />
          </span>
          <div>
            <p className="text-sm font-medium">Registrar paciente</p>
            <p className="text-xs text-muted-foreground">
              Alta con identificador seudonimizado
            </p>
          </div>
        </div>
        <span className="flex items-center gap-1 text-xs font-medium text-primary">
          Abrir
          <Plus className="size-3.5 transition-transform group-open:rotate-45" />
        </span>
      </summary>

      <form
        onSubmit={onSubmit}
        className="grid gap-4 border-t p-4 sm:grid-cols-2 lg:grid-cols-5"
      >
        <div className="space-y-2">
          <Label htmlFor="nombre">Nombre</Label>
          <Input id="nombre" name="nombre" required maxLength={120} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="apellido">Apellido</Label>
          <Input id="apellido" name="apellido" required maxLength={120} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="fecha_nacimiento">Nacimiento</Label>
          <Input id="fecha_nacimiento" name="fecha_nacimiento" type="date" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="dni_anonimizado">Seudónimo</Label>
          <Input
            id="dni_anonimizado"
            name="dni_anonimizado"
            required
            minLength={6}
            maxLength={64}
            placeholder="lmh-7f3a92c1"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="deporte">Deporte / contexto</Label>
          <Input id="deporte" name="deporte" maxLength={80} placeholder="running" />
        </div>

        <div className="flex flex-col gap-3 sm:col-span-2 lg:col-span-5">
          <p className="text-[11px] leading-5 text-muted-foreground">
            No ingresar DNI, email ni teléfono. El seudónimo debe generarse con
            <code className="mx-1 rounded bg-muted px-1 py-0.5 font-mono text-[10px]">
              biomech anonymize
            </code>
            y ser estable entre evaluaciones.
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <Button type="submit" disabled={loading}>
              {loading ? <Loader2 className="animate-spin" /> : <Plus />}
              {loading ? "Guardando…" : "Crear paciente"}
            </Button>
            {created && (
              <span className="flex items-center gap-1.5 text-xs text-emerald-700">
                <CheckCircle2 className="size-4" />
                Paciente creado: {created.nombre} {created.apellido}
              </span>
            )}
            {error && <span className="text-xs text-destructive">{error}</span>}
          </div>
        </div>
      </form>
    </details>
  );
}
