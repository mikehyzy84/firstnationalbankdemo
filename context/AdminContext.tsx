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
    customer: "Mike",
    accountType: "Personal Checking",
    phone: "(412) 555-0182",
    email: "m.user@email.com",
    memberSince: "2021",
    issue: "Duplicate Netflix charge on personal checking ($15.99 charged twice on Mar 28)",
    description:
      "Customer called in reporting two identical Netflix charges of $15.99 both posted on March 28 to Personal Checking account ending in 4821. Customer confirmed only one active Netflix subscription. AI Voice Agent Fiona identified the duplicate, customer requested reversal of the second charge.",
    agent: "Sarah Chen",
    status: "New",
    priority: "Medium",
    createdHoursAgo: 2,
    currentHoursElapsed: 2,
    internalNotes: "",
  },
  {
    id: "FNB-4718",
    customer: "Mike",
    accountType: "Personal Checking",
    phone: "(412) 555-0182",
    email: "m.user@email.com",
    memberSince: "2021",
    issue: "Check Deposit #1847 ($4,200) deposited to personal checking, should be business checking",
    description:
      "Customer reports that Check Deposit #1847 for $4,200 was routed to Personal Checking account ending in 4821, but should have been deposited into Business Checking account ending in 2156. AI Voice Agent Fiona flagged the misrouted deposit. Customer requests correction and transfer to correct account.",
    agent: "Michael Park",
    status: "New",
    priority: "Medium",
    createdHoursAgo: 3,
    currentHoursElapsed: 3,
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
    issue: "Business checking unauthorized ACH debit from WEBSVCS ($899)",
    description:
      "Unauthorized ACH debit of $899 from 'UNKNOWN ACH DEBIT - WEBSVCS' appeared on business checking account. Customer has no record of authorizing this transaction and does not recognize the vendor. Potential fraud. Immediate account review and hold recommended.",
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
    issue: "Mortgage payment posted twice in March",
    description:
      "Auto-pay mortgage payment of $2,340 was debited from checking account twice during March. Customer requests immediate reversal of duplicate payment and confirmation that credit has been applied to account.",
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
    accountType: "Business Checking",
    phone: "(412) 555-0629",
    email: "d.thompson@email.com",
    memberSince: "2020",
    issue: "Duplicate vendor payment to Grainger Industrial ($3,847 charged twice)",
    description:
      "Business checking account shows two identical payments of $3,847 to Grainger Industrial — one on March 28 and one on March 31. Customer confirms only one payment was authorized. Requests reversal of duplicate charge and vendor notification.",
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
    accountType: "Personal Checking",
    phone: "(412) 555-0714",
    email: "s.miller@email.com",
    memberSince: "2022",
    issue: "Unrecognized charge POS DEBIT WPY*DNTRSVC ($129)",
    description:
      "Customer reports an unrecognized POS debit of $129.00 from 'WPY*DNTRSVC' on their personal checking account dated March 25. Customer does not recognize the merchant and has not authorized this charge. Requests investigation and reversal.",
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
    issue: "Business line of credit rate discrepancy vs original agreement",
    description:
      "Customer's business line of credit is showing an interest rate of 9.75% on their statement; however, their original loan agreement specifies 7.25%. Customer requests immediate rate correction and retroactive adjustment for all billing periods at the incorrect rate.",
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
