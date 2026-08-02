import { ClipboardList } from "lucide-react";

export default function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-gray-700 py-20 text-center">
      <ClipboardList
        size={64}
        className="text-gray-500"
      />

      <h2 className="mt-4 text-xl font-semibold text-white">
        No Tasks Yet
      </h2>

      <p className="mt-2 text-gray-400">
        Create your first task to get started.
      </p>
    </div>
  );
}