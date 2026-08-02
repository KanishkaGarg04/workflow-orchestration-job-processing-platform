"use client";

import { ReactNode } from "react";
import Sidebar from "@/src/components/dashboard/Sidebar";
import Navbar from "@/src/components/dashboard/Navbar";

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({
  children,
}: DashboardLayoutProps) {
  return (
    <div className="flex min-h-screen bg-[#FAFAFA]">

     
      <Sidebar />

      
      <div className="flex flex-1 flex-col">

        <Navbar />

        <main className="flex-1 p-8">
          {children}
        </main>

      </div>

    </div>
  );
}