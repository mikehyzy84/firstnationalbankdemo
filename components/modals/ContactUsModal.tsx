"use client";

import { X, Phone, User, Calendar, Mail, MessageSquare, MapPin } from "lucide-react";

interface ContactUsModalProps {
  onClose: () => void;
  onOpenVoiceAgent?: () => void;
}

export default function ContactUsModal({ onClose, onOpenVoiceAgent }: ContactUsModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black bg-opacity-50"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white rounded shadow-xl w-full max-w-md mx-4 z-10">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-[#1B4F7A]">Contact Us</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-5 space-y-5">
          {/* Automated Service */}
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 w-8 h-8 bg-[#006B8F] rounded-full flex items-center justify-center">
              <Phone size={16} className="text-white" />
            </div>
            <div>
              <p className="text-sm text-gray-700 font-medium">
                Automated Service 24 hours a day:
              </p>
              <p className="text-sm text-gray-600">
                1-800-555-5455, Option 1
              </p>
            </div>
          </div>

          {/* Live Representatives */}
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 w-8 h-8 bg-[#006B8F] rounded-full flex items-center justify-center">
              <User size={16} className="text-white" />
            </div>
            <div>
              <p className="text-sm text-gray-700 font-medium">
                Live representatives available at:
              </p>
              <p className="text-sm text-gray-600">1-800-555-5455</p>
              <p className="text-xs text-gray-500 mt-1">
                8 AM &ndash; 9 PM ET (Mon-Fri)
              </p>
              <p className="text-xs text-gray-500">
                8 AM &ndash; 5 PM ET (Sat-Sun)
              </p>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-gray-100" />

          {/* Links */}
          <div className="space-y-3">
            <a
              href="#"
              className="flex items-center gap-3 text-[#006B8F] hover:text-[#005a78] text-sm font-medium transition-colors"
            >
              <div className="flex-shrink-0 w-8 h-8 border border-[#006B8F] rounded-full flex items-center justify-center">
                <Calendar size={15} className="text-[#006B8F]" />
              </div>
              Schedule an Appointment &gt;
            </a>

            <a
              href="/messages"
              className="flex items-center gap-3 text-[#006B8F] hover:text-[#005a78] text-sm font-medium transition-colors"
            >
              <div className="flex-shrink-0 w-8 h-8 border border-[#006B8F] rounded-full flex items-center justify-center">
                <Mail size={15} className="text-[#006B8F]" />
              </div>
              Secure Email Messaging &gt;
            </a>

            <button
              onClick={() => { onClose(); onOpenVoiceAgent?.(); }}
              className="flex items-center gap-3 text-[#006B8F] hover:text-[#005a78] text-sm font-medium transition-colors w-full text-left"
            >
              <div className="flex-shrink-0 w-8 h-8 border border-[#006B8F] rounded-full flex items-center justify-center">
                <MessageSquare size={15} className="text-[#006B8F]" />
              </div>
              Chat with an Agent &gt;
            </button>

            <a
              href="#"
              className="flex items-center gap-3 text-[#006B8F] hover:text-[#005a78] text-sm font-medium transition-colors"
            >
              <div className="flex-shrink-0 w-8 h-8 border border-[#006B8F] rounded-full flex items-center justify-center">
                <MapPin size={15} className="text-[#006B8F]" />
              </div>
              Nearby FNB Locations &gt;
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
