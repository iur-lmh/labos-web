import Link from "next/link";
import { ArrowUpRight, Menu } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Logo } from "@/components/shared/logo";

const navigation = [
  { href: "/", label: "Inicio" },
  { href: "/publicaciones", label: "Investigación" },
  { href: "/equipo", label: "Equipo" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/85 backdrop-blur-md">
      <div className="container flex h-16 items-center justify-between gap-6">
        <Logo />

        <nav className="hidden items-center gap-7 md:flex" aria-label="Principal">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <Button asChild variant="ghost" size="sm">
            <Link href="/publicaciones">Ver producción</Link>
          </Button>
          <Button asChild size="sm">
            <Link href="/login">
              Acceso institucional
              <ArrowUpRight />
            </Link>
          </Button>
        </div>

        <details className="group relative md:hidden">
          <summary className="flex size-10 cursor-pointer list-none items-center justify-center rounded-md border bg-background [&::-webkit-details-marker]:hidden">
            <Menu className="size-5" />
            <span className="sr-only">Abrir menú</span>
          </summary>
          <div className="absolute right-0 top-12 w-64 rounded-xl border bg-card p-2 shadow-xl">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block rounded-md px-3 py-2.5 text-sm hover:bg-muted"
              >
                {item.label}
              </Link>
            ))}
            <div className="my-2 border-t" />
            <Link
              href="/login"
              className="flex items-center justify-between rounded-md px-3 py-2.5 text-sm font-medium text-primary hover:bg-muted"
            >
              Acceso institucional
              <ArrowUpRight className="size-4" />
            </Link>
          </div>
        </details>
      </div>
    </header>
  );
}
