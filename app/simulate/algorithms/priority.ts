import type { GanttBlock } from "@/components/simulator/GanttChart";
import type { ProcessResult } from "@/components/simulator/ResultTable";
import type { SchedulingProcess, SimulationResult } from "./fcfs";

const processColors = ["#E1FF3A", "#F6BC84", "#A8E6CF", "#FF9AA2", "#B5D8EB"];

export function runPriority(processes: SchedulingProcess[]): SimulationResult {
  const pendingProcesses = processes.map((process, index) => ({
    ...process,
    index,
    arrivalTime: Math.max(0, Number(process.arrivalTime) || 0),
    burstTime: Math.max(0, Number(process.burstTime) || 0),
    priority: Number(process.priority) || 0,
  }));

  let currentTime = 0;
  let idleTime = 0;
  const gantt: GanttBlock[] = [];
  const results: ProcessResult[] = [];
  let scheduledCount = 0;

  while (pendingProcesses.length > 0) {
    const availableProcesses = pendingProcesses.filter(
      (process) => process.arrivalTime <= currentTime
    );

    if (availableProcesses.length === 0) {
      const nextArrival = Math.min(
        ...pendingProcesses.map((process) => process.arrivalTime)
      );

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

    const nextProcess = availableProcesses.reduce((highestPriority, process) => {
      if (process.priority !== highestPriority.priority) {
        return process.priority < highestPriority.priority ? process : highestPriority;
      }

      if (process.arrivalTime !== highestPriority.arrivalTime) {
        return process.arrivalTime < highestPriority.arrivalTime
          ? process
          : highestPriority;
      }

      return process.index < highestPriority.index ? process : highestPriority;
    });
    const processIndex = pendingProcesses.indexOf(nextProcess);
    pendingProcesses.splice(processIndex, 1);

    const processLabel = `P${nextProcess.id.slice(0, 4)}`;
    const startTime = currentTime;
    const completionTime = startTime + nextProcess.burstTime;
    const turnaroundTime = completionTime - nextProcess.arrivalTime;
    const waitingTime = turnaroundTime - nextProcess.burstTime;

    gantt.push({
      processId: processLabel,
      start: startTime,
      end: completionTime,
      color: processColors[scheduledCount % processColors.length],
    });

    results.push({
      id: processLabel,
      arrivalTime: nextProcess.arrivalTime,
      burstTime: nextProcess.burstTime,
      priority: nextProcess.priority,
      completionTime,
      turnaroundTime,
      waitingTime,
    });

    currentTime = completionTime;
    scheduledCount += 1;
  }

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