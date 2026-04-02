"use client";

import { useState, useEffect } from "react";
import { X, Mail } from "lucide-react";
import { useAdmin, Ticket } from "@/context/AdminContext";

const VOICE_TRANSCRIPT = [
  { speaker: "Santosh AI Agent", text: "Thank you for calling First National Bank. I'm Santosh, your AI banking assistant. How can I help you today?" },
  { speaker: "Customer", text: "Yeah, I've got a charge on my account I don't recognize. AMZ Digital Services, $47.99." },
  { speaker: "Santosh AI Agent", text: "I'm sorry to hear that. Let me pull up your account. I can see the charge posted yesterday at 11:42 PM. I'm creating a support ticket right now and flagging this for our fraud review team. You'll receive a call back within 24 hours. Is there anything else I can help you with?" },
  { speaker: "Customer", text: "No, that's it. Thanks." },
  { speaker: "Santosh AI Agent", text: "Ticket FNB-4721 has been created. Our team will be in touch shortly." },
];

const AGENTS = ["Sarah Chen", "Michael Park", "Jennifer Walsh", "Alex Rivera", "David Kim"];

function statusBadgeClass(status: Ticket["status"]) {
  switch (status) {
    case "New": return "bg-blue-100 text-blue-700";
    case "In Progress": return "bg-yellow-100 text-yellow-700";
    case "Escalated": return "bg-red-100 text-red-700";
    case "Resolved": return "bg-green-100 text-green-700";
  }
}

function slaDisplay(currentHoursElapsed: number) {
  const slaRemaining = 24 - currentHoursElapsed;
  if (slaRemaining > 0) {
    const h = Math.floor(slaRemaining);
    const m = Math.round((slaRemaining - h) * 60);
    const label = `${h}h ${m}m`;
    const sublabel = "SLA REMAINING";
    if (slaRemaining > 20) return { label, sublabel, color: "text-green-600" };
    if (slaRemaining > 12) return { label, sublabel, color: "text-yellow-600" };
    if (slaRemaining > 4) return { label, sublabel, color: "text-orange-500" };
    return { label, sublabel, color: "text-red-600" };
  } else {
    const breachedHours = Math.abs(slaRemaining);
    const h = Math.floor(breachedHours);
    const m = Math.round((breachedHours - h) * 60);
    return { label: `${h}h ${m}m`, sublabel: "SLA BREACHED", color: "text-red-600" };
  }
}

export default function TicketDetail() {
  const { tickets, selectedTicketId, selectTicket, updateTicketStatus, updateTicketAgent, updateTicketNotes } = useAdmin();
  const [localNotes, setLocalNotes] = useState("");

  const ticket = tickets.find((t) => t.id === selectedTicketId) ?? null;

  useEffect(() => {
    if (ticket) {
      setLocalNotes(ticket.internalNotes);
    }
  }, [ticket?.id]);

  if (!ticket) return null;

  const sla = slaDisplay(ticket.currentHoursElapsed);

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/30 z-40"
        onClick={() => selectTicket(null)}
      />

      {/* Panel */}
      <div className="fixed right-0 top-0 h-full w-[480px] bg-white shadow-2xl z-50 overflow-y-auto">
        {/* Header */}
        <div className="flex items-start justify-between p-4 border-b border-gray-200">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="font-mono text-lg font-bold text-[#1B4F7A]">{ticket.id}</span>
              <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${statusBadgeClass(ticket.status)}`}>
                {ticket.status}
              </span>
            </div>
            <div className="text-xl font-semibold text-gray-800">{ticket.customer}</div>
          </div>
          <button
            onClick={() => selectTicket(null)}
            className="text-gray-400 hover:text-gray-600 p-1 rounded hover:bg-gray-100 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-4 space-y-4">
          {/* Customer Info */}
          <div className="bg-gray-50 rounded p-3">
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div>
                <div className="text-xs text-gray-500 uppercase tracking-wider mb-0.5">Account Type</div>
                <div className="text-gray-800 font-medium">{ticket.accountType}</div>
              </div>
              <div>
                <div className="text-xs text-gray-500 uppercase tracking-wider mb-0.5">Phone</div>
                <div className="text-gray-800">{ticket.phone}</div>
              </div>
              <div>
                <div className="text-xs text-gray-500 uppercase tracking-wider mb-0.5">Email</div>
                <div className="text-gray-800 truncate">{ticket.email}</div>
              </div>
              <div>
                <div className="text-xs text-gray-500 uppercase tracking-wider mb-0.5">Member Since</div>
                <div className="text-gray-800">{ticket.memberSince}</div>
              </div>
            </div>
          </div>

          {/* SLA countdown */}
          <div className="text-center py-3">
            <div className={`text-4xl font-bold ${sla.color}`}>{sla.label}</div>
            <div className={`text-xs font-semibold tracking-wider mt-1 ${sla.color}`}>{sla.sublabel}</div>
          </div>

          {/* Voice Transcript — FNB-4721 only */}
          {ticket.id === "FNB-4721" && (
            <div>
              <h3 className="text-sm font-semibold text-gray-700 mb-2">
                Voice Transcript — Santosh AI Agent
              </h3>
              <div className="bg-gray-100 rounded p-3 space-y-2">
                {VOICE_TRANSCRIPT.map((line, i) => (
                  <div key={i}>
                    <span
                      className={`text-xs font-semibold ${
                        line.speaker === "Santosh AI Agent"
                          ? "text-[#006B8F]"
                          : "text-gray-500"
                      }`}
                    >
                      {line.speaker}:
                    </span>
                    <span className="text-xs text-gray-700 ml-1 font-mono">{line.text}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Issue Description */}
          <div>
            <h3 className="text-sm font-semibold text-gray-700 mb-2">Issue Description</h3>
            <p className="text-sm text-gray-700 leading-relaxed">{ticket.description}</p>
          </div>

          {/* Action Timeline */}
          <div>
            <h3 className="text-sm font-semibold text-gray-700 mb-2">Action Timeline</h3>
            <div className="space-y-0">
              {/* Ticket created */}
              <TimelineItem color="bg-[#006B8F]">
                <div className="text-sm text-gray-700">Ticket created by AI Voice Agent — Santosh</div>
                <div className="text-xs text-gray-400">{ticket.createdHoursAgo}h ago</div>
              </TimelineItem>

              {/* Assigned */}
              <TimelineItem color="bg-gray-400">
                <div className="text-sm text-gray-700">Assigned to {ticket.agent}</div>
                <div className="text-xs text-gray-400">{ticket.createdHoursAgo}h ago</div>
              </TimelineItem>

              {/* Escalated to manager */}
              {ticket.escalatedToManager && (
                <TimelineItem color="bg-orange-400">
                  <div className="text-sm text-orange-700 font-medium">
                    Escalated to {ticket.escalatedToManager} — SLA threshold reached (24 hours)
                  </div>
                </TimelineItem>
              )}

              {/* Escalated to senior */}
              {ticket.escalatedToSenior && (
                <TimelineItem color="bg-[#A01E22]" last>
                  <div className="text-sm text-red-700 font-medium flex items-start gap-1.5">
                    <Mail size={14} className="mt-0.5 flex-shrink-0" />
                    <span>
                      Escalated to {ticket.escalatedToSenior} — 72-hour threshold reached. Email notification sent to all stakeholders.
                    </span>
                  </div>
                </TimelineItem>
              )}
            </div>
          </div>

          {/* Controls */}
          <div className="space-y-3">
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1 uppercase tracking-wider">
                Assigned Agent
              </label>
              <select
                value={ticket.agent}
                onChange={(e) => updateTicketAgent(ticket.id, e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#006B8F]"
              >
                {AGENTS.map((a) => (
                  <option key={a} value={a}>{a}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1 uppercase tracking-wider">
                Status
              </label>
              <select
                value={ticket.status}
                onChange={(e) => updateTicketStatus(ticket.id, e.target.value as Ticket["status"])}
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#006B8F]"
              >
                <option value="New">New</option>
                <option value="In Progress">In Progress</option>
                <option value="Escalated">Escalated</option>
                <option value="Resolved">Resolved</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1 uppercase tracking-wider">
                Internal Notes
              </label>
              <textarea
                value={localNotes}
                onChange={(e) => setLocalNotes(e.target.value)}
                onBlur={() => updateTicketNotes(ticket.id, localNotes)}
                rows={3}
                placeholder="Add internal notes..."
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm resize-none focus:outline-none focus:ring-1 focus:ring-[#006B8F]"
              />
            </div>

            <button
              onClick={() => updateTicketStatus(ticket.id, "Resolved")}
              className="w-full bg-green-600 hover:bg-green-700 text-white rounded py-2 text-sm font-semibold transition-colors"
            >
              Resolve Ticket
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

function TimelineItem({
  children,
  color,
  last,
}: {
  children: React.ReactNode;
  color: string;
  last?: boolean;
}) {
  return (
    <div className="flex gap-3">
      <div className="flex flex-col items-center">
        <div className={`w-2.5 h-2.5 rounded-full flex-shrink-0 mt-1 ${color}`} />
        {!last && <div className="w-px flex-1 bg-gray-200 my-1" style={{ minHeight: 16 }} />}
      </div>
      <div className="pb-3 flex-1">{children}</div>
    </div>
  );
}
