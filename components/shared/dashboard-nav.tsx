"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FlaskConical,
  HeartPulse,
  LayoutDashboard,
  Users,
  type LucideIcon,
} from "lucide-react";

import { cn } from "@/lib/utils";

interface NavItem {
  href: string;
  label: string;
  icon: LucideIcon;
  exact?: boolean;
}

const professionalNav: NavItem[] = [
  { href: "/profesionales", label: "Resumen", icon: LayoutDashboard, exact: true },
  { href: "/profesionales/pacientes", label: "Pacientes", icon: Users },
  {
    href: "/profesionales/investigacion",
    label: "Mesa de I+D",
    icon: FlaskConical,
  },
];

const patientNav: NavItem[] = [
  { href: "/pacientes", label: "Mi evolución", icon: HeartPulse, exact: true },
];

export function DashboardNav() {
  const pathname = usePathname();
  const isPatientArea = pathname.startsWith("/pacientes");
  const items = isPatientArea ? patientNav : professionalNav;

  return (
    <nav className="space-y-1" aria-label="Navegación del panel">
      <p className="px-3 pb-2 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
        {isPatientArea ? "Mi espacio" : "Mesa de trabajo"}
      </p>
      {items.map((item) => {
        const active = item.exact
          ? pathname === item.href
          : pathname.startsWith(item.href);
        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center gap-2.5 rounded-md px-3 py-2 text-sm transition-colors",
              active
                ? "bg-primary text-primary-foreground shadow-sm"
                : "text-muted-foreground hover:bg-secondary/70 hover:text-foreground",
            )}
          >
            <item.icon className="size-4" />
            {item.label}
          </Link>
        );
      })}
      {!isPatientArea && (
        <>
          <div className="my-4 border-t" />
          <p className="px-3 pb-2 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
            Mi cuenta
          </p>
          <Link
            href="/pacientes"
            className="flex items-center gap-2.5 rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-secondary/70 hover:text-foreground"
          >
            <HeartPulse className="size-4" />
            Portal de pacientes
          </Link>
          <Link
            href="/"
            className="flex items-center gap-2.5 rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-secondary/70 hover:text-foreground"
          >
            <LayoutDashboard className="size-4" />
            Hub público
          </Link>
        </>
      )}
    </nav>
  );
}
