"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  ArrowRight,
  Mail,
  Lock,
  User,
  CheckCircle2,
} from "lucide-react";
import toast from "react-hot-toast";

import Button from "../ui/Button";
import Input from "../ui/Input";
import { registerUser } from "@/src/services/auth.service";

export default function RegisterForm() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const [name, setName] = useState("");

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    try {
      setLoading(true);

      await registerUser({
        name,
        email,
        password,
      });

      toast.success("Account created successfully!");

      router.push("/login");
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message ||
          "Unable to create account."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#FAFAFA]">

      <div className="mx-auto grid min-h-screen max-w-7xl lg:grid-cols-[1.2fr_0.8fr]">

        {/* LEFT */}

        <section className="hidden border-r border-slate-200 bg-white px-20 py-16 lg:flex lg:flex-col lg:justify-between">

          <div>

            <div className="flex items-center gap-3">

              <div className="flex h-10 w-10 items-center justify-center rounded-md bg-black text-white font-semibold">

                TF

              </div>

              <span className="text-lg font-semibold tracking-tight">

                TaskFlow

              </span>

            </div>

            <h1 className="mt-20 text-[60px] font-semibold leading-[1.02] tracking-tight">

              Start.

              <br />

              Build.

              <br />

              Grow.

            </h1>

            <p className="mt-10 max-w-lg text-lg leading-8 text-slate-500">

              Create your workspace, organize tasks,
              automate processing and collaborate from one
              powerful dashboard.

            </p>

          </div>

          {/* Features */}

          <div className="space-y-5">

            <div className="flex gap-4">

              <CheckCircle2
                size={22}
                className="mt-1 text-green-600"
              />

              <div>

                <h3 className="font-semibold">

                  Unlimited Tasks

                </h3>

                <p className="mt-1 text-slate-500">

                  Create and manage your workflow effortlessly.

                </p>

              </div>

            </div>

            <div className="flex gap-4">

              <CheckCircle2
                size={22}
                className="mt-1 text-green-600"
              />

              <div>

                <h3 className="font-semibold">

                  Background Processing

                </h3>

                <p className="mt-1 text-slate-500">

                  Queue and automate heavy jobs with ease.

                </p>

              </div>

            </div>

            <div className="flex gap-4">

              <CheckCircle2
                size={22}
                className="mt-1 text-green-600"
              />

              <div>

                <h3 className="font-semibold">

                  Live Dashboard

                </h3>

                <p className="mt-1 text-slate-500">

                  Monitor every task in real time.

                </p>

              </div>

            </div>

          </div>

        </section>

        {/* RIGHT */}

        <section className="flex items-center justify-center px-8 py-12 lg:px-20">

          <div className="w-full max-w-md">

            <p className="text-sm font-medium uppercase tracking-[0.25em] text-slate-500">

              Create Account

            </p>

            <h2 className="mt-4 text-4xl font-semibold tracking-tight">

              Join TaskFlow

            </h2>

            <p className="mt-3 text-slate-500 leading-7">

              Create your account and start organizing
              smarter.

            </p>

            <form
              onSubmit={handleSubmit}
              className="mt-12 space-y-7"
            >
                            <Input
                label="Full Name"
                type="text"
                placeholder="Enter your full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                icon={<User size={18} />}
                required
              />

              <Input
                label="Email Address"
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
                placeholder="Create a password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                icon={<Lock size={18} />}
                required
              />

              {/* Password Strength */}

              <div>

                <div className="mb-2 flex items-center justify-between">

                  <span className="text-xs text-slate-500">
                    Password Strength
                  </span>

                  <span className="text-xs font-medium text-green-600">
                    Strong
                  </span>

                </div>

                <div className="h-1.5 overflow-hidden rounded-full bg-slate-200">

                  <div className="h-full w-3/4 rounded-full bg-green-500 transition-all duration-300" />

                </div>

              </div>

              <label className="flex items-start gap-3 text-sm text-slate-600">

                <input
                  type="checkbox"
                  required
                  className="mt-1 h-4 w-4 rounded border-slate-300 accent-black"
                />

                <span>
                  I agree to the{" "}
                  <span className="font-medium text-black cursor-pointer">
                    Terms of Service
                  </span>{" "}
                  and{" "}
                  <span className="font-medium text-black cursor-pointer">
                    Privacy Policy
                  </span>.
                </span>

              </label>

              <Button
                loading={loading}
                type="submit"
              >
                <span className="flex items-center gap-2">

                  Create Account

                  <ArrowRight size={18} />

                </span>

              </Button>

            </form>

            <div className="my-10 flex items-center">

              <div className="h-px flex-1 bg-slate-200" />

              <span className="px-4 text-xs uppercase tracking-wider text-slate-400">

                Already Registered?

              </span>

              <div className="h-px flex-1 bg-slate-200" />

            </div>

            <Link
              href="/login"
              className="group flex items-center justify-between rounded-md border border-slate-200 bg-white px-5 py-4 transition-all duration-200 hover:border-black hover:bg-slate-50"
            >

              <div>

                <p className="font-medium text-slate-900">

                  Sign in

                </p>

                <p className="mt-1 text-sm text-slate-500">

                  Access your existing TaskFlow workspace.

                </p>

              </div>

              <ArrowRight
                size={18}
                className="transition-transform duration-200 group-hover:translate-x-1"
              />

            </Link>

            <p className="mt-10 text-center text-xs leading-6 text-slate-400">

              Built with Next.js, Express, Prisma & PostgreSQL.

            </p>

          </div>

        </section>

      </div>

    </main>
  );
}