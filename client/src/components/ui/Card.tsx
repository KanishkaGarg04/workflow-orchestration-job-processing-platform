import { CheckCircle2 } from "lucide-react";

export default function Logo() {
  return (
    <div className="flex items-center gap-3">
      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600 shadow-lg">
        <CheckCircle2 size={24} />
      </div>

      <div>
        <h1 className="text-xl font-bold">TaskFlow</h1>
        <p className="text-xs text-gray-400">
          Task Automation
        </p>
      </div>
    </div>
  );
}