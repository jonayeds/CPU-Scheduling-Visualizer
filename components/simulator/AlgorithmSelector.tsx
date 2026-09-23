import React from "react";
import NeobrutalistButton from "./NeobrutalistButton";

interface AlgorithmSelectorProps {
  selectedAlgorithm: string;
  setSelectedAlgorithm: (algo: string) => void;
}

const algorithms = [
  { id: "FCFS", name: "FCFS", desc: "First Come First Serve" },
  { id: "SJF", name: "SJF", desc: "Shortest Job First" },
  { id: "PRIORITY", name: "Priority", desc: "Priority Scheduling" },
  { id: "RR", name: "Round Robin", desc: "Time Quantum Based" },
];

export default function AlgorithmSelector({
  selectedAlgorithm,
  setSelectedAlgorithm,
}: AlgorithmSelectorProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full">
      {algorithms.map((algo) => (
        <button
          key={algo.id}
          onClick={() => setSelectedAlgorithm(algo.id)}
          className={`
            p-4 border-4 border-black transition-all text-left
            ${selectedAlgorithm === algo.id
              ? "bg-primary-highlight shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] translate-x-[-2px] translate-y-[-2px]"
              : "bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-secondary-highlight/20"}
          `}
        >
          <div className="font-display text-xl font-bold">{algo.name}</div>
          <div className="font-body text-xs text-foreground/60">{algo.desc}</div>
        </button>
      ))}
    </div>
  );
}
