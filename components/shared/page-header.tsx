import { FlaskConical } from "lucide-react";

import { cn } from "@/lib/utils";

interface PageHeaderProps {
  eyebrow?: string;
  title: string;
  description?: string;
  actions?: React.ReactNode;
  className?: string;
}

export function PageHeader({
  eyebrow,
  title,
  description,
  actions,
  className,
}: PageHeaderProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4 pb-6 sm:flex-row sm:items-end sm:justify-between",
        className,
      )}
    >
      <div className="max-w-2xl">
        {eyebrow && <p className="eyebrow mb-2">{eyebrow}</p>}
        <h1 className="font-display text-3xl font-semibold tracking-tight text-foreground sm:text-[34px]">
          {title}
        </h1>
        {description && (
          <p className="mt-2 text-sm leading-6 text-muted-foreground">{description}</p>
        )}
      </div>
      {actions && <div className="flex flex-wrap items-center gap-2">{actions}</div>}
    </div>
  );
}

export function DemoBanner() {
  return (
    <div className="mb-6 flex items-start gap-3 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
      <FlaskConical className="mt-0.5 size-4 shrink-0" />
      <p>
        <span className="font-medium">Modo demostración.</span> No hay conexión con la API
        o la sesión no está activa; se muestran datos sintéticos. Ejecutá
        <code className="mx-1 rounded bg-amber-100 px-1.5 py-0.5 font-mono text-xs">
          docker compose up
        </code>
        para ver datos reales.
      </p>
    </div>
  );
}
