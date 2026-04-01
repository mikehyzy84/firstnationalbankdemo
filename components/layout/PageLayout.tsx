"use client";

import FDICBanner from "./FDICBanner";
import Header from "./Header";
import Navigation from "./Navigation";
import Footer from "./Footer";
import ContactUsModal from "@/components/modals/ContactUsModal";
import { useApp } from "@/context/AppContext";

interface PageLayoutProps {
  children: React.ReactNode;
}

export default function PageLayout({ children }: PageLayoutProps) {
  const { isContactModalOpen, closeContactModal } = useApp();

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
      {isContactModalOpen && <ContactUsModal onClose={closeContactModal} />}

      {/*
       * ELEVENLABS VOICE AGENT WIDGET PLACEHOLDER
       * To add the ElevenLabs voice agent, drop the widget component here:
       * Example:
       * <ElevenLabsWidget agentId="your-agent-id" />
       *
       * The widget should be a fixed/floating component that renders
       * on top of the page content.
       */}
    </div>
  );
}
