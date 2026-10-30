import Link from "next/link";
import { ShieldCheck } from "lucide-react";

import { Logo } from "@/components/shared/logo";
import { DashboardNav } from "@/components/shared/dashboard-nav";
import { LogoutButton } from "@/components/shared/logout-button";

export function DashboardShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-muted/35 lg:grid lg:grid-cols-[264px_1fr]">
      <aside className="hidden border-r bg-background lg:flex lg:flex-col">
        <div className="flex h-16 items-center border-b px-6">
          <Logo href="/profesionales" />
        </div>
        <div className="flex-1 overflow-y-auto p-4">
          <DashboardNav />
        </div>
        <div className="border-t p-4">
          <div className="mb-3 rounded-lg border bg-secondary/40 p-3">
            <div className="flex items-center gap-2 text-xs font-medium text-foreground">
              <ShieldCheck className="size-4 text-accent" />
              Sesión protegida
            </div>
            <p className="mt-1 text-[11px] leading-5 text-muted-foreground">
              Datos clínicos bajo RBAC. La exportación siempre es seudonimizada.
            </p>
          </div>
          <LogoutButton />
        </div>
      </aside>

      <div className="flex min-h-screen flex-col">
        <header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b bg-background/90 px-4 backdrop-blur-md sm:px-6 lg:px-8">
          <div className="lg:hidden">
            <Logo href="/profesionales" compact />
          </div>
          <div className="hidden items-center gap-2 text-xs text-muted-foreground lg:flex">
            <span className="size-1.5 rounded-full bg-emerald-500" />
            Plataforma operativa · entorno de desarrollo
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="text-xs text-muted-foreground hover:text-foreground"
            >
              Ver hub público
            </Link>
            <div className="flex size-8 items-center justify-center rounded-full bg-primary text-[11px] font-semibold text-primary-foreground">
              LM
            </div>
          </div>
        </header>

        <div className="border-b bg-background px-4 py-2 lg:hidden">
          <DashboardNav />
        </div>

        <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8 lg:py-8">{children}</main>
      </div>
    </div>
  );
}
