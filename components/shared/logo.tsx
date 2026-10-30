import Link from "next/link";

import { cn } from "@/lib/utils";

interface LogoProps {
  href?: string;
  className?: string;
  inverted?: boolean;
  compact?: boolean;
}

export function Logo({
  href = "/",
  className,
  inverted = false,
  compact = false,
}: LogoProps) {
  return (
    <Link
      href={href}
      className={cn("group inline-flex items-center gap-2.5", className)}
      aria-label="LabOS · Laboratorio de Movimiento Humano"
    >
      <span
        className={cn(
          "relative flex size-9 items-center justify-center rounded-lg border",
          inverted
            ? "border-white/20 bg-white/10 text-white"
            : "border-clinical-200 bg-clinical-50 text-clinical-700",
        )}
      >
        <svg viewBox="0 0 24 24" fill="none" className="size-5" aria-hidden="true">
          <path
            d="M3 14.5h3.2l1.7-4.8 2.3 8 2.5-11 2.2 7.8 1.5-3.5H21"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <span className="absolute -right-0.5 -top-0.5 size-1.5 rounded-full bg-accent" />
      </span>
      <span className="flex flex-col leading-none">
        <span
          className={cn(
            "font-display text-[19px] font-semibold tracking-tight",
            inverted ? "text-white" : "text-foreground",
          )}
        >
          LabOS
        </span>
        {!compact && (
          <span
            className={cn(
              "mt-1 font-mono text-[9px] uppercase tracking-[0.2em]",
              inverted ? "text-white/60" : "text-muted-foreground",
            )}
          >
            IUR · LMH
          </span>
        )}
      </span>
    </Link>
  );
}
