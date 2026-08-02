"use client";

import { ButtonHTMLAttributes, ReactNode } from "react";
import clsx from "clsx";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
  children: ReactNode;
}

export default function Button({
  loading,
  children,
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      disabled={loading}
      className={clsx(
        "flex h-12 w-full items-center justify-center rounded-md bg-black text-sm font-medium text-white transition-all duration-200 hover:bg-slate-800 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-70",
        className
      )}
    >
      {loading ? "Signing in..." : children}
    </button>
  );
}