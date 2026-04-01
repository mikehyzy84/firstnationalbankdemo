"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Search,
  CreditCard,
  ArrowLeftRight,
  FileText,
  PieChart,
  Bell,
  Lock,
} from "lucide-react";

interface NavItem {
  id: string;
  label: string;
  href: string;
  icon: React.ReactNode;
}

const navItems: NavItem[] = [
  {
    id: "overview",
    label: "Overview",
    href: "/overview",
    icon: <Search size={22} />,
  },
  {
    id: "accounts",
    label: "Accounts",
    href: "/accounts",
    icon: <CreditCard size={22} />,
  },
  {
    id: "transfers",
    label: "Transfers",
    href: "/transfers",
    icon: <ArrowLeftRight size={22} />,
  },
  {
    id: "billpay",
    label: "Bill Pay",
    href: "/billpay",
    icon: <FileText size={22} />,
  },
  {
    id: "budgeting",
    label: "Budgeting",
    href: "/budgeting",
    icon: <PieChart size={22} />,
  },
  {
    id: "alerts",
    label: "Alerts/Mobile",
    href: "/alerts",
    icon: <Bell size={22} />,
  },
  {
    id: "cardguard",
    label: "CardGuard™",
    href: "/cardguard",
    icon: <Lock size={22} />,
  },
];

export default function Navigation() {
  const pathname = usePathname();

  const getActiveId = () => {
    for (const item of navItems) {
      if (pathname === item.href || pathname.startsWith(item.href + "/")) {
        return item.id;
      }
    }
    return "overview";
  };

  const activeId = getActiveId();

  return (
    <nav className="w-full bg-white border-b border-gray-300 shadow-sm">
      <div className="flex items-stretch">
        {navItems.map((item) => {
          const isActive = item.id === activeId;
          return (
            <Link
              key={item.id}
              href={item.href}
              className={`flex flex-col items-center justify-center py-2 px-2 min-w-[110px] flex-1 transition-colors ${
                isActive
                  ? "bg-[#006B8F] text-white"
                  : "bg-white text-gray-700 hover:bg-gray-50"
              }`}
            >
              <span className={isActive ? "text-white" : "text-gray-600"}>
                {item.icon}
              </span>
              <span className="text-xs font-medium mt-1 text-center leading-tight">
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
