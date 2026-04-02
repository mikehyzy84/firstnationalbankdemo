"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, ClipboardList, BarChart2, Settings } from "lucide-react";

function FNBLogoWhite() {
  return (
    <div className="flex items-center gap-2">
      <div className="relative w-10 h-10 flex-shrink-0">
        <svg viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <rect width="40" height="40" fill="#A01E22" rx="2" />
          <rect x="6" y="8" width="4" height="24" fill="white" />
          <polygon points="10,8 28,14 10,20" fill="white" />
        </svg>
      </div>
      <div className="flex flex-col leading-tight">
        <span className="text-white font-bold text-lg leading-none">
          First National
        </span>
        <span className="text-white font-bold text-lg leading-none">
          Bank
        </span>
      </div>
    </div>
  );
}

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/admin" },
  { icon: ClipboardList, label: "Ticket Queue", href: "/admin/tickets" },
  { icon: BarChart2, label: "Team Performance", href: "/admin/performance" },
  { icon: Settings, label: "Settings", href: "/admin/settings" },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  function isActive(href: string) {
    if (href === "/admin") {
      return pathname === "/admin" || pathname === "/admin/";
    }
    return pathname?.startsWith(href);
  }

  return (
    <div
      className="flex flex-col h-full"
      style={{ width: 220, backgroundColor: "#1B4F7A", flexShrink: 0 }}
    >
      {/* Logo */}
      <div className="px-4 py-4 border-b border-white/10">
        <FNBLogoWhite />
      </div>

      {/* Section label */}
      <div className="px-4 pt-4 pb-2">
        <span className="text-xs text-white/50 font-semibold uppercase tracking-wider">
          Customer Service
        </span>
      </div>

      {/* Nav items */}
      <nav className="flex-1 px-2 py-1">
        {navItems.map(({ icon: Icon, label, href }) => {
          const active = isActive(href);
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded text-sm text-white mb-0.5 transition-colors ${
                active
                  ? "bg-white/10 border-l-[3px] border-[#1B9AC4] pl-[9px]"
                  : "hover:bg-white/10 border-l-[3px] border-transparent pl-[9px]"
              }`}
            >
              <Icon size={18} />
              <span>{label}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
