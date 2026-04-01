"use client";

import { Lock, CreditCard, Shield, Bell, MapPin, ArrowRight, ToggleLeft, ToggleRight } from "lucide-react";
import { useState } from "react";

interface Card {
  id: string;
  name: string;
  number: string;
  type: "Visa" | "Mastercard";
  expiry: string;
  isActive: boolean;
}

const cards: Card[] = [
  {
    id: "1",
    name: "FNB Platinum Visa",
    number: "****4821",
    type: "Visa",
    expiry: "09/28",
    isActive: true,
  },
  {
    id: "2",
    name: "FNB Business Visa",
    number: "****2156",
    type: "Visa",
    expiry: "03/27",
    isActive: false,
  },
];

export default function CardGuardPage() {
  const [cardStates, setCardStates] = useState<Record<string, boolean>>(
    Object.fromEntries(cards.map((c) => [c.id, c.isActive]))
  );

  const toggleCard = (id: string) => {
    setCardStates((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center gap-2 mb-1">
          <Lock size={22} className="text-[#006B8F]" />
          <h1 className="text-2xl font-bold text-[#1B4F7A]">CardGuard&trade;</h1>
        </div>
        <p className="text-sm text-gray-600 max-w-2xl">
          Take control of your FNB debit and credit cards. Lock or unlock cards instantly, set
          transaction controls, and receive real-time alerts for every purchase.
        </p>
      </div>

      {/* Cards */}
      <div className="space-y-4">
        {cards.map((card) => {
          const isOn = cardStates[card.id];
          return (
            <div
              key={card.id}
              className="bg-white border border-[#CCCCCC] rounded-lg shadow-sm overflow-hidden"
            >
              {/* Card visual */}
              <div
                className={`relative px-5 py-4 ${
                  isOn
                    ? "bg-gradient-to-r from-[#006B8F] to-[#1B9AC4]"
                    : "bg-gradient-to-r from-gray-400 to-gray-500"
                } text-white`}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-xs font-medium text-blue-100 uppercase tracking-wider mb-1">
                      {card.name}
                    </p>
                    <p className="text-lg font-mono tracking-widest">{card.number}</p>
                    <p className="text-xs text-blue-100 mt-1">Expires {card.expiry}</p>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <CreditCard size={28} className="text-white opacity-80" />
                    <span className="text-xs font-bold tracking-wide">{card.type}</span>
                  </div>
                </div>
              </div>

              {/* Controls */}
              <div className="px-5 py-4 space-y-3">
                {/* Lock/Unlock toggle */}
                <div className="flex items-center justify-between py-2 border-b border-gray-100">
                  <div className="flex items-center gap-2">
                    <Lock size={16} className={isOn ? "text-[#006B8F]" : "text-gray-400"} />
                    <span className="text-sm font-medium text-gray-700">
                      Card Status: {isOn ? "Active" : "Locked"}
                    </span>
                  </div>
                  <button
                    onClick={() => toggleCard(card.id)}
                    className="flex items-center gap-1.5 text-sm font-medium"
                  >
                    {isOn ? (
                      <ToggleRight size={28} className="text-[#006B8F]" />
                    ) : (
                      <ToggleLeft size={28} className="text-gray-400" />
                    )}
                    <span className={isOn ? "text-[#006B8F]" : "text-gray-400"}>
                      {isOn ? "ON" : "OFF"}
                    </span>
                  </button>
                </div>

                {/* Controls row */}
                <div className="grid grid-cols-3 gap-3">
                  <button className="flex flex-col items-center gap-1.5 p-3 border border-gray-200 rounded-lg hover:border-[#006B8F] hover:bg-blue-50 transition-colors group">
                    <Shield size={18} className="text-[#006B8F]" />
                    <span className="text-xs text-gray-600 text-center">Transaction Controls</span>
                  </button>
                  <button className="flex flex-col items-center gap-1.5 p-3 border border-gray-200 rounded-lg hover:border-[#006B8F] hover:bg-blue-50 transition-colors group">
                    <Bell size={18} className="text-[#006B8F]" />
                    <span className="text-xs text-gray-600 text-center">Spending Alerts</span>
                  </button>
                  <button className="flex flex-col items-center gap-1.5 p-3 border border-gray-200 rounded-lg hover:border-[#006B8F] hover:bg-blue-50 transition-colors group">
                    <MapPin size={18} className="text-[#006B8F]" />
                    <span className="text-xs text-gray-600 text-center">Location Controls</span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Report lost/stolen */}
      <div className="bg-white border border-[#CCCCCC] rounded-lg shadow-sm p-5">
        <h2 className="text-sm font-semibold text-[#1B4F7A] mb-2">Report a Lost or Stolen Card</h2>
        <p className="text-sm text-gray-600 mb-3">
          If your card is lost or stolen, report it immediately to protect your account. We&apos;ll
          issue a replacement card within 5-7 business days.
        </p>
        <button className="flex items-center gap-1.5 text-sm text-white bg-[#A01E22] px-4 py-2 rounded hover:bg-red-800 transition-colors">
          Report Lost/Stolen Card <ArrowRight size={15} />
        </button>
      </div>
    </div>
  );
}
