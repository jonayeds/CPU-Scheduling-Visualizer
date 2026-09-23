"use client";

import React, { useState } from "react";
import { runFcfs } from "@/app/simulate/algorithms/fcfs";
import { runSjf } from "@/app/simulate/algorithms/sjf";
import { runPriority } from "@/app/simulate/algorithms/priority";
import { runRoundRobin } from "@/app/simulate/algorithms/roundRobin";
import type { SimulationResult } from "@/app/simulate/algorithms/fcfs";

import CompareAlgorithmSelector from "@/components/simulator/CompareAlgorithmSelector";
import ProcessRow from "@/components/simulator/ProcessRow";
import NeobrutalistButton from "@/components/simulator/NeobrutalistButton";
import NeobrutalistInput from "@/components/simulator/NeobrutalistInput";
import GanttChart from "@/components/simulator/GanttChart";
import ResultTable from "@/components/simulator/ResultTable";
import SimulationStats from "@/components/simulator/SimulationStats";
import ComparisonTurnaroundChart from "@/components/simulator/ComparisonTurnaroundChart";

interface Process {
  id: string;
  arrivalTime: string;
  burstTime: string;
  priority: string;
}

const algorithmDisplayNames: Record<string, string> = {
  FCFS: "First Come First Serve",
  SJF: "Shortest Job First",
  PRIORITY: "Priority Scheduling",
  RR: "Round Robin",
};

export default function ComparePage() {
  const [selectedAlgorithms, setSelectedAlgorithms] = useState<Set<string>>(new Set(["FCFS", "SJF"]));
  const [timeQuantum, setTimeQuantum] = useState("2");
  const [processes, setProcesses] = useState<Process[]>([
    { id: "1", arrivalTime: "0", burstTime: "5", priority: "1" },
    { id: "2", arrivalTime: "1", burstTime: "3", priority: "2" },
  ]);

  const [comparisonResults, setComparisonResults] = useState<Record<string, SimulationResult>>({});

  const toggleAlgorithm = (algo: string) => {
    const next = new Set(selectedAlgorithms);
    if (next.has(algo)) {
      next.delete(algo);
    } else {
      next.add(algo);
    }
    setSelectedAlgorithms(next);
  };

  const addProcess = () => {
    const nextId = String(
      Math.max(0, ...processes.map((process) => Number(process.id) || 0)) + 1
    );
    setProcesses([
      ...processes,
      { id: nextId, arrivalTime: "0", burstTime: "1", priority: "1" },
    ]);
  };

  const removeProcess = (id: string) => {
    if (processes.length <= 1) return;
    setProcesses(processes.filter((p) => p.id !== id));
  };

  const updateProcess = (id: string, field: keyof Process, value: string) => {
    setProcesses(
      processes.map((p) => (p.id === id ? { ...p, [field]: value } : p))
    );
  };

  const handleRunComparison = () => {
    if (selectedAlgorithms.size < 2) {
      alert("Please select at least 2 algorithms to compare.");
      return;
    }

    const results: Record<string, SimulationResult> = {};

    selectedAlgorithms.forEach((algo) => {
      if (algo === "FCFS") {
        results["FCFS"] = runFcfs(processes);
      } else if (algo === "SJF") {
        results["SJF"] = runSjf(processes);
      } else if (algo === "PRIORITY") {
        results["PRIORITY"] = runPriority(processes);
      } else if (algo === "RR") {
        results["RR"] = runRoundRobin(processes, timeQuantum);
      }
    });

    setComparisonResults(results);
  };

  const isPriorityEnabled = selectedAlgorithms.has("PRIORITY");
  const isRoundRobinEnabled = selectedAlgorithms.has("RR");

  return (
    <main className="min-h-screen bg-background p-4 md:p-8 flex flex-col items-center">
      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-12 gap-8">

        {/* Configuration Panel */}
        <div className="col-span-2"></div>
        <section className="lg:col-span-8 flex flex-col gap-8">
          <div className="border-4 border-black bg-white p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <h2 className="font-display text-3xl font-bold mb-6">Comparison Config</h2>

            <div className="flex flex-col gap-6">
              <div>
                <label className="font-body font-bold uppercase text-xs tracking-wider mb-3 block">
                  Select Algorithms (Min 2)
                </label>
                <CompareAlgorithmSelector
                  selectedAlgorithms={selectedAlgorithms}
                  setSelectedAlgorithms={toggleAlgorithm}
                />
              </div>

              {isRoundRobinEnabled && (
                <div className="animate-in fade-in slide-in-from-top-2 duration-300">
                  <NeobrutalistInput
                    label="Time Quantum"
                    value={timeQuantum}
                    onChange={setTimeQuantum}
                  />
                </div>
              )}
            </div>
          </div>

          <div className="border-4 border-black bg-white p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <div className="flex justify-between items-center mb-6">
              <h2 className="font-display text-3xl font-bold">Processes</h2>
              <NeobrutalistButton
                onClick={addProcess}
                variant="secondary"
                className="text-sm py-2 px-4"
              >
                + Add
              </NeobrutalistButton>
            </div>

            <div className="overflow-x-auto">
              <div className="min-w-125">
                <div
                  className={`grid ${isPriorityEnabled ? "grid-cols-12" : "grid-cols-9"} gap-4 py-2 px-2 bg-secondary-highlight border-b-4 border-black font-bold text-xs uppercase tracking-wider`}
                >
                  <div className="col-span-2 text-center">ID</div>
                  <div className="col-span-3">Arrival</div>
                  <div className="col-span-3">Burst</div>
                  {isPriorityEnabled && <div className="col-span-3">Priority</div>}
                  <div className="col-span-1"></div>
                </div>
                <div className="flex flex-col">
                  {processes.map((p) => (
                    <ProcessRow
                      key={p.id}
                      process={p}
                      updateProcess={(id, field, val) => updateProcess(id, field, val)}
                      removeProcess={removeProcess}
                      isPriorityEnabled={isPriorityEnabled}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          <NeobrutalistButton
            className="w-full py-6 text-2xl"
            onClick={handleRunComparison}
          >
            Run Comparison
          </NeobrutalistButton>
        </section>

        {/* Visualization Panel */}
        <section className="lg:col-span-12 flex flex-col gap-8">
          {!Object.keys(comparisonResults).length ? (
            <div className="w-full h-full min-h-125 border-4 border-dashed border-black/30 rounded-none flex flex-col items-center justify-center text-center p-8 bg-background/50">
              <div className="text-6xl mb-4 opacity-20">⚖️</div>
              <h3 className="font-display text-2xl font-bold opacity-40">Comparison Results</h3>
              <p className="font-body text-foreground/40 max-w-sm">
                Select at least two algorithms and run the simulation to see a side-by-side comparison.
              </p>
            </div>
          ) : (
            <div className="flex flex-col gap-8 animate-in fade-in zoom-in-95 duration-500">

              {/* All Gantt Charts stacked in one box */}
              <div className="border-4 border-black bg-white p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                <h3 className="font-display text-2xl font-bold mb-6">Comparative Gantt Charts</h3>
                <div className="flex flex-col gap-12">
                  {Object.entries(comparisonResults).map(([algoId, result]) => (
                    <div key={algoId} className="flex flex-col gap-2">
                      <div className="font-display font-bold text-lg">
                        {algorithmDisplayNames[algoId] ?? algoId}
                      </div>
                      <GanttChart blocks={result.gantt} />
                    </div>
                  ))}
                </div>
              </div>

              {/* Individual result cards one after another */}
              {Object.entries(comparisonResults).map(([algoId, result]) => (
                <div key={algoId} className="border-4 border-black bg-white p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="font-display text-2xl font-bold">
                      {algorithmDisplayNames[algoId] ?? algoId} Results
                    </h3>
                    <div className="bg-secondary-highlight px-3 py-1 border-2 border-black font-bold text-sm">
                      Algorithm {algoId}
                    </div>
                  </div>

                  <ResultTable
                    results={result.results}
                    showPriority={algoId === "PRIORITY"}
                  />

                  <SimulationStats
                    avgWaiting={result.stats.avgWaiting}
                    avgTurnaround={result.stats.avgTurnaround}
                    totalIdle={result.stats.totalIdle}
                  />
                </div>
              ))}

              <ComparisonTurnaroundChart results={comparisonResults} />

            </div>
          )}
        </section>

      </div>
    </main>
  );
}
