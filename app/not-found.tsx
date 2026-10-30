import Link from "next/link";
import { ArrowLeft, Compass } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Logo } from "@/components/shared/logo";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b">
        <div className="container flex h-16 items-center">
          <Logo />
        </div>
      </header>
      <main className="flex flex-1 items-center justify-center px-5 py-20">
        <div className="max-w-md text-center">
          <span className="mx-auto flex size-14 items-center justify-center rounded-full bg-secondary text-primary">
            <Compass className="size-6" />
          </span>
          <p className="eyebrow mt-6">Error 404</p>
          <h1 className="mt-3 font-display text-4xl font-semibold tracking-tight">
            Esta página no forma parte del mapa.
          </h1>
          <p className="mt-3 text-sm leading-6 text-muted-foreground">
            Puede que el enlace haya cambiado o que el recurso todavía no esté publicado.
          </p>
          <div className="mt-6 flex justify-center gap-3">
            <Button asChild>
              <Link href="/">
                <ArrowLeft />
                Volver al inicio
              </Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/publicaciones">Ver investigación</Link>
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
