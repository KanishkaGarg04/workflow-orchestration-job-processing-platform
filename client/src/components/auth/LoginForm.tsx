"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ArrowRight, Lock, Mail } from "lucide-react";
import toast from "react-hot-toast";

import Button from "../ui/Button";
import Input from "../ui/Input";
import { loginUser } from "@/src/services/auth.service";

export default function LoginForm() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    try {
      setLoading(true);

      const response = await loginUser({
        email,
        password,
      });

     localStorage.setItem(
  "token",
  response.data.accessToken
);

// Optional: save user info too
localStorage.setItem(
  "user",
  JSON.stringify(response.data.user)
);

      toast.success("Welcome back!");

      router.push("/dashboard");
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message ||
          "Invalid email or password."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#FAFAFA]">

      <div className="mx-auto grid min-h-screen max-w-7xl lg:grid-cols-[1.2fr_0.8fr]">

        {/* ================= LEFT ================= */}

        <section className="hidden border-r border-slate-200 bg-white px-20 py-16 lg:flex lg:flex-col lg:justify-between">

          <div>

            {/* Logo */}

            <div className="flex items-center gap-3">

              <div className="flex h-10 w-10 items-center justify-center rounded-md bg-black text-white text-sm font-semibold">

                TF

              </div>

              <span className="text-lg font-semibold tracking-tight">

                TaskFlow

              </span>

            </div>

            {/* Heading */}

            <h1 className="mt-20 text-[64px] font-semibold leading-[1.02] tracking-tight text-slate-900">

              Build.

              <br />

              Automate.

              <br />

              Deliver.

            </h1>

            <p className="mt-10 max-w-lg text-lg leading-8 text-slate-500">

              Manage tasks, automate background processing,
              monitor execution, and collaborate from one
              beautifully simple dashboard.

            </p>

          </div>

          {/* Bottom */}

          <div className="space-y-6">

            <div className="rounded-md border border-slate-200 bg-slate-50">

              <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">

                <h3 className="font-medium">

                  Live Queue

                </h3>

                <div className="flex items-center gap-2">

                  <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse"/>

                  <span className="text-sm text-slate-500">

                    Online

                  </span>

                </div>

              </div>

              <div className="divide-y divide-slate-100">

                <div className="flex items-center justify-between px-5 py-4">

                  <span className="text-sm">

                    Generate Invoice

                  </span>

                  <span className="text-xs font-medium text-green-600">

                    Completed

                  </span>

                </div>

                <div className="flex items-center justify-between px-5 py-4">

                  <span className="text-sm">

                    Backup Database

                  </span>

                  <span className="text-xs font-medium text-amber-600">

                    Processing

                  </span>

                </div>

                <div className="flex items-center justify-between px-5 py-4">

                  <span className="text-sm">

                    Send Newsletter

                  </span>

                  <span className="text-xs font-medium text-slate-500">

                    Pending

                  </span>

                </div>

              </div>

            </div>

          </div>

        </section>

        {/* ================= RIGHT ================= */}

        <section className="flex items-center justify-center px-8 py-12 lg:px-20">

          <div className="w-full max-w-md">

            <p className="text-sm font-medium uppercase tracking-[0.25em] text-slate-500">

              Welcome Back

            </p>

            <h2 className="mt-4 text-4xl font-semibold tracking-tight text-slate-900">

              Sign in to your account

            </h2>

            <p className="mt-3 text-slate-500 leading-7">

              Continue where you left off and manage your
              workflow with ease.

            </p>

            <form
              onSubmit={handleSubmit}
              className="mt-12 space-y-7"
            >
                            <Input
                label="Email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                icon={<Mail size={18} />}
                required
              />

              <Input
                label="Password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                icon={<Lock size={18} />}
                required
              />

              <div className="flex items-center justify-between">

                <label className="flex items-center gap-2 text-sm text-slate-600">

                  <input
                    type="checkbox"
                    className="h-4 w-4 rounded border-slate-300 accent-black"
                  />

                  Remember me

                </label>

                <button
                  type="button"
                  className="text-sm font-medium text-slate-600 transition-colors hover:text-black"
                >
                  Forgot password?
                </button>

              </div>

              <Button
                type="submit"
                loading={loading}
              >
                <span className="flex items-center gap-2">

                  Continue

                  <ArrowRight size={18} />

                </span>

              </Button>

            </form>

            <div className="my-10 flex items-center">

              <div className="h-px flex-1 bg-slate-200" />

              <span className="px-4 text-xs uppercase tracking-wider text-slate-400">

                New to TaskFlow?

              </span>

              <div className="h-px flex-1 bg-slate-200" />

            </div>

            <Link
              href="/register"
              className="group flex items-center justify-between rounded-md border border-slate-200 bg-white px-5 py-4 transition-all duration-200 hover:border-black hover:bg-slate-50"
            >

              <div>

                <p className="font-medium text-slate-900">

                  Create an account

                </p>

                <p className="mt-1 text-sm text-slate-500">

                  Start managing your workflow today.

                </p>

              </div>

              <ArrowRight
                size={18}
                className="transition-transform duration-200 group-hover:translate-x-1"
              />

            </Link>

            <p className="mt-10 text-center text-xs leading-6 text-slate-400">

              By continuing you agree to our Terms of Service
              and Privacy Policy.

            </p>

          </div>

        </section>

      </div>

    </main>
  );
}