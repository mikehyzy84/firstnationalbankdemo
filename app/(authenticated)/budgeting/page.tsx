"use client";

import { useState } from "react";
import { Printer, ChevronLeft, ChevronRight, ChevronDown, Plus, ArrowRight } from "lucide-react";
import Link from "next/link";

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

interface BudgetCategory {
  category: string;
  subcategory?: string;
  spent: number;
  budget: number;
}

const budgetCategories: BudgetCategory[] = [
  { category: "Entertainment", subcategory: "Restaurants", spent: 30.0, budget: 50.0 },
  { category: "Household", subcategory: "Retail", spent: 0.0, budget: 100.0 },
  { category: "Telecomm Services & Utilities", spent: 30.0, budget: 50.0 },
];

export default function BudgetingPage() {
  const [activeSpendingTab, setActiveSpendingTab] = useState<"spending" | "compare">("spending");
  const [currentMonth, setCurrentMonth] = useState(3); // April = index 3
  const [currentYear, setCurrentYear] = useState(2026);

  const prevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear((y) => y - 1);
    } else {
      setCurrentMonth((m) => m - 1);
    }
  };

  const nextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear((y) => y + 1);
    } else {
      setCurrentMonth((m) => m + 1);
    }
  };

  const monthLabel = `${MONTHS[currentMonth]} ${currentYear}`;

  return (
    <div className="space-y-4">
      {/* Page heading */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#1B4F7A]">Budgeting</h1>
          <p className="text-sm text-gray-600 mt-1">
            Here you can view spending and budgets for all your accounts. You may also want to{" "}
            <a href="#" className="text-[#006B8F] underline hover:text-[#005a78]">
              Manage Your Categories
            </a>
            .
          </p>
        </div>
        <button
          className="flex items-center gap-1.5 text-sm text-gray-600 hover:text-[#006B8F] border border-gray-300 rounded px-3 py-1.5 hover:border-[#006B8F] transition-colors"
          title="Print"
        >
          <Printer size={15} />
          <span>Print</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Left panel - Spending */}
        <div className="bg-white border border-[#CCCCCC] rounded-lg overflow-hidden shadow-sm">
          {/* Tabs */}
          <div className="flex border-b border-[#CCCCCC]">
            <button
              onClick={() => setActiveSpendingTab("spending")}
              className={`px-5 py-3 text-sm font-medium border-b-2 transition-colors ${
                activeSpendingTab === "spending"
                  ? "border-[#A01E22] text-[#A01E22]"
                  : "border-transparent text-gray-600 hover:text-[#006B8F]"
              }`}
            >
              My Spending
            </button>
            <button
              onClick={() => setActiveSpendingTab("compare")}
              className={`px-5 py-3 text-sm font-medium border-b-2 transition-colors ${
                activeSpendingTab === "compare"
                  ? "border-[#A01E22] text-[#A01E22]"
                  : "border-transparent text-gray-600 hover:text-[#006B8F]"
              }`}
            >
              Compare Budget(s)
            </button>
          </div>

          <div className="p-5">
            <h2 className="text-base font-semibold text-[#1B4F7A] mb-1">
              {monthLabel} Budgeting
            </h2>

            {activeSpendingTab === "spending" && (
              <div className="space-y-4">
                {/* Empty state */}
                <div className="py-8 px-4 text-center border border-dashed border-gray-300 rounded-lg bg-gray-50">
                  <p className="text-sm text-gray-500">
                    No spending was found for the selected month. Please select a different month
                    to view spending pie chart.
                  </p>
                </div>

                {/* Month navigation */}
                <div className="flex items-center justify-between">
                  <button
                    onClick={prevMonth}
                    className="flex items-center gap-1 text-sm text-[#006B8F] hover:text-[#005a78] font-medium"
                  >
                    <ChevronLeft size={16} />
                    Previous Month
                  </button>

                  <div className="relative">
                    <select
                      value={`${currentMonth}-${currentYear}`}
                      onChange={(e) => {
                        const [m, y] = e.target.value.split("-").map(Number);
                        setCurrentMonth(m);
                        setCurrentYear(y);
                      }}
                      className="appearance-none border border-gray-300 rounded px-3 py-1.5 pr-7 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#006B8F]"
                    >
                      {MONTHS.map((name, idx) => (
                        <option key={idx} value={`${idx}-${currentYear}`}>
                          {name} {currentYear}
                        </option>
                      ))}
                    </select>
                    <ChevronDown size={14} className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
                  </div>

                  <button
                    onClick={nextMonth}
                    className="flex items-center gap-1 text-sm text-[#006B8F] hover:text-[#005a78] font-medium"
                  >
                    Next Month
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            )}

            {activeSpendingTab === "compare" && (
              <div className="py-8 text-center text-sm text-gray-500 border border-dashed border-gray-300 rounded-lg bg-gray-50 mt-4">
                No budget comparison data available for {monthLabel}.
              </div>
            )}
          </div>
        </div>

        {/* Right panel - This Month's Budget */}
        <div className="bg-white border border-[#CCCCCC] rounded-lg overflow-hidden shadow-sm">
          {/* Tab header */}
          <div className="border-b border-[#CCCCCC]">
            <div className="px-5 py-3">
              <button className="text-sm font-medium border-b-2 border-[#A01E22] text-[#A01E22] pb-1">
                This Month&apos;s Budget
              </button>
            </div>
          </div>

          <div className="p-5 space-y-4">
            {/* Budget heading */}
            <div className="flex items-center justify-between">
              <h2 className="text-base font-semibold text-[#1B4F7A]">
                {monthLabel} Budget
              </h2>
              <button className="flex items-center gap-1 text-sm text-[#006B8F] hover:text-[#005a78] font-medium">
                <Plus size={14} />
                Add a category to your budget
                <ArrowRight size={14} />
              </button>
            </div>

            <p className="text-sm text-gray-600">
              Understand where your money is going...
            </p>

            <div className="bg-[#006B8F] bg-opacity-5 border border-[#006B8F] border-opacity-20 rounded p-3">
              <p className="text-sm text-[#1B4F7A] font-medium text-center">
                Start by Adding a Category to Budget
              </p>
            </div>

            {/* Budget table (blurred/greyed) */}
            <div className="relative overflow-hidden rounded border border-[#CCCCCC]">
              <div className="blur-sm select-none pointer-events-none">
                {/* Table header */}
                <div className="bg-[#006B8F] text-white grid grid-cols-3 text-xs font-semibold px-3 py-2">
                  <span>Category</span>
                  <span className="text-center">Spent</span>
                  <span className="text-right">Budget</span>
                </div>

                {/* Rows */}
                {budgetCategories.map((cat, idx) => (
                  <div
                    key={idx}
                    className={`grid grid-cols-3 px-3 py-2.5 text-sm border-b border-gray-100 last:border-0 ${
                      idx % 2 === 0 ? "bg-white" : "bg-gray-50"
                    }`}
                  >
                    <div>
                      <span className="text-gray-700 font-medium">{cat.category}</span>
                      {cat.subcategory && (
                        <span className="text-gray-500 ml-1 text-xs">&gt; {cat.subcategory}</span>
                      )}
                    </div>
                    <div className="text-center text-gray-600">
                      ${cat.spent.toFixed(2)}
                    </div>
                    <div className="text-right text-gray-600">
                      ${cat.budget.toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>

              {/* Overlay */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-white bg-opacity-80 rounded px-4 py-2 shadow text-sm text-gray-500 font-medium">
                  Add categories to see your budget
                </div>
              </div>
            </div>

            {/* Import button */}
            <button className="w-full flex items-center justify-center gap-2 py-2.5 bg-[#006B8F] text-white text-sm font-medium rounded hover:bg-[#005a78] transition-colors">
              Import Previous Month&apos;s Transaction Categories
              <ArrowRight size={15} />
            </button>

            {/* Footer link */}
            <div className="pt-1">
              <button className="flex items-center gap-1 text-sm text-[#006B8F] hover:text-[#005a78]">
                <span className="text-xs">&#9658;</span>
                Accounts included in your budget for {monthLabel}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
