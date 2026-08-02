"use client";

import Link from "next/link";
import { useState } from "react";
import { User, Mail, Lock, CheckCircle2 } from "lucide-react";
import Input from "./Input";
import Button from "./Button";

export default function RegisterPage() {
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    setLoading(true);

    // We'll connect backend API next
    setTimeout(() => {
      setLoading(false);
    }, 1200);
  }

  return (
    <div className="min-h-screen bg-[#f8fafc] flex items-center justify-center px-6">

      <div className="w-full max-w-md rounded-lg bg-white shadow-xl p-10">

        <div className="flex justify-center mb-5">
          <div className="h-14 w-14 rounded-2xl bg-black flex items-center justify-center text-white">
            <CheckCircle2 size={28} />
          </div>
        </div>

        <h1 className="text-3xl font-bold text-center">
          Create Account
        </h1>

        <p className="text-center text-gray-500 mt-2 mb-8">
          Join TaskFlow and start managing your work smarter.
        </p>

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >

          <Input
            icon={<User size={18} />}
            placeholder="Full Name"
            type="text"
            required
          />

          <Input
            icon={<Mail size={18} />}
            placeholder="Email"
            type="email"
            required
          />

          <Input
            icon={<Lock size={18} />}
            placeholder="Password"
            type="password"
            required
          />

          <Button
            type="submit"
            loading={loading}
          >
            Create Account
          </Button>

        </form>

        <p className="text-center text-gray-500 mt-8">
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-semibold text-black hover:underline"
          >
            Login
          </Link>
        </p>

      </div>

    </div>
  );
}