"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

export interface Ticket {
  id: string;
  customer: string;
  accountType: string;
  phone: string;
  email: string;
  memberSince: string;
  issue: string;
  description: string;
  agent: string;
  status: "New" | "In Progress" | "Escalated" | "Resolved";
  priority: "Low" | "Medium" | "High" | "Critical";
  createdHoursAgo: number;
  currentHoursElapsed: number;
  escalatedToManager?: string;
  escalatedToSenior?: string;
  emailSent?: boolean;
  resolvedAt?: string;
  internalNotes: string;
}

const INITIAL_TICKETS: Ticket[] = [
  {
    id: "FNB-4721",
    customer: "Elon Musk",
    accountType: "Premium Checking",
    phone: "(412) 555-0182",
    email: "e.musk@teslax.com",
    memberSince: "2019",
    issue: "Unrecognized charge from AMZ Digital Services ($47.99)",
    description:
      "Customer reports an unrecognized charge of $47.99 from 'AMZ Digital Services' appearing on their statement dated yesterday. Customer states they did not authorize this transaction and requests immediate investigation and reversal.",
    agent: "Sarah Chen",
    status: "New",
    priority: "Medium",
    createdHoursAgo: 2,
    currentHoursElapsed: 2,
    internalNotes: "",
  },
  {
    id: "FNB-4718",
    customer: "James Rodriguez",
    accountType: "Business Checking",
    phone: "(412) 555-0247",
    email: "j.rodriguez@jrbiz.com",
    memberSince: "2015",
    issue: "Wire transfer sent to incorrect account",
    description:
      "Customer initiated a wire transfer of $15,000 to account ending in 4821 but funds were routed to incorrect account. Customer requests immediate recall of funds and correction of routing error.",
    agent: "Michael Park",
    status: "In Progress",
    priority: "High",
    createdHoursAgo: 18,
    currentHoursElapsed: 18,
    internalNotes: "",
  },
  {
    id: "FNB-4715",
    customer: "Patricia Williams",
    accountType: "Savings Plus",
    phone: "(412) 555-0391",
    email: "p.williams@email.com",
    memberSince: "2011",
    issue: "Overdraft fee dispute, insufficient notification",
    description:
      "Customer disputes three consecutive overdraft fees totaling $105. States she received no push notification or email warning before fees were applied. Requests fee reversal and review of notification settings.",
    agent: "Sarah Chen",
    status: "Escalated",
    priority: "High",
    createdHoursAgo: 26,
    currentHoursElapsed: 26,
    escalatedToManager: "David Kim",
    internalNotes: "",
  },
  {
    id: "FNB-4710",
    customer: "Robert Chen",
    accountType: "Business Premium",
    phone: "(412) 555-0458",
    email: "r.chen@chenenterprises.com",
    memberSince: "2008",
    issue: "Business checking unauthorized ACH debit ($8,200)",
    description:
      "Large unauthorized ACH debit of $8,200 from business checking account. Customer has no record of authorizing this transaction. Potential fraud. Immediate account review and hold recommended.",
    agent: "Jennifer Walsh",
    status: "Escalated",
    priority: "Critical",
    createdHoursAgo: 74,
    currentHoursElapsed: 74,
    escalatedToManager: "David Kim",
    escalatedToSenior: "Margaret Foster",
    emailSent: true,
    internalNotes: "",
  },
  {
    id: "FNB-4708",
    customer: "Maria Santos",
    accountType: "Home Equity",
    phone: "(412) 555-0513",
    email: "m.santos@email.com",
    memberSince: "2017",
    issue: "Mortgage payment posted twice",
    description:
      "Auto-pay mortgage payment of $2,340 was debited from checking account twice on the same day. Customer requests immediate reversal of duplicate payment and confirmation that credit has been applied.",
    agent: "Michael Park",
    status: "In Progress",
    priority: "High",
    createdHoursAgo: 8,
    currentHoursElapsed: 8,
    internalNotes: "",
  },
  {
    id: "FNB-4703",
    customer: "David Thompson",
    accountType: "Rewards Checking",
    phone: "(412) 555-0629",
    email: "d.thompson@email.com",
    memberSince: "2020",
    issue: "Credit card annual fee charged in error",
    description:
      "Customer was charged the $95 annual fee for a credit card that was downgraded to a no-fee product 6 months ago. Requests refund of annual fee and confirmation of account type.",
    agent: "Alex Rivera",
    status: "Resolved",
    priority: "Low",
    createdHoursAgo: 4,
    currentHoursElapsed: 4,
    resolvedAt: "Resolved in 3.5 hours",
    internalNotes: "",
  },
  {
    id: "FNB-4699",
    customer: "Susan Miller",
    accountType: "Mobile Banking",
    phone: "(412) 555-0714",
    email: "s.miller@email.com",
    memberSince: "2022",
    issue: "Mobile deposit not crediting after 3 days",
    description:
      "Check deposit of $1,200 made via mobile app three days ago is still showing as pending. Customer needs funds available urgently. Requires investigation of mobile deposit processing queue.",
    agent: "Jennifer Walsh",
    status: "New",
    priority: "Medium",
    createdHoursAgo: 1,
    currentHoursElapsed: 1,
    internalNotes: "",
  },
  {
    id: "FNB-4695",
    customer: "Thomas Anderson",
    accountType: "Business Line",
    phone: "(412) 555-0836",
    email: "t.anderson@andersonco.com",
    memberSince: "2013",
    issue: "Business line of credit rate discrepancy",
    description:
      "Customer's business line of credit is showing an interest rate of 9.75% on their statement, however their loan agreement specifies 7.25%. Requests rate correction and retroactive adjustment.",
    agent: "Alex Rivera",
    status: "In Progress",
    priority: "Medium",
    createdHoursAgo: 14,
    currentHoursElapsed: 14,
    internalNotes: "",
  },
];

interface AdminContextType {
  tickets: Ticket[];
  advancedHours: number;
  selectedTicketId: string | null;
  activeAdminPage: "tickets" | "performance" | "settings";
  advanceTime: (hours: number) => void;
  resetAll: () => void;
  selectTicket: (id: string | null) => void;
  updateTicketStatus: (id: string, status: Ticket["status"]) => void;
  updateTicketAgent: (id: string, agent: string) => void;
  updateTicketNotes: (id: string, notes: string) => void;
  setActiveAdminPage: (page: "tickets" | "performance" | "settings") => void;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

function applyTimeLogic(tickets: Ticket[], totalAdvancedHours: number): Ticket[] {
  return tickets.map((ticket) => {
    if (ticket.status === "Resolved") {
      return {
        ...ticket,
        currentHoursElapsed: ticket.createdHoursAgo + totalAdvancedHours,
      };
    }

    const newElapsed = ticket.createdHoursAgo + totalAdvancedHours;
    let updatedTicket: Ticket = { ...ticket, currentHoursElapsed: newElapsed };

    if (
      newElapsed >= 72 &&
      ticket.priority === "Critical" &&
      !updatedTicket.escalatedToSenior
    ) {
      updatedTicket = {
        ...updatedTicket,
        status: "Escalated",
        emailSent: true,
        escalatedToSenior: "Margaret Foster",
        escalatedToManager: updatedTicket.escalatedToManager || "David Kim",
      };
    } else if (
      newElapsed >= 24 &&
      (ticket.status === "New" || ticket.status === "In Progress") &&
      ticket.priority !== "Low"
    ) {
      updatedTicket = {
        ...updatedTicket,
        status: "Escalated",
        escalatedToManager: updatedTicket.escalatedToManager || "David Kim",
      };
    }

    return updatedTicket;
  });
}

export function AdminProvider({ children }: { children: ReactNode }) {
  const [tickets, setTickets] = useState<Ticket[]>(INITIAL_TICKETS);
  const [advancedHours, setAdvancedHours] = useState(0);
  const [selectedTicketId, setSelectedTicketId] = useState<string | null>(null);
  const [activeAdminPage, setActiveAdminPage] = useState<
    "tickets" | "performance" | "settings"
  >("tickets");

  const advanceTime = (hours: number) => {
    const newTotal = advancedHours + hours;
    setAdvancedHours(newTotal);
    setTickets((prev) => applyTimeLogic(prev, newTotal));
  };

  const resetAll = () => {
    setAdvancedHours(0);
    setTickets(INITIAL_TICKETS.map((t) => ({ ...t })));
  };

  const selectTicket = (id: string | null) => {
    setSelectedTicketId(id);
  };

  const updateTicketStatus = (id: string, status: Ticket["status"]) => {
    setTickets((prev) =>
      prev.map((t) => (t.id === id ? { ...t, status } : t))
    );
  };

  const updateTicketAgent = (id: string, agent: string) => {
    setTickets((prev) =>
      prev.map((t) => (t.id === id ? { ...t, agent } : t))
    );
  };

  const updateTicketNotes = (id: string, notes: string) => {
    setTickets((prev) =>
      prev.map((t) => (t.id === id ? { ...t, internalNotes: notes } : t))
    );
  };

  return (
    <AdminContext.Provider
      value={{
        tickets,
        advancedHours,
        selectedTicketId,
        activeAdminPage,
        advanceTime,
        resetAll,
        selectTicket,
        updateTicketStatus,
        updateTicketAgent,
        updateTicketNotes,
        setActiveAdminPage,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error("useAdmin must be used within AdminProvider");
  }
  return context;
}
