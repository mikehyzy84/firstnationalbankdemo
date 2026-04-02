"use client";

import FDICBanner from "./FDICBanner";
import Header from "./Header";
import Navigation from "./Navigation";
import Footer from "./Footer";
import ContactUsModal from "@/components/modals/ContactUsModal";
import VoiceAgent from "@/components/VoiceAgent";
import VoiceAgentTrigger from "@/components/VoiceAgentTrigger";
import { useApp } from "@/context/AppContext";

interface PageLayoutProps {
  children: React.ReactNode;
}

export default function PageLayout({ children }: PageLayoutProps) {
  const { isContactModalOpen, closeContactModal, openVoiceAgent } = useApp();

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
