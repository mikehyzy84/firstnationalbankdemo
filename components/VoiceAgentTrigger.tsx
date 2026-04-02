"use client";

import { Mic } from "lucide-react";
import { useApp } from "@/context/AppContext";

export default function VoiceAgentTrigger() {
  const { isVoiceAgentOpen, openVoiceAgent } = useApp();

  if (isVoiceAgentOpen) return null;

  return (
    <button
      onClick={openVoiceAgent}
      className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-[#006B8F] hover:bg-[#005a78] shadow-lg flex items-center justify-center transition-colors group"
      title="Chat with FNB Voice Assistant"
    >
      <Mic size={22} className="text-white" />
      {/* Tooltip */}
      <span className="absolute right-16 bg-gray-800 text-white text-xs rounded px-2 py-1 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
        FNB Voice Assistant
      </span>
    </button>
  );
}
