"use client";

import { useState } from "react";
import { ArrowRight, ArrowLeftRight, Building2, Users } from "lucide-react";

const tabs = [
  "Transfer Center",
  "Between FNB Accounts",
  "Between FNB & External Accounts",
  "Send Money with Zelle\u00ae",
];

export default function TransfersPage() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="space-y-4">
      {/* Sub-navigation tabs */}
      <div className="bg-white border border-[#CCCCCC] rounded-t-lg overflow-hidden">
        <div className="flex border-b border-[#CCCCCC]">
          {tabs.map((tab, idx) => (
            <button
              key={idx}
              onClick={() => setActiveTab(idx)}
              className={`px-5 py-3 text-sm font-medium transition-colors border-b-2 whitespace-nowrap ${
                activeTab === idx
                  ? "border-[#A01E22] text-[#A01E22] bg-white"
                  : "border-transparent text-gray-600 hover:text-[#006B8F] bg-gray-50"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Tab content */}
        <div className="p-6">
          {activeTab === 0 && (
            <div className="space-y-6">
              <p className="text-gray-700 text-sm font-medium">
                Select an option below to transfer funds:
              </p>

              {/* Three cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {/* Card 1: Internal */}
                <div className="bg-white border border-[#CCCCCC] rounded-lg shadow-sm flex flex-col items-center p-6 text-center hover:shadow-md transition-shadow">
                  <h3 className="text-sm font-semibold text-[#1B4F7A] mb-4 leading-snug">
                    Transfers Between Your Accounts at FNB
                  </h3>

                  {/* FNB Logo image area */}
                  <div className="w-24 h-24 flex items-center justify-center mb-4">
                    <div className="flex flex-col items-center gap-1">
                      <div className="relative w-12 h-12 flex-shrink-0">
                        <svg viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                          <rect width="40" height="40" fill="#A01E22" rx="2" />
                          <rect x="6" y="8" width="4" height="24" fill="white" />
                          <polygon points="10,8 28,14 10,20" fill="white" />
                        </svg>
                      </div>
                      <div className="flex flex-col items-center">
                        <span className="text-[#1B4F7A] font-bold text-xs">First National</span>
                        <span className="text-[#1B4F7A] font-bold text-xs">Bank</span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => setActiveTab(1)}
                    className="mt-auto flex items-center gap-1.5 px-4 py-2 bg-[#006B8F] text-white text-sm font-medium rounded hover:bg-[#005a78] transition-colors"
                  >
                    Internal Transfer
                    <ArrowRight size={15} />
                  </button>
                </div>

                {/* Card 2: External */}
                <div className="bg-white border border-[#CCCCCC] rounded-lg shadow-sm flex flex-col items-center p-6 text-center hover:shadow-md transition-shadow">
                  <h3 className="text-sm font-semibold text-[#1B4F7A] mb-4 leading-snug">
                    Transfers Between FNB and Non-FNB Accounts
                  </h3>

                  {/* FNB + external bank icons */}
                  <div className="w-24 h-24 flex items-center justify-center mb-4">
                    <div className="flex items-center gap-1">
                      <div className="w-10 h-10 bg-[#A01E22] rounded flex items-center justify-center">
                        <svg viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                          <rect width="40" height="40" fill="#A01E22" rx="2" />
                          <rect x="6" y="8" width="4" height="24" fill="white" />
                          <polygon points="10,8 28,14 10,20" fill="white" />
                        </svg>
                      </div>
                      <ArrowLeftRight size={18} className="text-[#006B8F] mx-1" />
                      <div className="w-10 h-10 bg-[#1B4F7A] rounded flex items-center justify-center">
                        <Building2 size={18} className="text-white" />
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => setActiveTab(2)}
                    className="mt-auto flex items-center gap-1.5 px-4 py-2 bg-[#006B8F] text-white text-sm font-medium rounded hover:bg-[#005a78] transition-colors"
                  >
                    External Transfer
                    <ArrowRight size={15} />
                  </button>
                </div>

                {/* Card 3: Zelle */}
                <div className="bg-white border border-[#CCCCCC] rounded-lg shadow-sm flex flex-col items-center p-6 text-center hover:shadow-md transition-shadow">
                  <h3 className="text-sm font-semibold text-[#1B4F7A] mb-4 leading-snug">
                    Transfer Funds To/From Other People
                  </h3>

                  {/* Zelle logo */}
                  <div className="w-24 h-24 flex items-center justify-center mb-4">
                    <div className="flex flex-col items-center gap-2">
                      <Users size={28} className="text-purple-600" />
                      <span className="text-2xl font-bold text-purple-600 italic tracking-tight">
                        Zelle
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => setActiveTab(3)}
                    className="mt-auto flex items-center gap-1.5 px-4 py-2 bg-[#006B8F] text-white text-sm font-medium rounded hover:bg-[#005a78] transition-colors"
                  >
                    Send Money
                    <ArrowRight size={15} />
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 1 && (
            <div className="space-y-5">
              <h2 className="text-lg font-semibold text-[#1B4F7A]">
                Transfer Between Your FNB Accounts
              </h2>

              <form className="max-w-md space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    From Account
                  </label>
                  <select className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#006B8F]">
                    <option>FNB Personal Checking ****4821 - $3,247.58</option>
                    <option>FNB Personal Savings ****7093 - $12,850.00</option>
                    <option>FNB Business Checking ****2156 - $8,410.33</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    To Account
                  </label>
                  <select className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#006B8F]">
                    <option>FNB Personal Savings ****7093 - $12,850.00</option>
                    <option>FNB Personal Checking ****4821 - $3,247.58</option>
                    <option>FNB Business Checking ****2156 - $8,410.33</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Amount
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm">$</span>
                    <input
                      type="number"
                      min="0"
                      step="0.01"
                      placeholder="0.00"
                      className="w-full border border-gray-300 rounded pl-7 pr-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#006B8F]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Transfer Date
                  </label>
                  <input
                    type="date"
                    className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#006B8F]"
                    defaultValue="2026-04-01"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Memo (optional)
                  </label>
                  <input
                    type="text"
                    placeholder="Add a note..."
                    className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#006B8F]"
                  />
                </div>

                <div className="flex gap-3 pt-2">
                  <button
                    type="submit"
                    className="flex items-center gap-1.5 px-6 py-2 bg-[#006B8F] text-white text-sm font-medium rounded hover:bg-[#005a78] transition-colors"
                  >
                    Submit Transfer <ArrowRight size={15} />
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab(0)}
                    className="px-6 py-2 border border-gray-300 text-gray-600 text-sm rounded hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}

          {activeTab === 2 && (
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-[#1B4F7A]">
                Transfer Between FNB and External Accounts
              </h2>
              <p className="text-sm text-gray-600">
                Link an external bank account to transfer funds between FNB and
                your accounts at other financial institutions.
              </p>
              <div className="border border-dashed border-[#CCCCCC] rounded-lg p-8 text-center">
                <Building2 size={36} className="mx-auto text-gray-400 mb-3" />
                <p className="text-sm text-gray-500 mb-4">No external accounts linked.</p>
                <button className="flex items-center gap-1.5 mx-auto px-5 py-2 bg-[#006B8F] text-white text-sm font-medium rounded hover:bg-[#005a78] transition-colors">
                  Add External Account <ArrowRight size={15} />
                </button>
              </div>
            </div>
          )}

          {activeTab === 3 && (
            <div className="space-y-4">
              <div className="flex items-center gap-3 mb-2">
                <Users size={28} className="text-purple-600" />
                <h2 className="text-2xl font-bold text-purple-600 italic">Zelle</h2>
              </div>
              <p className="text-sm text-gray-600">
                Send money to friends, family, and others you trust — even if they bank somewhere different.
                Fast, safe, and easy.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-lg">
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="text-sm font-semibold text-gray-700 mb-1">Send Money</h3>
                  <p className="text-xs text-gray-500 mb-3">Send to a phone number or email address</p>
                  <button className="flex items-center gap-1 text-sm text-purple-600 font-medium hover:text-purple-800">
                    Get Started <ArrowRight size={14} />
                  </button>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="text-sm font-semibold text-gray-700 mb-1">Request Money</h3>
                  <p className="text-xs text-gray-500 mb-3">Request payment from someone you know</p>
                  <button className="flex items-center gap-1 text-sm text-purple-600 font-medium hover:text-purple-800">
                    Get Started <ArrowRight size={14} />
                  </button>
                </div>
              </div>
              <p className="text-xs text-gray-400 max-w-md">
                Zelle® and the Zelle® related marks are wholly owned by Early Warning Services, LLC and are used herein under license.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
