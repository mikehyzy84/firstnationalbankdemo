"use client";

import { useAdmin } from "@/context/AdminContext";

export default function DemoControls() {
  const { advanceTime, resetAll, advancedHours } = useAdmin();

  return (
    <div className="bg-amber-50 border-b border-amber-200 px-4 py-2 flex items-center gap-3 flex-wrap flex-shrink-0">
      <span className="text-amber-700 text-xs font-semibold uppercase tracking-wider">
        Demo Controls
      </span>
      <div className="flex items-center gap-2 flex-wrap">
        <button
          onClick={() => advanceTime(12)}
          className="text-xs px-3 py-1 rounded border border-amber-400 text-amber-700 hover:bg-amber-100 transition-colors"
        >
          Advance 12 Hours
        </button>
        <button
          onClick={() => advanceTime(24)}
          className="text-xs px-3 py-1 rounded border border-amber-400 text-amber-700 hover:bg-amber-100 transition-colors"
        >
          Advance 24 Hours
        </button>
        <button
          onClick={() => advanceTime(48)}
          className="text-xs px-3 py-1 rounded border border-amber-400 text-amber-700 hover:bg-amber-100 transition-colors"
        >
          Advance 48 Hours
        </button>
        <button
          onClick={resetAll}
          className="text-xs px-3 py-1 rounded border border-red-300 text-red-600 hover:bg-red-50 transition-colors"
        >
          Reset All
        </button>
        {advancedHours > 0 && (
          <span className="text-amber-600 text-xs ml-1">
            Current offset: +{advancedHours}h
          </span>
        )}
      </div>
    </div>
  );
}
