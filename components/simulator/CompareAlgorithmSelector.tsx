import React from "react";

interface CompareAlgorithmSelectorProps {
  selectedAlgorithms: Set<string>;
  setSelectedAlgorithms: (algo: string) => void;
}

const algorithms = [
  { id: "FCFS", name: "FCFS", desc: "First Come First Serve" },
  { id: "SJF", name: "SJF", desc: "Shortest Job First" },
  { id: "PRIORITY", name: "Priority", desc: "Priority Scheduling" },
  { id: "RR", name: "Round Robin", desc: "Time Quantum Based" },
];

export default function CompareAlgorithmSelector({
  selectedAlgorithms,
  setSelectedAlgorithms,
}: CompareAlgorithmSelectorProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full">
      {algorithms.map((algo) => {
        const isSelected = selectedAlgorithms.has(algo.id);
        return (
          <button
            key={algo.id}
            onClick={() => setSelectedAlgorithms(algo.id)}
            className={`
              p-4 border-4 border-black transition-all text-left relative
              ${isSelected
                ? "bg-primary-highlight shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] -translate-x-0.5 -translate-y-0.5"
                : "bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-secondary-highlight/20"}
            `}
          >
            {isSelected && (
              <div className="absolute top-2 right-2 w-4 h-4 bg-black rounded-full border-2 border-white" />
            )}
            <div className="font-display text-xl font-bold">{algo.name}</div>
            <div className="font-body text-xs text-foreground/60">{algo.desc}</div>
          </button>
        );
      })}
    </div>
  );
}
