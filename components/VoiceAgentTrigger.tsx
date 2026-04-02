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
          }}
        />
      ))}
    </div>
  );
}

/** Spinning ring overlay shown while mic permission is being requested. */
function SpinnerRing() {
  return (
    <span className="absolute inset-0 rounded-full pointer-events-none">
      <svg
        className="absolute inset-0 w-full h-full animate-spin"
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          cx="50" cy="50" r="46"
          stroke="white"
          strokeWidth="5"
          strokeLinecap="round"
          strokeDasharray="72 216"
          opacity="0.7"
        />
      </svg>
    </span>
  );
}

export default function VoiceAgentTrigger() {
  const { isVoiceAgentOpen, openVoiceAgent, voiceInitState } = useApp();

  if (isVoiceAgentOpen) return null;

  const isInitializing = voiceInitState === "initializing";
  const isUnavailable = voiceInitState === "unavailable";
  const isReady = voiceInitState === "ready";

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-1.5">
      {/* Unavailable tooltip — shown above the pill */}
      {isUnavailable && (
        <div className="flex items-center gap-1.5 bg-gray-800 text-white text-xs rounded-lg px-3 py-1.5 shadow-lg">
          <span className="w-1.5 h-1.5 rounded-full bg-red-400 flex-shrink-0" />
          Voice assistant unavailable — please refresh
        </div>
      )}

      <button
        onClick={isReady ? openVoiceAgent : undefined}
        disabled={!isReady}
        className="relative group focus:outline-none"
        title={
          isInitializing
            ? "Connecting voice assistant…"
            : isUnavailable
            ? "Voice assistant unavailable"
            : "Talk to FNB AI Agent"
        }
      >
        {/* Outer glow ring — only when ready */}
        {isReady && (
          <span className="absolute inset-0 rounded-full bg-[#006B8F] opacity-20 blur-md scale-110 group-hover:opacity-40 transition-opacity" />
        )}

        {/* Main pill */}
        <div
          className={`relative flex items-center gap-3 pl-2 pr-4 py-2 rounded-full shadow-xl border border-white/10 transition-all duration-300 ${
            isUnavailable
              ? "bg-gradient-to-r from-[#4a4a4a] via-[#5a5a5a] to-[#6a6a6a] opacity-70"
              : isInitializing
              ? "bg-gradient-to-r from-[#004f6b] via-[#006B8F] to-[#1B9AC4] opacity-75"
              : "bg-gradient-to-r from-[#004f6b] via-[#006B8F] to-[#1B9AC4] group-hover:shadow-[#006B8F]/50 group-hover:shadow-2xl"
          }`}
        >
          {/* FNB flag icon */}
          <FNBFlag />

          {/* Text block */}
          <div className="flex flex-col leading-none">
            <span className="text-[9px] font-semibold tracking-[0.15em] text-[#7dd3ee] uppercase">
              First National Bank
            </span>
            <span className="text-[15px] font-bold text-white tracking-wide">
              {isInitializing ? "Connecting…" : isUnavailable ? "Unavailable" : "AI Agent"}
            </span>
          </div>

          {/* Right side: spinner while initializing, wave when ready, nothing when unavailable */}
          {isInitializing && (
            <div className="w-8 flex items-center justify-center">
              <svg className="animate-spin w-4 h-4 text-white/70" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
              </svg>
            </div>
          )}
          {isReady && <SoundWave active={false} />}
          {isUnavailable && (
            <span className="w-2 h-2 rounded-full bg-red-400 flex-shrink-0" />
          )}
        </div>

        {/* Spinning permission ring — overlaid on the entire pill */}
        {isInitializing && <SpinnerRing />}
      </button>
    </div>
  );
}
