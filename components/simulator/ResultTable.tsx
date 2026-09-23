import React from "react";

export interface ProcessResult {
  id: string;
  arrivalTime: number;
  burstTime: number;
  completionTime: number;
  turnaroundTime: number;
  waitingTime: number;
}

interface ResultTableProps {
  results: ProcessResult[];
}

export default function ResultTable({ results }: ResultTableProps) {
  if (results.length === 0) return null;

  return (
    <div className="w-full overflow-x-auto mt-8">
      <table className="w-full border-collapse border-4 border-black bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
        <thead>
          <tr className="bg-secondary-highlight border-b-4 border-black">
            <th className="border-r-4 border-black p-3 text-left font-display font-bold uppercase text-sm">Process</th>
            <th className="border-r-4 border-black p-3 text-center font-display font-bold uppercase text-sm">AT</th>
            <th className="border-r-4 border-black p-3 text-center font-display font-bold uppercase text-sm">BT</th>
            <th className="border-r-4 border-black p-3 text-center font-display font-bold uppercase text-sm">CT</th>
            <th className="border-r-4 border-black p-3 text-center font-display font-bold uppercase text-sm">TAT</th>
            <th className="border-r-4 border-black p-3 text-center font-display font-bold uppercase text-sm">WT</th>
          </tr>
        </thead>
        <tbody>
          {results.map((res, idx) => (
            <tr key={idx} className="border-b-4 border-black last:border-b-0 hover:bg-primary-highlight/10 transition-colors">
              <td className="border-r-4 border-black p-3 font-display font-bold">{res.id}</td>
              <td className="border-r-4 border-black p-3 text-center font-body">{res.arrivalTime}</td>
              <td className="border-r-4 border-black p-3 text-center font-body">{res.burstTime}</td>
              <td className="border-r-4 border-black p-3 text-center font-body">{res.completionTime}</td>
              <td className="border-r-4 border-black p-3 text-center font-body">{res.turnaroundTime}</td>
              <td className="border-r-4 border-black p-3 text-center font-body">{res.waitingTime}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
