"use client";

import { useApp } from "@/context/AppContext";

function FNBFlag() {
  return (
    <svg viewBox="0 0 28 28" xmlns="http://www.w3.org/2000/svg" className="w-7 h-7 flex-shrink-0">
      <rect width="28" height="28" fill="#A01E22" rx="2" />
      <rect x="4" y="5" width="3" height="18" fill="white" />
      <polygon points="7,5 22,10 7,15" fill="white" />
    </svg>
  );
}

function SoundWave({ active }: { active: boolean }) {
  return (
    <div className="flex items-center gap-[3px] h-5">
      {[1, 2, 3, 4, 5].map((i) => (
        <span
          key={i}
          className="block w-[3px] rounded-full bg-white origin-center"
          style={{
            height: active ? undefined : `${[8, 14, 10, 16, 6][i - 1]}px`,
            animation: active
              ? `soundbar 0.8s ease-in-out ${(i - 1) * 0.12}s infinite alternate`
              : "none",
            opacity: active ? 1 : 0.55,
            ...(active ? {} : {}),
          }}
        />
      ))}
    </div>
  );
}

export default function VoiceAgentTrigger() {
  const { isVoiceAgentOpen, openVoiceAgent } = useApp();

  if (isVoiceAgentOpen) return null;

  return (
    <button
      onClick={openVoiceAgent}
      className="fixed bottom-6 right-6 z-50 group"
      title="Talk to FNB AI Agent"
    >
      {/* Outer glow ring */}
      <span className="absolute inset-0 rounded-full bg-[#006B8F] opacity-20 blur-md scale-110 group-hover:opacity-40 transition-opacity" />

      {/* Main pill */}
      <div className="relative flex items-center gap-3 pl-2 pr-4 py-2 rounded-full bg-gradient-to-r from-[#004f6b] via-[#006B8F] to-[#1B9AC4] shadow-xl border border-white/10 group-hover:shadow-[#006B8F]/50 group-hover:shadow-2xl transition-all duration-300">

        {/* FNB flag icon */}
        <FNBFlag />

        {/* Text block */}
        <div className="flex flex-col leading-none">
          <span className="text-[9px] font-semibold tracking-[0.15em] text-[#7dd3ee] uppercase">
            First National Bank
          </span>
          <span className="text-[15px] font-bold text-white tracking-wide">
            AI Agent
          </span>
        </div>

        {/* Sound wave */}
        <SoundWave active={false} />
      </div>
    </button>
  );
}
