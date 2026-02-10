"use client"

import Sidebar from "./Sidebar";
import { ReactNode } from "react";

export const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="min-h-screen flex">
      {/* Fixed Sidebar */}
      <Sidebar />

      {/* Main Content Area - with left margin for sidebar */}
      <div className="flex-1 flex flex-col ml-64">
        {/* Simple Top Bar */}
        <div className="sticky top-0 z-40 border-b border-gray-800 bg-gray-900 p-4">
          {/* Empty for now - you can add content here later */}
        </div>
        
        <main className="flex-1 overflow-y-auto bg-gray-950 p-6">
          {children}
        </main>
      </div>
    </div>
  );
};
