"use client";

import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { SimulationResult } from "@/app/simulate/algorithms/fcfs";

interface ComparisonTurnaroundChartProps {
  results: Record<string, SimulationResult>;
}

const algorithmDisplayNames: Record<string, string> = {
  FCFS: "First Come First Serve",
  SJF: "Shortest Job First",
  PRIORITY: "Priority Scheduling",
  RR: "Round Robin",
};

const algorithmColors = ["#000000", "#e85d04", "#2a9d8f", "#d00000"];

export default function ComparisonTurnaroundChart({
  results,
}: ComparisonTurnaroundChartProps) {
  const entries = Object.entries(results);
  const processes = [...(entries[0]?.[1].results ?? [])].sort(
    (first, second) =>
      Number(first.id.replace(/^P/i, "")) - Number(second.id.replace(/^P/i, ""))
  );

  const chartData = processes.map((process, index) => {
    const point: Record<string, string | number> = {
      process: process.id || `P${index + 1}`,
    };

    entries.forEach(([algorithm, result]) => {
      point[algorithm] =
        result.results.find((item) => item.id === process.id)?.turnaroundTime ?? 0;
    });

    return point;
  });

  return (
    <div className="border-4 border-black bg-white p-4 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] sm:p-6">
      <h3 className="mb-2 font-display text-2xl font-bold">
        Turnaround Time Comparison
      </h3>
      <p className="mb-6 font-body text-sm text-foreground/60">
        Turnaround time for each process across the selected algorithms.
      </p>
      <div className="h-96 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData} margin={{ top: 8, right: 16, left: 0, bottom: 8 }}>
            <CartesianGrid stroke="#000000" strokeDasharray="4 4" opacity={0.18} />
            <XAxis
              dataKey="process"
              tick={{ fill: "#000000", fontFamily: "var(--font-solway)" }}
              tickLine={{ stroke: "#000000" }}
              axisLine={{ stroke: "#000000", strokeWidth: 2 }}
            />
            <YAxis
              allowDecimals={false}
              label={{
                value: "Turnaround Time",
                angle: -90,
                position: "insideLeft",
                fill: "#000000",
                fontFamily: "var(--font-solway)",
              }}
              tick={{ fill: "#000000", fontFamily: "var(--font-solway)" }}
              tickLine={{ stroke: "#000000" }}
              axisLine={{ stroke: "#000000", strokeWidth: 2 }}
            />
            <Tooltip
              contentStyle={{
                border: "3px solid #000000",
                borderRadius: 0,
                boxShadow: "4px 4px 0 #000000",
                fontFamily: "var(--font-solway)",
              }}
              formatter={(value, name) => [value, algorithmDisplayNames[String(name)] ?? name]}
            />
            <Legend
              formatter={(value) => algorithmDisplayNames[value] ?? value}
              wrapperStyle={{ fontFamily: "var(--font-solway)" }}
            />
            {entries.map(([algorithm], index) => (
              <Line
                key={algorithm}
                type="monotone"
                dataKey={algorithm}
                name={algorithm}
                stroke={algorithmColors[index % algorithmColors.length]}
                strokeWidth={3}
                dot={{ r: 5, fill: algorithmColors[index % algorithmColors.length] }}
                activeDot={{ r: 7 }}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
