"use client";

import { useState } from "react";
import { Bell, Search, Plus } from "lucide-react";

import Button from "../ui/Button";
import CreateTaskModal from "./CreateTaskModal";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <>
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
              type="text"
              placeholder="Search tasks..."
              className="h-11 w-72 rounded-md border border-slate-300 bg-white pl-10 pr-4 text-sm outline-none transition-all focus:border-black"
            />

          </div>

         

          <button className="flex h-11 w-11 items-center justify-center rounded-md border border-slate-300 transition hover:bg-slate-100">

            <Bell size={18} />

          </button>

          

          <Button
            className="w-auto px-5"
            onClick={() => setOpen(true)}
          >
            <span className="flex items-center gap-2">

              <Plus size={18} />

              New Task

            </span>

          </Button>
                    

          <div className="flex items-center gap-3 border-l border-slate-200 pl-4">

            <div className="hidden text-right md:block">

              <p className="text-sm font-semibold text-slate-800">
                Kanishka
              </p>

              <p className="text-xs text-slate-500">
                Software Engineer
              </p>

            </div>

            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-black text-sm font-semibold text-white shadow-sm">

              K

            </div>

          </div>

        </div>

      </header>

      <CreateTaskModal
        open={open}
        onOpenChange={setOpen}
      />

    </>
  );
}