import { Pencil, Trash2 } from "lucide-react";

interface Task {
  id: string;
  title: string;
  status: string;
  createdAt: string;
}

interface TaskRowProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
}

const statusStyles: Record<string, string> = {
  PENDING: "bg-yellow-100 text-yellow-700",
  PROCESSING: "bg-blue-100 text-blue-700",
  COMPLETED: "bg-green-100 text-green-700",
  FAILED: "bg-red-100 text-red-700",
};

export default function TaskRow({
  task,
  onEdit,
  onDelete,
}: TaskRowProps) {
  return (
    <tr className="border-b border-slate-100 transition-colors hover:bg-slate-50">

      <td className="px-6 py-5 font-medium text-slate-800">
        {task.title}
      </td>

      <td className="px-6 py-5">

        <span
          className={`rounded-md px-3 py-1 text-xs font-semibold ${
            statusStyles[task.status]
          }`}
        >
          {task.status}
        </span>

      </td>

      <td className="px-6 py-5 text-slate-500">
        {new Date(task.createdAt).toLocaleDateString()}
      </td>

      <td className="px-6 py-5">

        <div className="flex items-center gap-2">

          <button
            onClick={() => onEdit(task)}
            className="rounded-md border border-slate-200 p-2 transition hover:border-black hover:bg-slate-100"
          >
            <Pencil size={16} />
          </button>

          <button
            onClick={() => onDelete(task.id)}
            className="rounded-md border border-red-200 p-2 text-red-600 transition hover:bg-red-50"
          >
            <Trash2 size={16} />
          </button>

        </div>

      </td>

    </tr>
  );
}