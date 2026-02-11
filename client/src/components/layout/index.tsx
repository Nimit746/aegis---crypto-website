"use client"

import Sidebar from "./Sidebar";
import { TopBar } from "./TopBar";
import { ReactNode, useState, useEffect } from "react";

export const Layout = ({ children }: { children: ReactNode }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  if (!hasMounted) return null;

  return (
    <div className="min-h-screen flex bg-gray-950">
      {/* Sidebar - Responsive Logic */}
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      {/* Backdrop for mobile */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-40 lg:hidden backdrop-blur-sm transition-opacity"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Main Content Area - with left margin for sidebar on desktop */}
      <div className="flex-1 flex flex-col min-w-0 lg:ml-64 transition-all">
        {/* Simple Top Bar */}
        <div className="sticky top-0 z-30">
          <TopBar onMenuClick={toggleSidebar} />
        </div>

        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
};
