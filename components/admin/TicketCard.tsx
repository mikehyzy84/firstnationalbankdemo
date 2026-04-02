"use client";

import { UserCircle } from "lucide-react";
import { useAdmin, Ticket } from "@/context/AdminContext";

function priorityBadge(priority: Ticket["priority"]) {
  switch (priority) {
    case "Low":
      return "bg-gray-100 text-gray-600";
    case "Medium":
      return "bg-blue-100 text-blue-700";
    case "High":
      return "bg-orange-100 text-orange-700";
    case "Critical":
      return "bg-red-100 text-red-700 font-bold";
  }
}

function statusBorderColor(status: Ticket["status"]) {
  switch (status) {
    case "New":
      return "border-l-[#006B8F]";
    case "In Progress":
      return "border-l-yellow-400";
    case "Escalated":
      return "border-l-[#A01E22]";
    case "Resolved":
      return "border-l-green-500";
  }
}

function slaDisplay(currentHoursElapsed: number) {
  const slaRemaining = 24 - currentHoursElapsed;
  if (slaRemaining > 0) {
    const h = Math.floor(slaRemaining);
    const m = Math.round((slaRemaining - h) * 60);
    const label = `${h}h ${m}m remaining`;
    if (slaRemaining > 20) return { label, color: "text-green-600" };
    if (slaRemaining > 12) return { label, color: "text-yellow-600" };
    if (slaRemaining > 4) return { label, color: "text-orange-500" };
    return { label, color: "text-red-600 animate-pulse" };
  } else {
    const breachedHours = Math.abs(slaRemaining);
    const h = Math.floor(breachedHours);
    const m = Math.round((breachedHours - h) * 60);
    return {
      label: `Breached ${h}h ${m}m ago`,
      color: "text-red-600 animate-pulse",
    };
  }
}

function formatCreated(hours: number) {
  if (hours < 1) return "< 1h ago";
  if (hours < 24) return `${Math.floor(hours)}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}

export default function TicketCard({ ticket }: { ticket: Ticket }) {
  const { selectTicket } = useAdmin();
  const sla = slaDisplay(ticket.currentHoursElapsed);

  return (
    <div
      onClick={() => selectTicket(ticket.id)}
      className={`bg-white rounded shadow-sm border border-gray-200 hover:shadow-md cursor-pointer p-3 mb-2 border-l-4 ${statusBorderColor(ticket.status)}`}
    >
      {/* Row 1: ID + Priority badge */}
      <div className="flex items-center justify-between mb-1">
        <span className="text-xs text-gray-500 font-mono">{ticket.id}</span>
        <span className={`text-xs px-1.5 py-0.5 rounded ${priorityBadge(ticket.priority)}`}>
          {ticket.priority}
        </span>
      </div>

      {/* Row 2: Customer name */}
      <div className="font-semibold text-sm text-[#1B4F7A] mb-0.5">{ticket.customer}</div>

      {/* Row 3: Issue summary */}
      <div className="text-xs text-gray-600 truncate mb-1">{ticket.issue}</div>

      {/* Row 4: Agent */}
      <div className="flex items-center gap-1 text-xs text-gray-500 mb-1">
        <UserCircle size={12} />
        <span>{ticket.agent}</span>
      </div>

      {/* Row 5: SLA + created time */}
      <div className="flex items-center justify-between">
        <span className={`text-xs font-medium ${sla.color}`}>{sla.label}</span>
        <span className="text-xs text-gray-400">{formatCreated(ticket.currentHoursElapsed)}</span>
      </div>
    </div>
  );
}
