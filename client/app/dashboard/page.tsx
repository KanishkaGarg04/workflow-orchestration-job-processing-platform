"use client";

import { useState } from "react";
import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import toast from "react-hot-toast";

import DashboardLayout from "@/src/layouts/DashboardLayout";
import StatsCard from "@/src/components/dashboard/StatsCard";
import TaskTable from "@/src/components/dashboard/TaskTable";
import CreateTaskModal from "@/src/components/dashboard/CreateTaskModal";
import { useEffect } from "react";
import { socket } from "@/src/lib/socket";
import {
  ListTodo,
  Clock3,
  LoaderCircle,
  CheckCircle2,
  Search,
} from "lucide-react";

import {
  getTasks,
  getTaskStats,
  deleteTask,
} from "@/src/services/task.service";

interface Task {
  id: string;
  title: string;
  description?: string;
  scheduledAt?: string;
  status: string;
  createdAt: string;
}

export default function DashboardPage() {
  const queryClient = useQueryClient();
  useEffect(() => {
  socket.on("taskUpdated", () => {
    queryClient.invalidateQueries({
      queryKey: ["tasks"],
    });

    queryClient.invalidateQueries({
      queryKey: ["stats"],
    });
  });

  return () => {
    socket.off("taskUpdated");
  };
}, [queryClient]);

  const [selectedTask, setSelectedTask] =
    useState<Task | null>(null);

  const [editOpen, setEditOpen] =
    useState(false);

  const [search, setSearch] =
    useState("");

  const [status, setStatus] =
    useState("");

  const { data: taskData } = useQuery({
    queryKey: ["tasks", search, status],

    queryFn: () =>
      getTasks(search, status),
  });

  const { data: statsData } = useQuery({
    queryKey: ["stats"],
    queryFn: getTaskStats,
  });

  const deleteMutation = useMutation({
    mutationFn: deleteTask,

    onSuccess: () => {
      toast.success("Task deleted");

      queryClient.invalidateQueries({
        queryKey: ["tasks"],
      });

      queryClient.invalidateQueries({
        queryKey: ["stats"],
      });
    },

    onError: () => {
      toast.error("Failed to delete task");
    },
  });

  const tasks = taskData?.data ?? [];

  const stats = statsData?.data ?? {
    total: 0,
    pending: 0,
    processing: 0,
    completed: 0,
    failed: 0,
  };

  function handleEdit(task: Task) {
    setSelectedTask(task);
    setEditOpen(true);
  }

  function handleDelete(id: string) {
    if (!confirm("Delete this task?")) return;

    deleteMutation.mutate(id);
  }
    return (
    <DashboardLayout>
      <div className="space-y-8">

        {/* Header */}

        <div>

          <h2 className="text-3xl font-semibold tracking-tight">
            Task Overview
          </h2>

          <p className="mt-2 text-slate-500">
            Monitor, manage and automate your background tasks.
          </p>

        </div>

        {/* Stats */}

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

          <StatsCard
            title="Total Tasks"
            value={stats.total}
            icon={ListTodo}
          />

          <StatsCard
            title="Pending"
            value={stats.pending}
            icon={Clock3}
            color="bg-amber-500"
          />

          <StatsCard
            title="Processing"
            value={stats.processing}
            icon={LoaderCircle}
            color="bg-blue-600"
          />

          <StatsCard
            title="Completed"
            value={stats.completed}
            icon={CheckCircle2}
            color="bg-green-600"
          />

        </div>

        {/* Search & Filter */}

        <div className="flex flex-col gap-4 rounded-md border border-slate-200 bg-white p-5 lg:flex-row lg:items-center lg:justify-between">

          <div className="relative w-full max-w-md">

            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              type="text"
              placeholder="Search tasks..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              className="h-11 w-full rounded-md border border-slate-300 bg-white pl-11 pr-4 text-sm outline-none transition-all duration-200 placeholder:text-slate-400 focus:border-black"
            />

          </div>

          <div className="flex items-center gap-3">

            <select
              value={status}
              onChange={(e) =>
                setStatus(e.target.value)
              }
              className="h-11 rounded-md border border-slate-300 bg-white px-4 text-sm outline-none transition-all duration-200 focus:border-black"
            >
              <option value="">
                All Status
              </option>

              <option value="PENDING">
                Pending
              </option>

              <option value="PROCESSING">
                Processing
              </option>

              <option value="COMPLETED">
                Completed
              </option>

              <option value="FAILED">
                Failed
              </option>

            </select>

            {(search || status) && (

              <button
                onClick={() => {
                  setSearch("");
                  setStatus("");
                }}
                className="rounded-md border border-slate-300 px-4 py-2.5 text-sm font-medium transition hover:bg-slate-100"
              >
                Clear
              </button>

            )}

          </div>

        </div>
                {/* Task Table */}

        <TaskTable
          tasks={tasks}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />

        {/* Edit Task Modal */}

        <CreateTaskModal
          open={editOpen}
          onOpenChange={setEditOpen}
          mode="edit"
          task={selectedTask}
        />

      </div>

    </DashboardLayout>
  );
}