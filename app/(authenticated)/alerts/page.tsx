"use client";

import { ArrowRight, Smartphone, Bell, MessageSquare, Wifi } from "lucide-react";

interface AlertCard {
  title: string;
  icon: React.ReactNode;
  description: string;
  iconBg: string;
}

const alertCards: AlertCard[] = [
  {
    title: "FNB Direct Mobile Banking",
    icon: (
      <div className="flex flex-col items-center gap-0.5">
        <div className="relative w-10 h-10 flex-shrink-0">
          <svg viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            <rect width="40" height="40" fill="#A01E22" rx="2" />
            <rect x="6" y="8" width="4" height="24" fill="white" />
            <polygon points="10,8 28,14 10,20" fill="white" />
          </svg>
        </div>
        <Smartphone size={16} className="text-[#006B8F]" />
      </div>
    ),
    description:
      "Download the FNB Direct app for iPhone and Android. Manage your accounts, deposit checks, pay bills, and more from your smartphone.",
    iconBg: "bg-blue-50",
  },
  {
    title: "Account Alerts",
    icon: (
      <div className="flex items-center justify-center w-12 h-12 rounded-full bg-[#006B8F] bg-opacity-10">
        <Bell size={24} className="text-[#006B8F]" />
      </div>
    ),
    description:
      "Stay on top of your finances with customizable account alerts delivered via email, text message, or push notifications to your device.",
    iconBg: "bg-teal-50",
  },
  {
    title: "Text Banking",
    icon: (
      <div className="flex flex-col items-center justify-center w-12 h-12 rounded bg-[#1B4F7A] text-white text-center">
        <span className="text-[9px] font-bold leading-none">TXT</span>
        <span className="text-[9px] font-bold leading-none">BNKG</span>
      </div>
    ),
    description:
      "Check account balances, view recent transactions, and transfer funds using simple text message commands. Quick, easy, no app required.",
    iconBg: "bg-indigo-50",
  },
  {
    title: "Online Banking for Mobile",
    icon: (
      <div className="relative flex items-center justify-center w-12 h-12">
        <Smartphone size={28} className="text-[#006B8F]" />
        <Wifi size={14} className="text-[#1B9AC4] absolute -right-1 -top-1" />
      </div>
    ),
    description:
      "Access our mobile-optimized website from any smartphone browser. No app download required — just open your browser and log in.",
    iconBg: "bg-cyan-50",
  },
];

export default function AlertsPage() {
  return (
    <div className="space-y-6">
      {/* Page heading */}
      <div>
        <h1 className="text-2xl font-bold text-[#1B4F7A]">Alerts / Mobile Banking</h1>
        <p className="text-sm text-gray-600 mt-1 max-w-2xl">
          Sign up for account alerts and stay connected to your finances wherever you go. Choose
          from mobile banking apps, text alerts, email notifications, and more.
        </p>
      </div>

      {/* 2x2 Card grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {alertCards.map((card, idx) => (
          <div
            key={idx}
            className={`bg-white border border-[#CCCCCC] rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow`}
          >
            <div className="flex items-start gap-4">
              {/* Icon */}
              <div className={`flex-shrink-0 w-14 h-14 flex items-center justify-center rounded-lg ${card.iconBg}`}>
                {card.icon}
              </div>

              {/* Content */}
              <div className="flex-1">
                <h3 className="text-sm font-semibold text-[#1B4F7A] mb-2">{card.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{card.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Continue button */}
      <div className="flex justify-center pt-2">
        <button className="flex items-center gap-2 px-8 py-2.5 bg-[#006B8F] text-white text-sm font-medium rounded hover:bg-[#005a78] transition-colors">
          Continue
          <ArrowRight size={15} />
        </button>
      </div>
    </div>
  );
}
