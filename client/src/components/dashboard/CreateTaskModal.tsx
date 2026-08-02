"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import {
  useEffect,
  useState,
} from "react";
import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import toast from "react-hot-toast";

import Input from "../ui/Input";
import Button from "../ui/Button";

import {
  createTask,
  updateTask,
} from "@/src/services/task.service";

interface Task {
  id: string;
  title: string;
  description?: string;
  scheduledAt?: string;
  status: string;
}

interface Props {
  open: boolean;
  onOpenChange: (value: boolean) => void;

  mode?: "create" | "edit";

  task?: Task | null;
}

export default function CreateTaskModal({
  open,
  onOpenChange,
  mode = "create",
  task,
}: Props) {
  const queryClient = useQueryClient();

  const [title, setTitle] = useState("");

  const [description, setDescription] =
    useState("");

  const [scheduledAt, setScheduledAt] =
    useState("");

  useEffect(() => {
    if (mode === "edit" && task) {
      setTitle(task.title);

      setDescription(task.description ?? "");

      setScheduledAt(
        task.scheduledAt
          ? new Date(task.scheduledAt)
              .toISOString()
              .slice(0, 16)
          : ""
      );
    }

    if (mode === "create") {
      setTitle("");
      setDescription("");
      setScheduledAt("");
    }
  }, [task, mode, open]);

  const createMutation = useMutation({
    mutationFn: createTask,

    onSuccess: () => {
      toast.success("Task created successfully!");

      queryClient.invalidateQueries({
        queryKey: ["tasks"],
      });

      queryClient.invalidateQueries({
        queryKey: ["stats"],
      });

      onOpenChange(false);
    },

    onError: () => {
      toast.error("Failed to create task.");
    },
  });

  const editMutation = useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string;
      data: any;
    }) => updateTask(id, data),

    onSuccess: () => {
      toast.success("Task updated successfully!");

      queryClient.invalidateQueries({
        queryKey: ["tasks"],
      });

      queryClient.invalidateQueries({
        queryKey: ["stats"],
      });

      onOpenChange(false);
    },

    onError: () => {
      toast.error("Failed to update task.");
    },
  });

  function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    const payload = {
      title: title.trim(),

      description:
        description.trim() || undefined,

      scheduledAt: scheduledAt
        ? new Date(
            scheduledAt
          ).toISOString()
        : undefined,
    };

    if (mode === "create") {
      createMutation.mutate(payload);
    } else if (task) {
      editMutation.mutate({
        id: task.id,
        data: payload,
      });
    }
  }
    return (
    <Dialog.Root
      open={open}
      onOpenChange={onOpenChange}
    >
      <Dialog.Portal>

        <Dialog.Overlay className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm" />

        <Dialog.Content className="fixed left-1/2 top-1/2 z-50 w-[92%] max-w-lg -translate-x-1/2 -translate-y-1/2 rounded-md border border-slate-200 bg-white p-8 shadow-2xl">

          <div className="mb-8 flex items-center justify-between">

            <div>

              <Dialog.Title className="text-2xl font-semibold text-slate-900">

                {mode === "create"
                  ? "Create Task"
                  : "Edit Task"}

              </Dialog.Title>

              <Dialog.Description className="mt-2 text-slate-500">

                {mode === "create"
                  ? "Fill in the information below."
                  : "Update the task details."}

              </Dialog.Description>

            </div>

            <Dialog.Close asChild>

              <button className="rounded-md p-2 transition hover:bg-slate-100">

                <X size={20} />

              </button>

            </Dialog.Close>

          </div>

          <form
            onSubmit={handleSubmit}
            className="space-y-6"
          >

            <Input
              label="Task Title"
              placeholder="Enter task title"
              value={title}
              onChange={(e) =>
                setTitle(e.target.value)
              }
              required
            />

            <div className="space-y-2">

              <label className="text-sm font-medium text-slate-700">

                Description

              </label>

              <textarea
                rows={4}
                value={description}
                placeholder="Optional description..."
                onChange={(e) =>
                  setDescription(
                    e.target.value
                  )
                }
                className="w-full resize-none rounded-md border border-slate-300 bg-white px-4 py-3 text-sm outline-none transition-all placeholder:text-slate-400 focus:border-black focus:ring-2 focus:ring-black/5"
              />

            </div>

            <Input
              label="Schedule Date"
              type="datetime-local"
              value={scheduledAt}
              onChange={(e) =>
                setScheduledAt(
                  e.target.value
                )
              }
            />

            <div className="flex justify-end gap-3 pt-2">

              <Dialog.Close asChild>

                <button
                  type="button"
                  className="rounded-md border border-slate-300 px-5 py-3 text-sm font-medium transition hover:bg-slate-100"
                >
                  Cancel
                </button>

              </Dialog.Close>

              <Button
                type="submit"
                loading={
                  createMutation.isPending ||
                  editMutation.isPending
                }
                className="w-auto px-8"
              >

                {mode === "create"
                  ? "Create Task"
                  : "Save Changes"}

              </Button>

            </div>

          </form>

        </Dialog.Content>

      </Dialog.Portal>

    </Dialog.Root>
  );
}