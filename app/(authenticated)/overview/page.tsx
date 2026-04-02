"use client";

import Link from "next/link";
import {
  ArrowLeftRight,
  FileText,
  Plus,
  TrendingUp,
  Eye,
  EyeOff,
  ChevronRight,
} from "lucide-react";
import { useState } from "react";

interface Account {
  id: string;
  type: string;
  name: string;
  number: string;
  balance: number;
  available: number;
  color: string;
}

const accounts: Account[] = [
  {
    id: "1",
    type: "Checking",
    name: "FNB Personal Checking",
    number: "****4821",
    balance: 3247.58,
    available: 3247.58,
    color: "#006B8F",
  },
  {
    id: "2",
    type: "Savings",
    name: "FNB Personal Savings",
    number: "****7093",
    balance: 12850.00,
    available: 12850.00,
    color: "#1B4F7A",
  },
  {
    id: "3",
    type: "Checking",
    name: "FNB Business Checking",
    number: "****2156",
    balance: 8410.33,
    available: 8000.00,
    color: "#1B9AC4",
  },
];

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
}

interface RecentTransaction {
  date: string;
  description: string;
  amount: number;
  type: "debit" | "credit";
}

const personalTransactions: RecentTransaction[] = [
  { date: "Mar 30", description: "WHOLE FOODS MARKET #489",      amount: -87.34,   type: "debit"  },
  { date: "Mar 29", description: "DIRECT DEPOSIT - EMPLOYER",    amount: 2450.00,  type: "credit" },
  { date: "Mar 28", description: "NETFLIX.COM",                  amount: -15.99,   type: "debit"  },
  { date: "Mar 28", description: "NETFLIX.COM",                  amount: -15.99,   type: "debit"  },
  { date: "Mar 27", description: "SHELL OIL #4521",              amount: -52.10,   type: "debit"  },
  { date: "Mar 26", description: "AMAZON MARKETPLACE",           amount: -34.99,   type: "debit"  },
  { date: "Mar 26", description: "CHECK DEP #1847",              amount: 4200.00,  type: "credit" },
  { date: "Mar 25", description: "POS DEBIT WPY*DNTRSVC",        amount: -129.00,  type: "debit"  },
  { date: "Mar 24", description: "SPOTIFY PREMIUM",              amount: -16.99,   type: "debit"  },
  { date: "Mar 23", description: "AT&T WIRELESS",                amount: -185.00,  type: "debit"  },
  { date: "Mar 22", description: "OVERDRAFT FEE",                amount: -35.00,   type: "debit"  },
  { date: "Mar 21", description: "DUKE ENERGY",                  amount: -287.50,  type: "debit"  },
];

const businessTransactions: RecentTransaction[] = [
  { date: "Apr 1",  description: "PAYROLL - ADP",                  amount: -12400.00, type: "debit"  },
  { date: "Mar 31", description: "VENDOR PMT - GRAINGER IND",      amount: -3847.00,  type: "debit"  },
  { date: "Mar 30", description: "CLIENT INVOICE #2847",           amount: 18500.00,  type: "credit" },
  { date: "Mar 29", description: "COMCAST BUSINESS",               amount: -249.99,   type: "debit"  },
  { date: "Mar 28", description: "VENDOR PMT - GRAINGER IND",      amount: -3847.00,  type: "debit"  },
  { date: "Mar 27", description: "OFFICE DEPOT #1192",             amount: -412.50,   type: "debit"  },
  { date: "Mar 26", description: "CLIENT INVOICE #2831",           amount: 7200.00,   type: "credit" },
  { date: "Mar 25", description: "COMMERCIAL RENT PMT",            amount: -4500.00,  type: "debit"  },
  { date: "Mar 24", description: "EQUIP LEASE PMT - DEERE",        amount: -1875.00,  type: "debit"  },
  { date: "Mar 23", description: "UNKNOWN ACH DEBIT - WEBSVCS",    amount: -899.00,   type: "debit"  },
];

export default function OverviewPage() {
  const [showBalances, setShowBalances] = useState(true);
  const [txTab, setTxTab] = useState<"personal" | "business">("personal");
  const transactions = txTab === "personal" ? personalTransactions : businessTransactions;

  const totalBalance = accounts.reduce((sum, a) => sum + a.balance, 0);

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-[#1B4F7A]">Account Overview</h1>
        <button
          onClick={() => setShowBalances(!showBalances)}
          className="flex items-center gap-2 text-sm text-[#006B8F] hover:text-[#005a78] transition-colors"
        >
          {showBalances ? <EyeOff size={16} /> : <Eye size={16} />}
          {showBalances ? "Hide Balances" : "Show Balances"}
        </button>
      </div>

      {/* Total summary banner */}
      <div className="bg-[#1B4F7A] text-white rounded-lg p-4 shadow">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-blue-200 text-sm">Total Balance Across All Accounts</p>
            <p className="text-3xl font-bold mt-1">
              {showBalances ? formatCurrency(totalBalance) : "••••••"}
            </p>
          </div>
          <TrendingUp size={40} className="text-blue-300 opacity-60" />
        </div>
      </div>

      {/* Account cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {accounts.map((account) => (
          <div
            key={account.id}
            className="bg-white rounded-lg border border-[#CCCCCC] shadow-sm overflow-hidden hover:shadow-md transition-shadow"
          >
            {/* Card top bar */}
            <div
              className="h-1.5 w-full"
              style={{ backgroundColor: account.color }}
            />
            <div className="p-4">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                    {account.type}
                  </p>
                  <p className="text-sm font-semibold text-[#1B4F7A] mt-0.5">
                    {account.name}
                  </p>
                  <p className="text-xs text-gray-400">{account.number}</p>
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-500">Current Balance</span>
                  <span className="text-lg font-bold text-gray-800">
                    {showBalances ? formatCurrency(account.balance) : "••••••"}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-500">Available Balance</span>
                  <span className="text-sm font-medium text-gray-600">
                    {showBalances ? formatCurrency(account.available) : "••••••"}
                  </span>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-gray-100 flex gap-2">
                <Link
                  href="/transfers"
                  className="flex-1 text-center text-xs py-1.5 bg-[#006B8F] text-white rounded hover:bg-[#005a78] transition-colors"
                >
                  Transfer
                </Link>
                <button className="flex-1 text-center text-xs py-1.5 border border-[#006B8F] text-[#006B8F] rounded hover:bg-[#006B8F] hover:text-white transition-colors">
                  History
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg border border-[#CCCCCC] shadow-sm p-5">
        <h2 className="text-base font-semibold text-[#1B4F7A] mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <Link
            href="/transfers"
            className="flex flex-col items-center gap-2 p-3 rounded-lg border border-gray-200 hover:border-[#006B8F] hover:bg-blue-50 transition-colors group"
          >
            <div className="w-10 h-10 rounded-full bg-[#006B8F] bg-opacity-10 flex items-center justify-center group-hover:bg-opacity-20">
              <ArrowLeftRight size={20} className="text-[#006B8F]" />
            </div>
            <span className="text-xs font-medium text-gray-700 text-center">Transfer Funds</span>
          </Link>

          <Link
            href="/billpay"
            className="flex flex-col items-center gap-2 p-3 rounded-lg border border-gray-200 hover:border-[#006B8F] hover:bg-blue-50 transition-colors group"
          >
            <div className="w-10 h-10 rounded-full bg-[#006B8F] bg-opacity-10 flex items-center justify-center group-hover:bg-opacity-20">
              <FileText size={20} className="text-[#006B8F]" />
            </div>
            <span className="text-xs font-medium text-gray-700 text-center">Pay Bills</span>
          </Link>

          <Link
            href="/messages"
            className="flex flex-col items-center gap-2 p-3 rounded-lg border border-gray-200 hover:border-[#006B8F] hover:bg-blue-50 transition-colors group"
          >
            <div className="w-10 h-10 rounded-full bg-[#006B8F] bg-opacity-10 flex items-center justify-center group-hover:bg-opacity-20">
              <Plus size={20} className="text-[#006B8F]" />
            </div>
            <span className="text-xs font-medium text-gray-700 text-center">Send Message</span>
          </Link>

          <Link
            href="/alerts"
            className="flex flex-col items-center gap-2 p-3 rounded-lg border border-gray-200 hover:border-[#006B8F] hover:bg-blue-50 transition-colors group"
          >
            <div className="w-10 h-10 rounded-full bg-[#006B8F] bg-opacity-10 flex items-center justify-center group-hover:bg-opacity-20">
              <TrendingUp size={20} className="text-[#006B8F]" />
            </div>
            <span className="text-xs font-medium text-gray-700 text-center">Set Alerts</span>
          </Link>
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="bg-white rounded-lg border border-[#CCCCCC] shadow-sm overflow-hidden">
        {/* Header row */}
        <div className="bg-[#006B8F] px-5 py-3 flex items-center justify-between">
          <h2 className="text-sm font-semibold text-white">Recent Transactions</h2>
          <button className="text-xs text-blue-200 hover:text-white flex items-center gap-1">
            View All <ChevronRight size={14} />
          </button>
        </div>

        {/* Account toggle tabs */}
        <div className="flex border-b border-gray-200">
          <button
            onClick={() => setTxTab("personal")}
            className={`flex-1 py-2 text-xs font-semibold tracking-wide transition-colors ${
              txTab === "personal"
                ? "bg-white text-[#006B8F] border-b-2 border-[#006B8F]"
                : "bg-gray-50 text-gray-500 hover:text-[#006B8F]"
            }`}
          >
            Personal Checking ****4821
          </button>
          <button
            onClick={() => setTxTab("business")}
            className={`flex-1 py-2 text-xs font-semibold tracking-wide transition-colors ${
              txTab === "business"
                ? "bg-white text-[#006B8F] border-b-2 border-[#006B8F]"
                : "bg-gray-50 text-gray-500 hover:text-[#006B8F]"
            }`}
          >
            Business Checking ****2156
          </button>
        </div>

        {/* Scrollable transaction list */}
        <div className="max-h-80 overflow-y-auto divide-y divide-gray-100">
          {transactions.map((tx, idx) => (
            <div
              key={idx}
              className={`flex items-center justify-between px-5 py-3 ${
                idx % 2 === 0 ? "bg-white" : "bg-gray-50"
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="text-xs text-gray-500 w-14 flex-shrink-0">{tx.date}</span>
                <span className="text-sm text-gray-700">{tx.description}</span>
              </div>
              <span
                className={`text-sm font-semibold whitespace-nowrap ml-4 ${
                  tx.type === "credit" ? "text-green-600" : "text-gray-800"
                }`}
              >
                {tx.type === "credit" ? "+" : ""}
                {showBalances ? formatCurrency(tx.amount) : "••••••"}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
