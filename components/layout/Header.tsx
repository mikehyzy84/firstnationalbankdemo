"use client";

import { Mail, MessageSquare, Phone, MapPin, Settings } from "lucide-react";
import Link from "next/link";
import { useApp } from "@/context/AppContext";

function FNBLogo() {
  return (
    <div className="flex items-center gap-2">
      {/* Flag icon */}
      <div className="relative w-10 h-10 flex-shrink-0">
        <svg viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <rect width="40" height="40" fill="#A01E22" rx="2" />
          <rect x="6" y="8" width="4" height="24" fill="white" />
          <polygon points="10,8 28,14 10,20" fill="white" />
        </svg>
      </div>
      <div className="flex flex-col leading-tight">
        <span className="text-[#1B4F7A] font-bold text-lg leading-none">
          First National
        </span>
        <span className="text-[#1B4F7A] font-bold text-lg leading-none">
          Bank
        </span>
      </div>
    </div>
  );
}

export default function Header() {
  const { user, openContactModal, openVoiceAgent } = useApp();

  return (
    <header className="w-full bg-white border-b border-gray-200 shadow-sm">
      <div className="flex items-center justify-between px-4 py-2">
        {/* Logo */}
        <Link href="/overview" className="flex-shrink-0">
          <FNBLogo />
        </Link>

        {/* Welcome message */}
        <div className="flex-1 text-center">
          <span className="text-sm text-gray-700">
            Welcome back,{" "}
            <span className="font-semibold text-[#1B4F7A]">
              {user.displayName}
            </span>
          </span>
        </div>

        {/* Icon row */}
        <div className="flex items-center gap-1">
          {/* Mail with badge */}
          <Link
            href="/messages"
            className="relative flex items-center justify-center w-9 h-9 rounded hover:bg-gray-100 text-gray-600"
            title="Messages"
          >
            <Mail size={20} />
            <span className="absolute -top-0.5 -right-0.5 bg-[#A01E22] text-white text-[9px] font-bold rounded-full w-4 h-4 flex items-center justify-center leading-none">
              0
            </span>
          </Link>

          {/* Chat — opens Voice Agent */}
          <button
            onClick={openVoiceAgent}
            className="flex items-center justify-center w-9 h-9 rounded hover:bg-gray-100 text-gray-600"
            title="Chat with an Agent"
          >
            <MessageSquare size={20} />
          </button>

          {/* Phone - opens Contact modal */}
          <button
            onClick={openContactModal}
            className="flex items-center justify-center w-9 h-9 rounded hover:bg-gray-100 text-gray-600"
            title="Contact Us"
          >
            <Phone size={20} />
          </button>

          {/* Location */}
          <button
            className="flex items-center justify-center w-9 h-9 rounded hover:bg-gray-100 text-gray-600"
            title="Locations"
          >
            <MapPin size={20} />
          </button>

          {/* Settings */}
          <button
            className="flex items-center justify-center w-9 h-9 rounded hover:bg-gray-100 text-gray-600"
            title="Settings"
          >
            <Settings size={20} />
          </button>

          {/* Log out */}
          <Link
            href="/login"
            className="ml-2 px-4 py-1.5 bg-[#006B8F] text-white text-sm font-medium rounded hover:bg-[#005a78] transition-colors"
          >
            Log out
          </Link>
        </div>
      </div>
    </header>
  );
}
