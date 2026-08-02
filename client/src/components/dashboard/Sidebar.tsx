"use client";

import Link from "next/link";
import {
  LayoutDashboard,
  ListTodo,
  BarChart3,
  Settings,
  LogOut,
} from "lucide-react";
import Logo from "../Logo";

const menu = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    href: "/dashboard",
  },
  {
    title: "Tasks",
    icon: ListTodo,
    href: "/dashboard/tasks",
  },
  {
    title: "Analytics",
    icon: BarChart3,
    href: "/dashboard/analytics",
  },
  {
    title: "Settings",
    icon: Settings,
    href: "/dashboard/settings",
  },
];

export default function Sidebar() {
  return (
    <aside className="hidden w-72 border-r border-slate-200 bg-white lg:flex lg:flex-col">

      <div className="border-b border-slate-200 p-6">
        <Logo />
      </div>

      <nav className="flex-1 px-4 py-6">

        <div className="space-y-2">

          {menu.map((item) => {
            const Icon = item.icon;

            return (
              <Link
                key={item.title}
                href={item.href}
                className="flex items-center gap-3 rounded-md px-4 py-3 text-slate-600 transition-all hover:bg-slate-100 hover:text-black"
              >
                <Icon size={20} />

                <span className="font-medium">
                  {item.title}
                </span>
              </Link>
            );
          })}

        </div>

      </nav>

      <div className="border-t border-slate-200 p-4">

        <button className="flex w-full items-center gap-3 rounded-md px-4 py-3 text-slate-600 transition hover:bg-red-50 hover:text-red-600">

          <LogOut size={20} />

          Logout

        </button>

      </div>

    </aside>
  );
}