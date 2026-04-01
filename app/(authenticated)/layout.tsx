"use client";

import { AppProvider } from "@/context/AppContext";
import PageLayout from "@/components/layout/PageLayout";

export default function AuthenticatedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AppProvider>
      <PageLayout>{children}</PageLayout>
    </AppProvider>
  );
}
