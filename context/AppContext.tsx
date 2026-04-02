"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

type NavItem =
  | "overview"
  | "accounts"
  | "transfers"
  | "billpay"
  | "budgeting"
  | "alerts"
  | "cardguard";

interface User {
  firstName: string;
  lastName: string;
  displayName: string;
}

type VoiceInitState = "initializing" | "ready" | "unavailable";

interface AppContextType {
  activeNav: NavItem;
  setActiveNav: (item: NavItem) => void;
  isContactModalOpen: boolean;
  openContactModal: () => void;
  closeContactModal: () => void;
  isVoiceAgentOpen: boolean;
  openVoiceAgent: () => void;
  closeVoiceAgent: () => void;
  voiceInitState: VoiceInitState;
  setVoiceInitState: (state: VoiceInitState) => void;
  user: User;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [activeNav, setActiveNav] = useState<NavItem>("overview");
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [isVoiceAgentOpen, setIsVoiceAgentOpen] = useState(false);
  const [voiceInitState, setVoiceInitState] = useState<VoiceInitState>("initializing");

  const user: User = {
    firstName: "ANTHONY",
    lastName: "USER",
    displayName: "ANTHONY",
  };

  const openContactModal = () => setIsContactModalOpen(true);
  const closeContactModal = () => setIsContactModalOpen(false);
  const openVoiceAgent = () => setIsVoiceAgentOpen(true);
  const closeVoiceAgent = () => setIsVoiceAgentOpen(false);

  return (
    <AppContext.Provider
      value={{
        activeNav,
        setActiveNav,
        isContactModalOpen,
        openContactModal,
        closeContactModal,
        isVoiceAgentOpen,
        openVoiceAgent,
        closeVoiceAgent,
        voiceInitState,
        setVoiceInitState,
        user,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within AppProvider");
  }
  return context;
}
