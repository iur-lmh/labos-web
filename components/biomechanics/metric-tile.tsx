import { cn } from "@/lib/utils";

interface MetricTileProps {
  label: string;
  value: string | number;
  unit?: string;
  reference?: string;
  className?: string;
}

export function MetricTile({
  label,
  value,
  unit,
  reference,
  className,
}: MetricTileProps) {
  return (
    <div className={cn("rounded-lg border bg-secondary/30 px-4 py-3", className)}>
      <p className="text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
        {label}
      </p>
      <p className="mt-1 font-mono text-xl font-semibold tracking-tight text-foreground">
        {value}
        {unit && (
          <span className="ml-1 text-xs font-normal text-muted-foreground">{unit}</span>
        )}
      </p>
      {reference && (
        <p className="mt-0.5 text-[11px] text-muted-foreground">{reference}</p>
      )}
    </div>
  );
}
