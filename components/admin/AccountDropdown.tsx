"use client";

import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { ChevronDown, LogOut, ArrowLeftRight, LayoutDashboard } from "lucide-react";

export default function AccountDropdown() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const isAdmin = pathname?.startsWith("/admin");

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex items-center gap-1.5 bg-[#006B8F] text-white px-3 py-1.5 rounded text-sm font-medium hover:bg-[#005a78] transition-colors"
      >
        Mike
        <ChevronDown size={14} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-1 min-w-[200px] bg-white border border-gray-200 rounded shadow-lg z-50">
          <Link
            href="/login"
            className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
            onClick={() => setIsOpen(false)}
          >
            <LogOut size={15} className="text-gray-500" />
            Log Out
          </Link>
          <div className="border-t border-gray-100" />
          {isAdmin ? (
            <Link
              href="/overview"
              className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              <ArrowLeftRight size={15} className="text-gray-500" />
              Switch to Customer Portal
            </Link>
          ) : (
            <Link
              href="/admin"
              className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              <LayoutDashboard size={15} className="text-gray-500" />
              Switch to Admin Dashboard
            </Link>
          )}
        </div>
      )}
    </div>
  );
}
