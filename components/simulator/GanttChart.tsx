import React from "react";

export interface GanttBlock {
  processId: string;
  start: number;
  end: number;
  color: string;
}

interface GanttChartProps {
  blocks: GanttBlock[];
}

export default function GanttChart({ blocks }: GanttChartProps) {
  if (blocks.length === 0) return null;

  const totalTime = blocks[blocks.length - 1].end;

  return (
    <div className="w-full overflow-x-auto py-8">
      <div
        className="relative h-20 border-4 border-black bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]"
        style={{ width: `${totalTime * 40}px`, minWidth: "100%" }}
      >
        {blocks.map((block, index) => (
          <div
            key={index}
            className="absolute h-full border-r-4 border-black flex items-center justify-center font-display font-bold text-sm transition-all hover:brightness-110 cursor-default"
            style={{
              left: `${block.start * 40}px`,
              width: `${(block.end - block.start) * 40}px`,
              backgroundColor: block.color,
            }}
          >
            {block.processId}
          </div>
        ))}

        {/* Time Markers */}
        <div className="absolute -bottom-3  left-0 w-full flex">
          {Array.from({ length: totalTime + 1 }).map((_, i) => (
            <div
              key={i}
              className="absolute border-l border-black/30 h-4 text-[10px] font-body pl-1"
              style={{ left: `${i * 40}px` }}
            >
              {i}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
