import TaskRow from "./TaskRow";
import EmptyState from "./EmptyState";

interface Task {
  id: string;
  title: string;
  status: string;
  createdAt: string;
}

interface Props {
  tasks: Task[];
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
}

export default function TaskTable({
  tasks,
  onEdit,
  onDelete,
}: Props) {
  return (
    <div className="rounded-md border border-slate-200 bg-white">

      <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5">

        <div>

          <h2 className="text-lg font-semibold">
            Recent Tasks
          </h2>

          <p className="text-sm text-slate-500">
            Latest task activity.
          </p>

        </div>

      </div>

      {tasks.length === 0 ? (
        <EmptyState />
      ) : (
        <table className="w-full">

          <thead>

            <tr className="text-left text-sm text-slate-500">

              <th className="px-6 py-4 font-medium">
                Title
              </th>

              <th className="px-6 py-4 font-medium">
                Status
              </th>

              <th className="px-6 py-4 font-medium">
                Created
              </th>

              <th className="px-6 py-4 font-medium">
                Actions
              </th>

            </tr>

          </thead>

          <tbody>

            {tasks.map((task) => (
              <TaskRow
                key={task.id}
                task={task}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            ))}

          </tbody>

        </table>
      )}

    </div>
  );
}