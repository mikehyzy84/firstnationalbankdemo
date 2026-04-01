"use client";

import { CreditCard, ChevronRight, ArrowLeftRight } from "lucide-react";
import Link from "next/link";

interface Account {
  id: string;
  type: string;
  name: string;
  number: string;
  balance: number;
  available: number;
  routingNumber: string;
}

const accounts: Account[] = [
  {
    id: "1",
    type: "Checking",
    name: "FNB Personal Checking",
    number: "****4821",
    balance: 3247.58,
    available: 3247.58,
    routingNumber: "043318895",
  },
  {
    id: "2",
    type: "Savings",
    name: "FNB Personal Savings",
    number: "****7093",
    balance: 12850.0,
    available: 12850.0,
    routingNumber: "043318895",
  },
  {
    id: "3",
    type: "Checking",
    name: "FNB Business Checking",
    number: "****2156",
    balance: 8410.33,
    available: 8000.0,
    routingNumber: "043318895",
  },
];

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
}

export default function AccountsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-[#1B4F7A]">My Accounts</h1>

      <div className="space-y-3">
        {accounts.map((account) => (
          <div
            key={account.id}
            className="bg-white border border-[#CCCCCC] rounded-lg shadow-sm overflow-hidden"
          >
            {/* Account header row */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#006B8F] bg-opacity-10 flex items-center justify-center">
                  <CreditCard size={20} className="text-[#006B8F]" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-[#1B4F7A]">{account.name}</p>
                  <p className="text-xs text-gray-500">
                    {account.type} &bull; {account.number}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-6">
                <div className="text-right">
                  <p className="text-xs text-gray-500">Current Balance</p>
                  <p className="text-lg font-bold text-gray-800">{formatCurrency(account.balance)}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-500">Available</p>
                  <p className="text-sm font-medium text-gray-600">
                    {formatCurrency(account.available)}
                  </p>
                </div>
                <button className="text-[#006B8F] hover:text-[#005a78]">
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>

            {/* Quick action row */}
            <div className="flex items-center gap-4 px-5 py-2.5 bg-gray-50">
              <p className="text-xs text-gray-500">
                Routing: {account.routingNumber}
              </p>
              <div className="flex-1" />
              <Link
                href="/transfers"
                className="flex items-center gap-1 text-xs text-[#006B8F] hover:text-[#005a78] font-medium"
              >
                <ArrowLeftRight size={13} />
                Transfer
              </Link>
              <button className="flex items-center gap-1 text-xs text-[#006B8F] hover:text-[#005a78] font-medium">
                <ChevronRight size={13} />
                View History
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white border border-[#CCCCCC] rounded-lg shadow-sm p-5">
        <h2 className="text-sm font-semibold text-[#1B4F7A] mb-2">
          Open a New Account
        </h2>
        <p className="text-sm text-gray-600 mb-3">
          Interested in additional FNB products? Explore our checking, savings, money market, and CD options.
        </p>
        <button className="flex items-center gap-1.5 text-sm text-white bg-[#006B8F] px-4 py-2 rounded hover:bg-[#005a78] transition-colors">
          Explore Account Options <ChevronRight size={15} />
        </button>
      </div>
    </div>
  );
}
