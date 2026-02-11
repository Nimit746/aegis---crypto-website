"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  BarChart3,
  Brain,
  Wallet,
  Bell,
  Settings,
  HelpCircle,
  User
} from "lucide-react";

const Sidebar = () => {
  const pathname = usePathname();

  const navItems = [
    { name: "Dashboard", href: "/", icon: Home },
    { name: "Markets", href: "/market", icon: BarChart3 },
    { name: "AI Insights", href: "/ai-insights", icon: Brain },
    { name: "Portfolio", href: "/portfolio", icon: Wallet },
    { name: "Alerts", href: "/alerts", icon: Bell },
  ];

  const systemItems = [
    { name: "Settings", href: "/settings", icon: Settings },
    { name: "Support", href: "/support", icon: HelpCircle },
  ];

  const [hasMounted, setHasMounted] = React.useState(false);

  React.useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) {
    return <div className="fixed left-0 top-0 h-screen w-64 bg-gray-900 border-r border-gray-800 z-50 animate-pulse"></div>;
  }

  return (
    <div className="fixed left-0 top-0 h-screen w-64 bg-gray-900 border-r border-gray-800 flex flex-col z-50">
      {/* Logo Section - Glowing Shield */}
      <div className="p-6 border-b border-gray-800">
        <div className="flex items-center space-x-3">
          {/* Shield with Glow Effect */}
          <div className="relative group">
            {/* Outer glow */}
            <div className="absolute -inset-1 bg-linear-to-r from-green-400 to-emerald-500 rounded-lg blur opacity-70 group-hover:opacity-100 transition duration-300"></div>

            {/* Shield container */}
            <div className="relative w-10 h-10 bg-linear-to-br from-green-600 to-emerald-600 rounded-lg flex items-center justify-center shadow-xl shadow-green-500/40 ring-1 ring-green-400/30">
              {/* Shield icon */}
              <svg
                className="w-6 h-6 text-black"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>

              {/* Inner shine */}
              <div className="absolute inset-0 rounded-lg bg-linear-to-b from-white/20 to-transparent"></div>
            </div>
          </div>

          <div>
            <h1 className="text-xl font-bold text-white">Aegis Crypto</h1>
            <p className="text-xs text-green-400">Intelligence Platform</p>
          </div>
        </div>
      </div>

      {/* Main Navigation - Green active states */}
      <div className="flex-1 p-4 space-y-8 overflow-y-auto">
        <div>
          <div className="mb-4">
            <p className="text-xs text-gray-500 uppercase tracking-wider">AEGIS INTELLIGENCE</p>
          </div>
          <div className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center p-3 rounded-lg transition-all group ${isActive
                    ? "bg-gray-800 text-green-400 border-l-4 border-green-500 shadow-lg shadow-green-500/10"
                    : "hover:bg-gray-800 text-gray-400 hover:text-gray-300"
                    }`}
                >
                  <Icon className={`w-5 h-5 ${isActive ? "text-green-400" : "text-gray-500 group-hover:text-green-400"}`} />
                  <span className="ml-3 font-medium">{item.name}</span>
                  {isActive && (
                    <div className="ml-auto w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  )}
                </Link>
              );
            })}
          </div>
        </div>

        {/* SYSTEM Section */}
        <div>
          <div className="mb-4">
            <p className="text-xs text-gray-500 uppercase tracking-wider">SYSTEM</p>
          </div>
          <div className="space-y-1">
            {systemItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center p-3 rounded-lg transition-all group ${isActive
                    ? "bg-gray-800 text-green-400 border-l-4 border-green-500 shadow-lg shadow-green-500/10"
                    : "hover:bg-gray-800 text-gray-400 hover:text-gray-300"
                    }`}
                >
                  <Icon className={`w-5 h-5 ${isActive ? "text-green-400" : "text-gray-500 group-hover:text-green-400"}`} />
                  <span className="ml-3 font-medium">{item.name}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      {/* User Profile - Green accent */}
      <div className="p-4 border-t border-gray-800 mt-auto">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-linear-to-br from-green-500 to-emerald-400 rounded-full flex items-center justify-center shadow shadow-green-500/30">
              <User className="w-4 h-4 text-white" />
            </div>
            <div>
              <p className="font-medium text-sm text-white">Alex Rivera</p>
              <p className="text-xs text-green-400">Pro Account</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-xs text-gray-400">24H High</p>
            <p className="text-sm font-medium text-green-400">$65,000</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
