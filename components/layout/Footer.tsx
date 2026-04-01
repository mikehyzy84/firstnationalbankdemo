import { MapPin, Phone, Smartphone } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full bg-gray-700 text-white mt-auto">
      <div className="flex items-center justify-between px-6 py-3">
        {/* Bank name */}
        <div className="text-sm font-medium">
          First National Bank | Pittsburgh, PA
        </div>

        {/* Footer links */}
        <div className="flex items-center gap-6">
          <a
            href="#"
            className="flex items-center gap-1.5 text-sm text-gray-200 hover:text-white transition-colors"
          >
            <MapPin size={15} />
            <span>Find a Branch/ATM</span>
          </a>
          <a
            href="#"
            className="flex items-center gap-1.5 text-sm text-gray-200 hover:text-white transition-colors"
          >
            <Phone size={15} />
            <span>833-BANK-FNB</span>
          </a>
          <a
            href="#"
            className="flex items-center gap-1.5 text-sm text-gray-200 hover:text-white transition-colors"
          >
            <Smartphone size={15} />
            <span>Check out our Apps!</span>
          </a>
        </div>

        {/* Equal Housing Lender */}
        <div className="flex items-center gap-1.5" title="Equal Housing Lender">
          {/* Simple equal housing lender icon */}
          <svg
            viewBox="0 0 40 40"
            xmlns="http://www.w3.org/2000/svg"
            className="w-8 h-8 fill-white"
          >
            <path d="M20 4 L4 18 h4 v16 h8 v-10 h8 v10 h8 V18 h4 Z" />
            <rect x="10" y="24" width="20" height="2" />
            <rect x="10" y="28" width="20" height="2" />
          </svg>
          <span className="text-xs text-gray-300">Equal Housing Lender</span>
        </div>
      </div>
    </footer>
  );
}
