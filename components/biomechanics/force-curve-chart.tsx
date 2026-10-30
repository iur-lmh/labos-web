"use client";

import {
  Area,
  AreaChart,
  CartesianGrid,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { buildForceCurve } from "@/lib/demo-data";
import { cn } from "@/lib/utils";

interface ForceCurveChartProps {
  data?: Array<{ t: number; fuerza: number }>;
  height?: number;
  className?: string;
}

export function ForceCurveChart({
  data = buildForceCurve(),
  height = 260,
  className,
}: ForceCurveChartProps) {
  return (
    <div className={cn("w-full", className)} style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 8, right: 12, bottom: 16, left: 0 }}>
          <defs>
            <linearGradient id="forceFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#15576e" stopOpacity={0.28} />
              <stop offset="100%" stopColor="#15576e" stopOpacity={0.02} />
            </linearGradient>
          </defs>
          <CartesianGrid
            stroke="hsl(var(--border))"
            strokeDasharray="3 3"
            vertical={false}
          />
          <XAxis
            dataKey="t"
            tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
            tickLine={false}
            axisLine={{ stroke: "hsl(var(--border))" }}
            unit=" ms"
            minTickGap={30}
            label={{
              value: "Tiempo",
              position: "insideBottomRight",
              offset: -8,
              fontSize: 10,
              fill: "hsl(var(--muted-foreground))",
            }}
          />
          <YAxis
            tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
            tickLine={false}
            axisLine={false}
            width={42}
            unit=" N"
            domain={[0, "auto"]}
          />
          <Tooltip
            contentStyle={{
              borderRadius: 10,
              border: "1px solid hsl(var(--border))",
              fontSize: 12,
              boxShadow: "0 8px 24px rgba(15,45,60,0.12)",
            }}
            labelFormatter={(value) => `t = ${value} ms`}
            formatter={(value) => [`${Number(value).toFixed(0)} N`, "Fuerza"]}
          />
          <ReferenceLine
            x={165}
            stroke="hsl(var(--accent))"
            strokeDasharray="4 4"
            label={{
              value: "Descarga",
              position: "top",
              fontSize: 10,
              fill: "hsl(var(--muted-foreground))",
            }}
          />
          <ReferenceLine
            x={245}
            stroke="hsl(var(--primary))"
            strokeDasharray="4 4"
            label={{
              value: "Impulso",
              position: "top",
              fontSize: 10,
              fill: "hsl(var(--muted-foreground))",
            }}
          />
          <Area
            type="monotone"
            dataKey="fuerza"
            stroke="#15576e"
            strokeWidth={2}
            fill="url(#forceFill)"
            activeDot={{ r: 4, strokeWidth: 0, fill: "#0d9488" }}
            isAnimationActive={false}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
