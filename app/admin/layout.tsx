"use client";

import { AdminProvider } from "@/context/AdminContext";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminTopBar from "@/components/admin/AdminTopBar";
import DemoControls from "@/components/admin/DemoControls";
import TicketDetail from "@/components/admin/TicketDetail";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AdminProvider>
      <div className="flex h-screen overflow-hidden">
        {/* Sidebar */}
        <AdminSidebar />

        {/* Main area */}
        <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
          <AdminTopBar />
          <DemoControls />
          <div className="flex-1 overflow-y-auto bg-[#F5F5F5]">
            {children}
          </div>
        </div>
      </div>
      <TicketDetail />
    </AdminProvider>
  );
}
