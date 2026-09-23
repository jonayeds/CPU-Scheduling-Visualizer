import React from "react";
import NeobrutalistInput from "./NeobrutalistInput";

interface ProcessRowProps {
  process: { id: string; arrivalTime: string; burstTime: string; priority: string };
  updateProcess: (id: string, field: string, value: string) => void;
  removeProcess: (id: string) => void;
  isPriorityEnabled: boolean;
}

export default function ProcessRow({
  process,
  updateProcess,
  removeProcess,
  isPriorityEnabled,
}: ProcessRowProps) {
  return (
    <div
      className={`grid ${isPriorityEnabled ? "grid-cols-12" : "grid-cols-9"} gap-4 items-center py-3 border-b-4 border-black/10 last:border-b-0`}
    >
      <div className="col-span-2 font-body font-bold text-center">
        P{process.id.slice(0, 4)}
      </div>
      <div className="col-span-3">
        <NeobrutalistInput
          label="Arrival"
          value={process.arrivalTime}
          onChange={(val) => updateProcess(process.id, "arrivalTime", val)}
        />
      </div>
      <div className="col-span-3">
        <NeobrutalistInput
          label="Burst"
          value={process.burstTime}
          onChange={(val) => updateProcess(process.id, "burstTime", val)}
        />
      </div>
      {isPriorityEnabled && (
        <div className="col-span-3">
          <NeobrutalistInput
            label="Priority"
            value={process.priority}
            onChange={(val) => updateProcess(process.id, "priority", val)}
          />
        </div>
      )}
      <div className="col-span-1 flex justify-center">
        <button
          onClick={() => removeProcess(process.id)}
          className="text-red-500 hover:text-red-700 font-bold text-xl"
        >
          ✕
        </button>
      </div>
    </div>
  );
}
