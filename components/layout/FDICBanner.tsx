export default function FDICBanner() {
  return (
    <div className="w-full bg-white border-b border-gray-200 py-1">
      <div className="flex items-center justify-center gap-2">
        <span className="bg-[#1B4F7A] text-white text-[10px] font-bold px-1 py-0.5 leading-tight">
          FDIC
        </span>
        <span className="text-[11px] text-gray-600">
          FDIC-Insured &ndash; Backed by the full faith and credit of the U.S.
          Government
        </span>
      </div>
    </div>
  );
}
