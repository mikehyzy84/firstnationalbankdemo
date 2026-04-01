"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

function FNBLogo() {
  return (
    <div className="flex flex-col items-center gap-3">
      <div className="relative w-16 h-16 flex-shrink-0">
        <svg viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <rect width="40" height="40" fill="#A01E22" rx="2" />
          <rect x="6" y="8" width="4" height="24" fill="white" />
          <polygon points="10,8 28,14 10,20" fill="white" />
        </svg>
      </div>
      <div className="flex flex-col items-center leading-tight">
        <span className="text-[#1B4F7A] font-bold text-2xl leading-none">
          First National Bank
        </span>
        <span className="text-[#006B8F] text-sm mt-1">Online Banking</span>
      </div>
    </div>
  );
}

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !password) {
      setError("Please enter your username and password.");
      return;
    }
    // Demo: any credentials work
    router.push("/overview");
  };

  return (
    <div className="min-h-screen bg-[#F5F5F5] flex flex-col">
      {/* FDIC Banner */}
      <div className="w-full bg-white border-b border-gray-200 py-1">
        <div className="flex items-center justify-center gap-2">
          <span className="bg-[#1B4F7A] text-white text-[10px] font-bold px-1 py-0.5 leading-tight">
            FDIC
          </span>
          <span className="text-[11px] text-gray-600">
            FDIC-Insured &ndash; Backed by the full faith and credit of the U.S. Government
          </span>
        </div>
      </div>

      {/* Header */}
      <header className="w-full bg-white border-b border-gray-200 shadow-sm px-6 py-3">
        <div className="max-w-7xl mx-auto flex items-center gap-2">
          <div className="relative w-10 h-10 flex-shrink-0">
            <svg viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
              <rect width="40" height="40" fill="#A01E22" rx="2" />
              <rect x="6" y="8" width="4" height="24" fill="white" />
              <polygon points="10,8 28,14 10,20" fill="white" />
            </svg>
          </div>
          <div className="flex flex-col leading-tight">
            <span className="text-[#1B4F7A] font-bold text-lg leading-none">First National</span>
            <span className="text-[#1B4F7A] font-bold text-lg leading-none">Bank</span>
          </div>
        </div>
      </header>

      {/* Login form */}
      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="bg-white rounded shadow-md border border-gray-200 w-full max-w-md p-8">
          <div className="mb-8">
            <FNBLogo />
          </div>

          <h2 className="text-xl font-semibold text-[#1B4F7A] text-center mb-6">
            Sign In to Online Banking
          </h2>

          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded text-sm text-red-700">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Username
              </label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#006B8F] focus:border-transparent text-sm"
                placeholder="Enter your username"
                autoComplete="username"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#006B8F] focus:border-transparent text-sm"
                placeholder="Enter your password"
                autoComplete="current-password"
              />
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="rounded border-gray-300 text-[#006B8F]" />
                <span className="text-gray-600">Remember me</span>
              </label>
              <a href="#" className="text-[#006B8F] hover:text-[#005a78]">
                Forgot password?
              </a>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 bg-[#006B8F] text-white font-semibold rounded hover:bg-[#005a78] transition-colors text-sm"
            >
              Log In
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-gray-200 text-center space-y-2">
            <p className="text-sm text-gray-500">
              Not yet enrolled?{" "}
              <a href="#" className="text-[#006B8F] hover:text-[#005a78] font-medium">
                Enroll in Online Banking
              </a>
            </p>
            <p className="text-xs text-gray-400">
              Need help?{" "}
              <a href="#" className="text-[#006B8F] hover:text-[#005a78]">
                Contact Us
              </a>
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="w-full bg-gray-700 text-white">
        <div className="flex items-center justify-center px-6 py-3">
          <span className="text-sm">First National Bank | Pittsburgh, PA</span>
        </div>
      </footer>
    </div>
  );
}
