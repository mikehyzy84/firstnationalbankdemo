"use client";

import { useAdmin } from "@/context/AdminContext";

const agentData = [
  { name: "Sarah Chen", open: 3, avgResolution: "14 hours", slaCompliance: 92 },
  { name: "Michael Park", open: 2, avgResolution: "11 hours", slaCompliance: 88 },
  { name: "Jennifer Walsh", open: 4, avgResolution: "22 hours", slaCompliance: 64 },
  { name: "Alex Rivera", open: 1, avgResolution: "8 hours", slaCompliance: 95 },
  { name: "David Kim (Manager)", open: 1, avgResolution: "6 hours", slaCompliance: 97 },
];

export default function PerformancePage() {
  const { tickets } = useAdmin();

  const totalOpen = tickets.filter((t) => t.status !== "Resolved").length;
  const resolvedThisWeek = tickets.filter((t) => t.status === "Resolved").length;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-[#1B4F7A] mb-6">Team Performance</h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded shadow-sm p-4 border-t-2 border-[#006B8F]">
          <div className="text-3xl font-bold text-[#1B4F7A]">{totalOpen}</div>
          <div className="text-sm text-gray-500 mt-1">Total Open Tickets</div>
        </div>
        <div className="bg-white rounded shadow-sm p-4 border-t-2 border-[#006B8F]">
          <div className="text-3xl font-bold text-[#1B4F7A]">14.2h</div>
          <div className="text-sm text-gray-500 mt-1">Avg Resolution Time</div>
        </div>
        <div className="bg-white rounded shadow-sm p-4 border-t-2 border-[#006B8F]">
          <div className="text-3xl font-bold text-[#1B4F7A]">83%</div>
          <div className="text-sm text-gray-500 mt-1">SLA Compliance</div>
        </div>
        <div className="bg-white rounded shadow-sm p-4 border-t-2 border-[#006B8F]">
          <div className="text-3xl font-bold text-[#1B4F7A]">{resolvedThisWeek}</div>
          <div className="text-sm text-gray-500 mt-1">Resolved This Week</div>
        </div>
      </div>

      {/* Agent Table */}
      <div className="bg-white rounded shadow-sm overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-[#1B4F7A] text-white">
              <th className="text-left px-4 py-3 text-sm font-semibold">Agent</th>
              <th className="text-left px-4 py-3 text-sm font-semibold">Open Tickets</th>
              <th className="text-left px-4 py-3 text-sm font-semibold">Avg Resolution Time</th>
              <th className="text-left px-4 py-3 text-sm font-semibold">SLA Compliance</th>
            </tr>
          </thead>
          <tbody>
            {agentData.map((agent, index) => {
              const isLowSLA = agent.slaCompliance < 85;
              return (
                <tr
                  key={agent.name}
                  className={isLowSLA ? "bg-red-50" : index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                >
                  <td className="px-4 py-3 text-sm text-gray-800 font-medium">{agent.name}</td>
                  <td className="px-4 py-3 text-sm text-gray-700">{agent.open}</td>
                  <td className="px-4 py-3 text-sm text-gray-700">{agent.avgResolution}</td>
                  <td className="px-4 py-3 text-sm">
                    <span
                      className={
                        agent.slaCompliance >= 85
                          ? "text-green-600 font-semibold"
                          : "text-red-600 font-semibold"
                      }
                    >
                      {agent.slaCompliance}%
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
