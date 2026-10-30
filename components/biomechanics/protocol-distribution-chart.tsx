"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { protocolLabel } from "@/lib/utils";

interface ProtocolDistributionProps {
  data: Array<{ protocolo: string; total: number }>;
  height?: number;
}

const COLORS = ["#15576e", "#1f86a2", "#3aa3bd", "#0d9488", "#72c1d4", "#a9dbe7"];

export function ProtocolDistributionChart({
  data,
  height = 240,
}: ProtocolDistributionProps) {
  const chartData = data.map((item) => ({
    ...item,
    label: protocolLabel(item.protocolo),
  }));

  return (
    <div style={{ height }} className="w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={chartData}
          layout="vertical"
          margin={{ top: 4, right: 16, bottom: 4, left: 8 }}
        >
          <CartesianGrid
            stroke="hsl(var(--border))"
            strokeDasharray="3 3"
            horizontal={false}
          />
          <XAxis
            type="number"
            tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
            tickLine={false}
            axisLine={false}
            allowDecimals={false}
          />
          <YAxis
            type="category"
            dataKey="label"
            width={112}
            tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
            tickLine={false}
            axisLine={false}
          />
          <Tooltip
            cursor={{ fill: "hsl(var(--muted))", opacity: 0.5 }}
            contentStyle={{
              borderRadius: 10,
              border: "1px solid hsl(var(--border))",
              fontSize: 12,
            }}
            formatter={(value) => [`${value} evaluaciones`, "Total"]}
          />
          <Bar dataKey="total" radius={[0, 4, 4, 0]} isAnimationActive={false}>
            {chartData.map((entry, index) => (
              <Cell key={entry.protocolo} fill={COLORS[index % COLORS.length]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
