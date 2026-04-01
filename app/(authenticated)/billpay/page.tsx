"use client";

import { Plus, ChevronRight, FileText, Calendar, ArrowRight } from "lucide-react";

interface Payee {
  id: string;
  name: string;
  accountMask: string;
  nextPayment?: string;
  amount?: number;
}

const payees: Payee[] = [
  { id: "1", name: "Electric Company", accountMask: "****8821", nextPayment: "Apr 15, 2026", amount: 125.0 },
  { id: "2", name: "Internet Provider", accountMask: "****3344", nextPayment: "Apr 20, 2026", amount: 79.99 },
  { id: "3", name: "Water & Sewer", accountMask: "****5512", nextPayment: "Apr 22, 2026", amount: 45.0 },
];

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(amount);
}

export default function BillPayPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-[#1B4F7A]">Bill Pay</h1>
        <button className="flex items-center gap-1.5 px-4 py-2 bg-[#006B8F] text-white text-sm font-medium rounded hover:bg-[#005a78] transition-colors">
          <Plus size={15} />
          Add Payee
        </button>
      </div>

      {/* Scheduled Payments */}
      <div className="bg-white border border-[#CCCCCC] rounded-lg shadow-sm overflow-hidden">
        <div className="bg-[#006B8F] px-5 py-3">
          <h2 className="text-sm font-semibold text-white">Scheduled Payments</h2>
        </div>

        <div className="divide-y divide-gray-100">
          {payees.map((payee, idx) => (
            <div
              key={payee.id}
              className={`flex items-center justify-between px-5 py-3.5 ${idx % 2 === 0 ? "bg-white" : "bg-gray-50"}`}
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-[#006B8F] bg-opacity-10 flex items-center justify-center">
                  <FileText size={16} className="text-[#006B8F]" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-800">{payee.name}</p>
                  <p className="text-xs text-gray-500">{payee.accountMask}</p>
                </div>
              </div>

              <div className="flex items-center gap-6">
                {payee.nextPayment && (
                  <div className="flex items-center gap-1.5 text-xs text-gray-500">
                    <Calendar size={13} />
                    <span>Next: {payee.nextPayment}</span>
                  </div>
                )}
                {payee.amount !== undefined && (
                  <span className="text-sm font-semibold text-gray-700">
                    {formatCurrency(payee.amount)}
                  </span>
                )}
                <button className="flex items-center gap-1 text-xs text-[#006B8F] hover:text-[#005a78] font-medium">
                  Pay Now <ArrowRight size={13} />
                </button>
                <button className="text-[#006B8F] hover:text-[#005a78]">
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Pay multiple bills */}
      <div className="bg-white border border-[#CCCCCC] rounded-lg shadow-sm p-5">
        <h2 className="text-sm font-semibold text-[#1B4F7A] mb-3">Pay Multiple Bills</h2>
        <p className="text-sm text-gray-600 mb-4">
          Make payments to multiple payees at once. Set amounts, dates, and submit all in one step.
        </p>
        <button className="flex items-center gap-1.5 text-sm text-white bg-[#006B8F] px-4 py-2 rounded hover:bg-[#005a78] transition-colors">
          Multi-Pay <ArrowRight size={15} />
        </button>
      </div>

      {/* Payment History */}
      <div className="bg-white border border-[#CCCCCC] rounded-lg shadow-sm overflow-hidden">
        <div className="bg-[#006B8F] px-5 py-3">
          <h2 className="text-sm font-semibold text-white">Payment History</h2>
        </div>
        <div className="px-5 py-6 text-center text-sm text-gray-500">
          No recent payment history to display.
        </div>
      </div>
    </div>
  );
}
