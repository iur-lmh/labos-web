import { Badge } from "@/components/ui/badge";
import { protocolLabel } from "@/lib/utils";

const styles: Record<string, string> = {
  salto_vertical: "border-sky-200 bg-sky-50 text-sky-800",
  salto_horizontal: "border-cyan-200 bg-cyan-50 text-cyan-800",
  marcha: "border-teal-200 bg-teal-50 text-teal-800",
  emg: "border-violet-200 bg-violet-50 text-violet-800",
  fuerza: "border-amber-200 bg-amber-50 text-amber-800",
  equilibrio: "border-emerald-200 bg-emerald-50 text-emerald-800",
  movilidad: "border-rose-200 bg-rose-50 text-rose-800",
};

export function ProtocolBadge({ protocol }: { protocol: string }) {
  return (
    <Badge
      variant="outline"
      className={styles[protocol] ?? "border-border bg-muted text-muted-foreground"}
    >
      {protocolLabel(protocol)}
    </Badge>
  );
}
