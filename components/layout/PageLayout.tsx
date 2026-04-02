"use client";

import { useEffect, useRef } from "react";
import FDICBanner from "./FDICBanner";
import Header from "./Header";
import Navigation from "./Navigation";
import Footer from "./Footer";
import ContactUsModal from "@/components/modals/ContactUsModal";
import VoiceAgent from "@/components/VoiceAgent";
import VoiceAgentTrigger from "@/components/VoiceAgentTrigger";
import { useApp } from "@/context/AppContext";

const MAX_RETRIES = 3;

interface PageLayoutProps {
  children: React.ReactNode;
}

export default function PageLayout({ children }: PageLayoutProps) {
  const { isContactModalOpen, closeContactModal, openVoiceAgent, setVoiceInitState } = useApp();
  const attemptsRef = useRef(0);

  useEffect(() => {
    let cancelled = false;

    async function requestMicPermission() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        // Immediately release the track — we only needed the permission grant.
        stream.getTracks().forEach((t) => t.stop());
        if (!cancelled) setVoiceInitState("ready");
      } catch {
        if (cancelled) return;
        attemptsRef.current += 1;
        if (attemptsRef.current < MAX_RETRIES) {
          setTimeout(requestMicPermission, attemptsRef.current * 1000);
        } else {
          setVoiceInitState("unavailable");
        }
      }
    }

    requestMicPermission();
    return () => { cancelled = true; };
  }, [setVoiceInitState]);

  return (
    <div className="min-h-screen flex flex-col bg-[#F5F5F5]">
      <FDICBanner />
      <Header />
      <Navigation />

      {/* Main content area */}
      <main className="flex-1 w-full">
        <div className="max-w-7xl mx-auto px-4 py-6">{children}</div>
      </main>

      <Footer />

      {/* Contact Us Modal */}
      {isContactModalOpen && (
        <ContactUsModal
          onClose={closeContactModal}
          onOpenVoiceAgent={openVoiceAgent}
        />
      )}

      {/* ElevenLabs Voice Agent — floating panel (bottom-right) */}
      <VoiceAgent />

      {/* Floating mic trigger button — visible when agent panel is closed */}
      <VoiceAgentTrigger />
    </div>
  );
}
