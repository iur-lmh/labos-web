import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, BookOpen, Database, FileText, ShieldCheck } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { demoPublicaciones } from "@/lib/demo-data";

export const metadata: Metadata = {
  title: "Investigación y publicaciones",
  description:
    "Pre-prints, artículos y datasets del Laboratorio de Movimiento Humano del IUR — UCASAL.",
};

const statusVariant = (status: string) => {
  if (status === "Presentado") return "success" as const;
  if (status === "En revisión") return "warning" as const;
  return "muted" as const;
};

export default function PublicacionesPage() {
  return (
    <>
      <section className="relative overflow-hidden border-b bg-secondary/20">
        <div className="grid-pattern pointer-events-none absolute inset-0 opacity-50" />
        <div className="container relative py-16">
          <p className="eyebrow">Hub público de investigación</p>
          <h1 className="mt-3 max-w-3xl text-balance font-display text-5xl font-semibold tracking-tight">
            Ciencia abierta, datos protegidos.
          </h1>
          <p className="mt-5 max-w-2xl text-[15px] leading-7 text-muted-foreground">
            Producción científica del laboratorio y materiales de investigación. Los
            datasets públicos se construyen exclusivamente sobre información
            seudonimizada.
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <Badge variant="outline" className="bg-background">
              <ShieldCheck className="mr-1 size-3.5 text-accent" />
              Revisión ética
            </Badge>
            <Badge variant="outline" className="bg-background">
              <Database className="mr-1 size-3.5 text-accent" />
              Datasets con DOI
            </Badge>
            <Badge variant="outline" className="bg-background">
              <BookOpen className="mr-1 size-3.5 text-accent" />
              Acceso abierto
            </Badge>
          </div>
        </div>
      </section>

      <section className="py-14">
        <div className="container grid gap-8 lg:grid-cols-[1fr_320px]">
          <div>
            <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
              <div>
                <h2 className="font-display text-2xl font-semibold tracking-tight">
                  Producción y materiales
                </h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  {demoPublicaciones.length} registros · actualizado 2026
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                {["Todos", "Pre-print", "Artículo", "Dataset"].map((filter, index) => (
                  <Badge
                    key={filter}
                    variant={index === 0 ? "default" : "outline"}
                    className={index === 0 ? "" : "bg-background text-muted-foreground"}
                  >
                    {filter}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="mb-6 flex items-start gap-3 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
              <FileText className="mt-0.5 size-4 shrink-0" />
              <p>
                <span className="font-medium">Contenido de demostración.</span> Los
                títulos y estados son ejemplos de estructura hasta que el laboratorio
                cargue su producción real y valide cada publicación.
              </p>
            </div>

            <div className="space-y-3">
              {demoPublicaciones.map((publication) => (
                <Card key={publication.titulo} className="group">
                  <CardHeader className="pb-3">
                    <div className="flex flex-wrap items-center gap-2">
                      <Badge variant="secondary">{publication.tipo}</Badge>
                      <Badge variant={statusVariant(publication.estado)}>
                        {publication.estado}
                      </Badge>
                      <span className="ml-auto font-mono text-[10px] text-muted-foreground">
                        {publication.year}
                      </span>
                    </div>
                    <CardTitle className="mt-3 text-lg leading-6">
                      {publication.titulo}
                    </CardTitle>
                    <CardDescription className="leading-6">
                      {publication.resumen}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex flex-wrap items-center justify-between gap-3 border-t pt-4">
                    <p className="text-xs text-muted-foreground">{publication.autores}</p>
                    <span className="inline-flex items-center gap-1 text-xs font-medium text-primary opacity-60">
                      Ficha en preparación
                      <ArrowUpRight className="size-3.5" />
                    </span>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <aside className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Política de datos</CardTitle>
                <CardDescription className="leading-6">
                  Qué se publica y qué se resguarda.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 text-sm text-muted-foreground">
                {[
                  "Nunca se publican identificadores directos ni historias clínicas.",
                  "Las series se comparten seudonimizadas y con k-anonimato ≥ 5.",
                  "Cada dataset incluye diccionario, versión y manifiesto de filtros.",
                  "El consentimiento de investigación puede retirarse en cualquier momento.",
                ].map((item) => (
                  <div key={item} className="flex gap-2.5">
                    <ShieldCheck className="mt-0.5 size-4 shrink-0 text-accent" />
                    <p className="leading-6">{item}</p>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="bg-clinical-950 text-white">
              <CardHeader>
                <CardTitle className="text-base text-white">
                  ¿Colaborás con el LMH?
                </CardTitle>
                <CardDescription className="text-white/60">
                  Buscamos articulaciones académicas, clínicas y tecnológicas.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild variant="secondary" className="w-full">
                  <a href="mailto:laboratoriodemovimientoucasal@ucasal.edu.ar">
                    Escribir al laboratorio
                    <ArrowUpRight />
                  </a>
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Repositorios</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <Link
                  href="https://github.com/iur-lmh"
                  className="flex items-center justify-between text-muted-foreground hover:text-foreground"
                  target="_blank"
                  rel="noreferrer"
                >
                  Código de la plataforma
                  <ArrowUpRight className="size-3.5" />
                </Link>
                <p className="text-xs leading-5 text-muted-foreground">
                  API, web y pipelines se publican bajo licencia MIT.
                </p>
              </CardContent>
            </Card>
          </aside>
        </div>
      </section>
    </>
  );
}
