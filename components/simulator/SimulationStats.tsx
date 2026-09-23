import React from "react";

interface StatsProps {
  avgWaiting: number;
  avgTurnaround: number;
  totalIdle: number;
}

export default function SimulationStats({ avgWaiting, avgTurnaround, totalIdle }: StatsProps) {
  const stats = [
    { label: "Avg Waiting Time", value: avgWaiting, color: "bg-primary-highlight" },
    { label: "Avg Turnaround Time", value: avgTurnaround, color: "bg-secondary-highlight" },
    { label: "Total Idle Time", value: totalIdle, color: "bg-white" },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full mt-8">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className={`border-4 border-black p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] ${stat.color}`}
        >
          <div className="font-body text-xs font-bold uppercase tracking-wider text-foreground/60 mb-2">
            {stat.label}
          </div>
          <div className="font-display text-3xl font-bold">
            {stat.value.toFixed(2)} ms
          </div>
        </div>
      ))}
    </div>
  );
}
