"use client";

import AccountDropdown from "./AccountDropdown";

export default function AdminTopBar() {
  return (
    <div className="bg-white border-b border-gray-200 shadow-sm px-6 py-3 flex items-center justify-between flex-shrink-0">
      <span className="text-[#1B4F7A] font-semibold text-base">
        Customer Service Management
      </span>
      <AccountDropdown />
    </div>
  );
}
