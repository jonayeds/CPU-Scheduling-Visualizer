import type { GanttBlock } from "@/components/simulator/GanttChart";
import type { ProcessResult } from "@/components/simulator/ResultTable";
import type { SchedulingProcess, SimulationResult } from "./fcfs";

const processColors = ["#E1FF3A", "#F6BC84", "#A8E6CF", "#FF9AA2", "#B5D8EB"];

export function runRoundRobin(
  processes: SchedulingProcess[],
  quantumValue: string
): SimulationResult {
  const quantum = Math.max(1, Number(quantumValue) || 1);
  const pendingProcesses = processes.map((process, index) => ({
    ...process,
    index,
    arrivalTime: Math.max(0, Number(process.arrivalTime) || 0),
    burstTime: Math.max(0, Number(process.burstTime) || 0),
    remainingTime: Math.max(0, Number(process.burstTime) || 0),
    completionTime: Math.max(0, Number(process.arrivalTime) || 0),
  }));

  const orderedProcesses = [...pendingProcesses].sort(
    (first, second) =>
      first.arrivalTime - second.arrivalTime || first.index - second.index
  );
  const readyQueue: typeof pendingProcesses = [];
  const gantt: GanttBlock[] = [];
  let currentTime = 0;
  let idleTime = 0;
  let nextArrivalIndex = 0;
  let completedCount = pendingProcesses.filter(
    (process) => process.remainingTime === 0
  ).length;

  const addArrivedProcesses = () => {
    while (
      nextArrivalIndex < orderedProcesses.length &&
      orderedProcesses[nextArrivalIndex].arrivalTime <= currentTime
    ) {
      const process = orderedProcesses[nextArrivalIndex];
      if (process.remainingTime > 0) readyQueue.push(process);
      nextArrivalIndex += 1;
    }
  };

  while (completedCount < pendingProcesses.length) {
    addArrivedProcesses();

    if (readyQueue.length === 0) {
      const nextArrival = orderedProcesses[nextArrivalIndex]?.arrivalTime;
      if (nextArrival === undefined) break;

      gantt.push({
        processId: "IDLE",
        start: currentTime,
        end: nextArrival,
        color: "#E5E7EB",
      });
      idleTime += nextArrival - currentTime;
      currentTime = nextArrival;
      continue;
    }

    const process = readyQueue.shift();
    if (!process) continue;

    const runTime = Math.min(quantum, process.remainingTime);
    const processLabel = `P${process.id}`;

    gantt.push({
      processId: processLabel,
      start: currentTime,
      end: currentTime + runTime,
      color: processColors[process.index % processColors.length],
    });

    currentTime += runTime;
    process.remainingTime -= runTime;
    addArrivedProcesses();

    if (process.remainingTime > 0) {
      readyQueue.push(process);
    } else {
      process.completionTime = currentTime;
      completedCount += 1;
    }
  }

  const results: ProcessResult[] = pendingProcesses
    .sort((first, second) => first.index - second.index)
    .map((process) => {
      const turnaroundTime = process.completionTime - process.arrivalTime;

      return {
        id: `P${process.id}`,
        arrivalTime: process.arrivalTime,
        burstTime: process.burstTime,
        completionTime: process.completionTime,
        turnaroundTime,
        waitingTime: turnaroundTime - process.burstTime,
      };
    });

  const processCount = results.length || 1;

  return {
    gantt,
    results,
    stats: {
      avgWaiting:
        results.reduce((total, result) => total + result.waitingTime, 0) / processCount,
      avgTurnaround:
        results.reduce((total, result) => total + result.turnaroundTime, 0) / processCount,
      totalIdle: idleTime,
    },
  };
}