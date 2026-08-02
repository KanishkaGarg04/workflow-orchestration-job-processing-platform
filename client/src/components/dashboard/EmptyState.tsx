import { ListTodo } from "lucide-react";

export default function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-20">

      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-slate-100">

        <ListTodo size={30} />

      </div>

      <h3 className="mt-6 text-xl font-semibold">

        No Tasks Found

      </h3>

      <p className="mt-2 text-slate-500">

        Create your first task to get started.

      </p>

    </div>
  );
}