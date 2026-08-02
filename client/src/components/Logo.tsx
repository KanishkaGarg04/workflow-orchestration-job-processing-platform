import Link from "next/link";

export default function Logo() {
  return (
    <Link href="/" className="flex items-center gap-3">

      <div className="flex h-10 w-10 items-center justify-center rounded-md bg-black text-sm font-bold text-white">
        TF
      </div>

      <div>

        <h1 className="text-base font-semibold tracking-tight">
          TaskFlow
        </h1>

        <p className="text-xs text-slate-500">
          Task Automation Platform
        </p>

      </div>

    </Link>
  );
}