"use client";

import { Bell, Search } from "lucide-react";

export default function Navbar() {
  return (
    <header className="flex h-20 items-center justify-between border-b border-slate-200 bg-white px-8">

      <div>

        <h1 className="text-2xl font-semibold tracking-tight">
          Dashboard
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          Welcome back. Here's an overview of your tasks.
        </p>

      </div>

      <div className="flex items-center gap-4">

        <div className="relative">

          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            placeholder="Search tasks..."
            className="h-11 w-72 rounded-md border border-slate-300 bg-white pl-10 pr-4 text-sm outline-none focus:border-black"
          />

        </div>

        <button className="flex h-11 w-11 items-center justify-center rounded-md border border-slate-300 hover:bg-slate-100">

          <Bell size={18} />

        </button>

        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-black font-semibold text-white">

          K

        </div>

      </div>

    </header>
  );
}