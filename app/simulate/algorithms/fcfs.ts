import type { GanttBlock } from "@/components/simulator/GanttChart";
import type { ProcessResult } from "@/components/simulator/ResultTable";

export interface SchedulingProcess {
  id: string;
  arrivalTime: string;
  burstTime: string;
  priority: string;
}

export interface SimulationResult {
  gantt: GanttBlock[];
  results: ProcessResult[];
  stats: {
    avgWaiting: number;
    avgTurnaround: number;
    avgIdle: number;
  };
}

const processColors = ["#E1FF3A", "#F6BC84", "#A8E6CF", "#FF9AA2", "#B5D8EB"];

export function runFcfs(processes: SchedulingProcess[]): SimulationResult {
  const orderedProcesses = processes
    .map((process, index) => ({
      ...process,
      index,
      arrivalTime: Math.max(0, Number(process.arrivalTime) || 0),
      burstTime: Math.max(0, Number(process.burstTime) || 0),
    }))
    .sort((first, second) =>
      first.arrivalTime - second.arrivalTime || first.index - second.index
    );

  let currentTime = 0;
  let idleTime = 0;
  const gantt: GanttBlock[] = [];
  const results: ProcessResult[] = [];

  orderedProcesses.forEach((process, index) => {
    const processLabel = `P${process.id.slice(0, 4)}`;

    if (currentTime < process.arrivalTime) {
      gantt.push({
        processId: "IDLE",
        start: currentTime,
        end: process.arrivalTime,
        color: "#E5E7EB",
      });
      idleTime += process.arrivalTime - currentTime;
      currentTime = process.arrivalTime;
    }

    const startTime = currentTime;
    const completionTime = startTime + process.burstTime;
    const turnaroundTime = completionTime - process.arrivalTime;
    const waitingTime = turnaroundTime - process.burstTime;

    gantt.push({
      processId: processLabel,
      start: startTime,
      end: completionTime,
      color: processColors[index % processColors.length],
    });

    results.push({
      id: processLabel,
      arrivalTime: process.arrivalTime,
      burstTime: process.burstTime,
      completionTime,
      turnaroundTime,
      waitingTime,
    });

    currentTime = completionTime;
  });

  const processCount = results.length || 1;

  return {
    gantt,
    results,
    stats: {
      avgWaiting: results.reduce((total, result) => total + result.waitingTime, 0) / processCount,
      avgTurnaround:
        results.reduce((total, result) => total + result.turnaroundTime, 0) / processCount,
      avgIdle: idleTime / processCount,
    },
  };
}
