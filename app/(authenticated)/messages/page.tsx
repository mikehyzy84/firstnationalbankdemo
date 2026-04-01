"use client";

import { useState } from "react";
import { Mail, ChevronDown, ArrowUpDown, ChevronUp } from "lucide-react";

export default function MessagesPage() {
  const [activeTab, setActiveTab] = useState<"center" | "new">("center");
  const [inboxView, setInboxView] = useState("Last 5 Messages");
  const [sentView, setSentView] = useState("Last 5 Messages");

  const viewOptions = [
    "Last 5 Messages",
    "Last 10 Messages",
    "Last 20 Messages",
    "All Messages",
  ];

  return (
    <div className="space-y-4">
      {/* Sub-navigation */}
      <div className="flex border-b border-[#CCCCCC]">
        <button
          onClick={() => setActiveTab("center")}
          className={`px-5 py-3 text-sm font-medium border-b-2 transition-colors ${
            activeTab === "center"
              ? "border-[#A01E22] text-[#A01E22]"
              : "border-transparent text-gray-600 hover:text-[#006B8F]"
          }`}
        >
          Message Center
        </button>
        <button
          onClick={() => setActiveTab("new")}
          className={`px-5 py-3 text-sm font-medium border-b-2 transition-colors ${
            activeTab === "new"
              ? "border-[#A01E22] text-[#A01E22]"
              : "border-transparent text-gray-600 hover:text-[#006B8F]"
          }`}
        >
          New Message
        </button>
      </div>

      {activeTab === "center" && (
        <div className="space-y-5">
          {/* Heading */}
          <div>
            <h1 className="text-2xl font-bold text-[#1B4F7A]">Messages</h1>
            <p className="text-sm text-gray-600 mt-1">
              Below are your messages to and from FNB Customer Service. Select the subject to
              review or reply to a message.
            </p>
          </div>

          {/* Send new message link */}
          <button
            onClick={() => setActiveTab("new")}
            className="flex items-center gap-2 text-sm text-[#006B8F] hover:text-[#005a78] font-medium"
          >
            <Mail size={16} />
            Send Us a New Message
          </button>

          {/* Inbox box */}
          <div className="border border-[#CCCCCC] rounded-lg overflow-hidden shadow-sm">
            {/* Dark teal header */}
            <div className="bg-[#006B8F] px-4 py-2.5 flex items-center gap-3">
              <span className="text-sm text-white font-semibold">Message Inbox</span>
            </div>

            {/* View selector */}
            <div className="bg-gray-50 px-4 py-2 border-b border-[#CCCCCC] flex items-center gap-2">
              <span className="text-xs text-gray-600 font-medium">View</span>
              <div className="relative">
                <select
                  value={inboxView}
                  onChange={(e) => setInboxView(e.target.value)}
                  className="appearance-none border border-gray-300 rounded px-2.5 py-1 pr-6 text-xs text-gray-700 bg-white focus:outline-none focus:ring-1 focus:ring-[#006B8F]"
                >
                  {viewOptions.map((opt) => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
                <ChevronDown size={12} className="absolute right-1.5 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
              </div>
            </div>

            {/* Table */}
            <div>
              {/* Table header */}
              <div className="grid grid-cols-3 bg-gray-100 border-b border-[#CCCCCC] px-4 py-2">
                <button className="flex items-center gap-1 text-xs font-semibold text-gray-700 hover:text-[#006B8F]">
                  <ChevronUp size={12} />
                  Date
                </button>
                <button className="flex items-center gap-1 text-xs font-semibold text-gray-700 hover:text-[#006B8F]">
                  <ArrowUpDown size={12} />
                  Subject
                </button>
                <button className="flex items-center gap-1 text-xs font-semibold text-gray-700 hover:text-[#006B8F]">
                  <ArrowUpDown size={12} />
                  From
                </button>
              </div>

              {/* Empty state row */}
              <div className="px-4 py-4 text-center text-sm text-gray-500 bg-white">
                You have no messages.
              </div>
            </div>
          </div>

          {/* Sent Messages box */}
          <div className="border border-[#CCCCCC] rounded-lg overflow-hidden shadow-sm">
            {/* Dark teal header */}
            <div className="bg-[#006B8F] px-4 py-2.5">
              <span className="text-sm text-white font-semibold">Sent Messages</span>
            </div>

            {/* View selector */}
            <div className="bg-gray-50 px-4 py-2 border-b border-[#CCCCCC] flex items-center gap-2">
              <span className="text-xs text-gray-600 font-medium">View</span>
              <div className="relative">
                <select
                  value={sentView}
                  onChange={(e) => setSentView(e.target.value)}
                  className="appearance-none border border-gray-300 rounded px-2.5 py-1 pr-6 text-xs text-gray-700 bg-white focus:outline-none focus:ring-1 focus:ring-[#006B8F]"
                >
                  {viewOptions.map((opt) => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
                <ChevronDown size={12} className="absolute right-1.5 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
              </div>
            </div>

            {/* Table */}
            <div>
              {/* Table header */}
              <div className="grid grid-cols-2 bg-gray-100 border-b border-[#CCCCCC] px-4 py-2">
                <button className="flex items-center gap-1 text-xs font-semibold text-gray-700 hover:text-[#006B8F]">
                  <ChevronUp size={12} />
                  Date
                </button>
                <button className="flex items-center gap-1 text-xs font-semibold text-gray-700 hover:text-[#006B8F]">
                  <ArrowUpDown size={12} />
                  Subject
                </button>
              </div>

              {/* Empty state row */}
              <div className="px-4 py-4 text-center text-sm text-gray-500 bg-white">
                You have no messages.
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === "new" && (
        <div className="space-y-4">
          <h1 className="text-2xl font-bold text-[#1B4F7A]">New Message</h1>
          <p className="text-sm text-gray-600">
            Send a secure message to FNB Customer Service. We typically respond within 1-2 business days.
          </p>

          <div className="bg-white border border-[#CCCCCC] rounded-lg shadow-sm p-6 max-w-xl">
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Subject <span className="text-red-500">*</span>
                </label>
                <select className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#006B8F]">
                  <option value="">-- Select a subject --</option>
                  <option>Account Inquiry</option>
                  <option>Transaction Dispute</option>
                  <option>Card Services</option>
                  <option>Loan Information</option>
                  <option>Online Banking Support</option>
                  <option>General Question</option>
                  <option>Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Message <span className="text-red-500">*</span>
                </label>
                <textarea
                  rows={6}
                  placeholder="Type your message here..."
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#006B8F] resize-none"
                />
                <p className="text-xs text-gray-400 mt-1">Maximum 2000 characters</p>
              </div>

              <div className="flex gap-3 pt-1">
                <button
                  type="submit"
                  className="flex items-center gap-1.5 px-6 py-2 bg-[#006B8F] text-white text-sm font-medium rounded hover:bg-[#005a78] transition-colors"
                >
                  <Mail size={15} />
                  Send Message
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab("center")}
                  className="px-6 py-2 border border-gray-300 text-gray-600 text-sm rounded hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
