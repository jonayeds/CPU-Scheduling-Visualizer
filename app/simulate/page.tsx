"use client";

import React, { useState } from "react";
import AlgorithmSelector from "@/components/simulator/AlgorithmSelector";
import ProcessRow from "@/components/simulator/ProcessRow";
import NeobrutalistButton from "@/components/simulator/NeobrutalistButton";
import NeobrutalistInput from "@/components/simulator/NeobrutalistInput";

interface Process {
  id: string;
  arrivalTime: string;
  burstTime: string;
  priority: string;
}

export default function SimulatePage() {
  const [algorithm, setAlgorithm] = useState("FCFS");
  const [timeQuantum, setTimeQuantum] = useState("2");
  const [processes, setProcesses] = useState<Process[]>([
    { id: crypto.randomUUID(), arrivalTime: "0", burstTime: "5", priority: "1" },
    { id: crypto.randomUUID(), arrivalTime: "1", burstTime: "3", priority: "2" },
  ]);

  const addProcess = () => {
    setProcesses([
      ...processes,
      { id: crypto.randomUUID(), arrivalTime: "0", burstTime: "1", priority: "1" },
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

  return (
    <main className="min-h-screen bg-background p-4 md:p-8 flex flex-col items-center">
      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-12 gap-8">

        {/* Configuration Panel */}
        <div className="lg:col-span-2"></div>
        <section className="lg:col-span-8 flex flex-col gap-8">
          <div className="border-4 border-black bg-white p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <h2 className="font-display text-3xl font-bold mb-6">Simulation Config</h2>

            <div className="flex flex-col gap-6">
              <div>
                <label className="font-body font-bold uppercase text-xs tracking-wider mb-3 block">
                  Select Algorithm
                </label>
                <AlgorithmSelector
                  selectedAlgorithm={algorithm}
                  setSelectedAlgorithm={setAlgorithm}
                />
              </div>

              {algorithm === "RR" && (
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
                  className={`grid ${algorithm === "PRIORITY" ? "grid-cols-12" : "grid-cols-9"} gap-4 py-2 px-2 bg-secondary-highlight border-b-4 border-black font-bold text-xs uppercase tracking-wider`}
                >
                  <div className="col-span-2 text-center">ID</div>
                  <div className="col-span-3">Arrival</div>
                  <div className="col-span-3">Burst</div>
                  {algorithm === "PRIORITY" && <div className="col-span-3">Priority</div>}
                  <div className="col-span-1"></div>
                </div>
                <div className="flex flex-col">
                  {processes.map((p) => (
                    <ProcessRow
                      key={p.id}
                      process={p}
                      updateProcess={(id, field, val) =>
                        updateProcess(id, field as keyof Process, val)
                      }
                      removeProcess={removeProcess}
                      isPriorityEnabled={algorithm === "PRIORITY"}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          <NeobrutalistButton
            className="w-full py-6 text-2xl"
            onClick={() => alert(`Running ${algorithm} with ${processes.length} processes...`)}
          >
            Run Simulation
          </NeobrutalistButton>
        </section>

        {/* Results Placeholder */}
        <section className="lg:col-span-12 flex items-center justify-center">
          <div className="w-full h-full min-h-100 border-4 border-dashed border-black/30 rounded-none flex flex-col items-center justify-center text-center p-8 bg-background/50">
            <div className="text-6xl mb-4 opacity-20">📊</div>
            <h3 className="font-display text-2xl font-bold opacity-40">Simulation Results</h3>
            <p className="font-body text-foreground/40 max-w-sm">
              Configure your processes and select an algorithm to visualize the scheduling sequence.
            </p>
          </div>
        </section>

      </div>
    </main>
  );
}
