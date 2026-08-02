"use client";

import { InputHTMLAttributes, ReactNode } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  icon?: ReactNode;
}

export default function Input({
  label,
  icon,
  className,
  ...props
}: InputProps) {
  return (
    <div className="space-y-2">

      <label className="text-sm font-medium text-slate-700">
        {label}
      </label>

      <div className="relative">

        {icon && (
          <div className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
            {icon}
          </div>
        )}

        <input
          {...props}
          className={`h-12 w-full rounded-md border border-slate-300 bg-white ${
            icon ? "pl-11" : "pl-4"
          } pr-4 text-sm text-slate-900 outline-none transition-all duration-200 placeholder:text-slate-400 focus:border-black focus:ring-2 focus:ring-black/5 ${className ?? ""}`}
        />

      </div>

    </div>
  );
}