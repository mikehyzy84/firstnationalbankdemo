"use client";

import { useAdmin, Ticket } from "@/context/AdminContext";
import TicketCard from "./TicketCard";

const COLUMNS: { status: Ticket["status"]; label: string; borderClass: string; badgeClass: string }[] = [
  { status: "New", label: "New", borderClass: "border-l-4 border-[#006B8F]", badgeClass: "bg-[#006B8F] text-white" },
  { status: "In Progress", label: "In Progress", borderClass: "border-l-4 border-yellow-400", badgeClass: "bg-yellow-400 text-yellow-900" },
  { status: "Escalated", label: "Escalated", borderClass: "border-l-4 border-[#A01E22]", badgeClass: "bg-[#A01E22] text-white" },
  { status: "Resolved", label: "Resolved", borderClass: "border-l-4 border-green-500", badgeClass: "bg-green-500 text-white" },
];

const PRIORITY_ORDER: Record<Ticket["priority"], number> = {
  Critical: 0,
  High: 1,
  Medium: 2,
  Low: 3,
};

function sortTickets(tickets: Ticket[]): Ticket[] {
  return [...tickets].sort((a, b) => {
    // FNB-4721 always first in its column
    if (a.id === "FNB-4721") return -1;
    if (b.id === "FNB-4721") return 1;
    const priorityDiff = PRIORITY_ORDER[a.priority] - PRIORITY_ORDER[b.priority];
    if (priorityDiff !== 0) return priorityDiff;
    return b.currentHoursElapsed - a.currentHoursElapsed;
  });
}

export default function KanbanBoard() {
  const { tickets } = useAdmin();

  return (
    <div className="p-6 h-full">
      <h1 className="text-2xl font-bold text-[#1B4F7A] mb-6">Ticket Queue</h1>
      <div className="flex gap-4 overflow-x-auto pb-4 h-full">
        {COLUMNS.map(({ status, label, borderClass, badgeClass }) => {
          const colTickets = sortTickets(tickets.filter((t) => t.status === status));
          return (
            <div key={status} className="flex-1 min-w-[260px] flex flex-col">
              {/* Column header */}
              <div className={`bg-white rounded shadow-sm p-3 mb-3 ${borderClass}`}>
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-sm text-gray-700">{label}</span>
                  <span className={`text-xs px-1.5 py-0.5 rounded-full font-semibold ${badgeClass}`}>
                    {colTickets.length}
                  </span>
                </div>
              </div>
              {/* Tickets */}
              <div className="flex-1 overflow-y-auto">
                {colTickets.map((ticket) => (
                  <TicketCard key={ticket.id} ticket={ticket} />
                ))}
                {colTickets.length === 0 && (
                  <div className="text-xs text-gray-400 text-center py-6">No tickets</div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
