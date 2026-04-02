"use client";

import { useConversation } from "@11labs/react";
import { Mic, MicOff, X, PhoneOff, Volume2 } from "lucide-react";
import { useCallback } from "react";
import { useApp } from "@/context/AppContext";

const AGENT_ID = "agent_2001kmrffrete19rzh9vrrzrxvxz";

export default function VoiceAgent() {
  const { isVoiceAgentOpen, closeVoiceAgent } = useApp();

  const conversation = useConversation({
    onConnect: () => console.log("ElevenLabs connected"),
    onDisconnect: () => console.log("ElevenLabs disconnected"),
    onError: (error) => console.error("ElevenLabs error:", error),
  });

  const handleStart = useCallback(async () => {
    try {
      await navigator.mediaDevices.getUserMedia({ audio: true });
      await conversation.startSession({ agentId: AGENT_ID });
    } catch (err) {
      console.error("Microphone access denied or session failed:", err);
    }
  }, [conversation]);

  const handleEnd = useCallback(async () => {
    await conversation.endSession();
  }, [conversation]);

  const handleClose = useCallback(async () => {
    if (conversation.status === "connected") {
      await conversation.endSession();
    }
    closeVoiceAgent();
  }, [conversation, closeVoiceAgent]);

  if (!isVoiceAgentOpen) return null;

  const isConnected = conversation.status === "connected";
  const isConnecting = conversation.status === "connecting";

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {/* Agent Panel */}
      <div className="bg-white rounded-xl shadow-2xl border border-gray-200 w-72 overflow-hidden">
        {/* Panel Header */}
        <div className="bg-[#006B8F] px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            {/* FNB flag dot */}
            <div className="w-6 h-6 bg-[#A01E22] rounded-sm flex items-center justify-center flex-shrink-0">
              <span className="text-white text-[8px] font-bold leading-none">FNB</span>
            </div>
            <div>
              <p className="text-white font-semibold text-sm leading-none">FNB Voice Assistant</p>
              <p className="text-[#b3d9e8] text-[10px] mt-0.5">First National Bank</p>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="text-white hover:text-gray-200 transition-colors"
          >
            <X size={16} />
          </button>
        </div>

        {/* Status area */}
        <div className="px-4 py-5 flex flex-col items-center gap-4">
          {/* Animated mic orb */}
          <div className="relative flex items-center justify-center">
            {/* Pulse rings when active */}
            {isConnected && (
              <>
                <span className="absolute inline-flex h-20 w-20 rounded-full bg-[#006B8F] opacity-20 animate-ping" />
                <span className="absolute inline-flex h-16 w-16 rounded-full bg-[#006B8F] opacity-30 animate-ping [animation-delay:0.3s]" />
              </>
            )}
            <div
              className={`relative w-14 h-14 rounded-full flex items-center justify-center transition-colors ${
                isConnected
                  ? "bg-[#006B8F]"
                  : "bg-gray-100 border-2 border-gray-300"
              }`}
            >
              {conversation.isSpeaking ? (
                <Volume2 size={24} className="text-white" />
              ) : (
                <Mic
                  size={24}
                  className={isConnected ? "text-white" : "text-gray-400"}
                />
              )}
            </div>
          </div>

          {/* Status text */}
          <div className="text-center">
            {isConnecting && (
              <p className="text-sm text-gray-500 animate-pulse">Connecting…</p>
            )}
            {isConnected && conversation.isSpeaking && (
              <p className="text-sm font-medium text-[#006B8F]">Agent is speaking…</p>
            )}
            {isConnected && !conversation.isSpeaking && (
              <p className="text-sm font-medium text-[#006B8F]">Listening — speak now</p>
            )}
            {!isConnected && !isConnecting && (
              <p className="text-sm text-gray-500">
                Tap below to connect with an FNB virtual assistant
              </p>
            )}
          </div>

          {/* Action buttons */}
          {!isConnected && !isConnecting && (
            <button
              onClick={handleStart}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-[#006B8F] hover:bg-[#005a78] text-white text-sm font-medium rounded-lg transition-colors"
            >
              <Mic size={16} />
              Start Voice Chat
            </button>
          )}

          {(isConnected || isConnecting) && (
            <button
              onClick={handleEnd}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-[#A01E22] hover:bg-[#8a1a1d] text-white text-sm font-medium rounded-lg transition-colors"
            >
              <PhoneOff size={16} />
              End Call
            </button>
          )}
        </div>

        {/* Footer */}
        <div className="px-4 py-2 bg-gray-50 border-t border-gray-100 text-center">
          <p className="text-[10px] text-gray-400">
            Powered by ElevenLabs AI · Calls may be recorded
          </p>
        </div>
      </div>

      {/* Floating trigger button (always visible while panel is open) */}
      <button
        onClick={handleClose}
        className={`w-14 h-14 rounded-full shadow-lg flex items-center justify-center transition-colors ${
          isConnected
            ? "bg-[#A01E22] hover:bg-[#8a1a1d]"
            : "bg-[#006B8F] hover:bg-[#005a78]"
        }`}
        title="Close voice agent"
      >
        {isConnected ? (
          <MicOff size={22} className="text-white" />
        ) : (
          <X size={22} className="text-white" />
        )}
      </button>
    </div>
  );
}
