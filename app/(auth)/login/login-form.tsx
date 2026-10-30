"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AlertCircle, ArrowRight, Loader2, LockKeyhole, Mail } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const data = (await response.json().catch(() => null)) as {
          detail?: string;
        } | null;
        setError(data?.detail ?? "No se pudo iniciar sesión.");
        return;
      }

      router.replace("/profesionales");
      router.refresh();
    } catch {
      setError("No se pudo contactar al servidor. Intentá nuevamente.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      <div className="space-y-2">
        <Label htmlFor="email">Email institucional</Label>
        <div className="relative">
          <Mail className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            id="email"
            type="email"
            autoComplete="username"
            placeholder="nombre@ucasal.edu.ar"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="h-11 pl-10"
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="password">Contraseña</Label>
          <span className="text-[11px] text-muted-foreground">
            Acceso administrado por el LMH
          </span>
        </div>
        <div className="relative">
          <LockKeyhole className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            id="password"
            type="password"
            autoComplete="current-password"
            placeholder="••••••••••••"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="h-11 pl-10"
            required
          />
        </div>
      </div>

      {error && (
        <div className="flex items-start gap-2 rounded-md border border-destructive/20 bg-destructive/5 px-3 py-2.5 text-sm text-destructive">
          <AlertCircle className="mt-0.5 size-4 shrink-0" />
          <p>{error}</p>
        </div>
      )}

      <Button type="submit" size="lg" className="w-full" disabled={loading}>
        {loading ? (
          <>
            <Loader2 className="animate-spin" />
            Verificando…
          </>
        ) : (
          <>
            Ingresar
            <ArrowRight />
          </>
        )}
      </Button>

      <p className="text-center text-[11px] leading-5 text-muted-foreground">
        Al ingresar aceptás las políticas de uso y confidencialidad del laboratorio. Las
        credenciales iniciales se configuran en{" "}
        <code className="rounded bg-muted px-1 py-0.5 font-mono text-[10px]">
          ADMIN_EMAIL
        </code>{" "}
        y{" "}
        <code className="rounded bg-muted px-1 py-0.5 font-mono text-[10px]">
          ADMIN_PASSWORD
        </code>
        .
      </p>
    </form>
  );
}
