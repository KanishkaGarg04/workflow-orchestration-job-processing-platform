import DashboardLayout from "@/src/layouts/DashboardLayout";
import StatsCard from "@/src/components/dashboard/StatsCard";

import {
  ListTodo,
  Clock3,
  LoaderCircle,
  CheckCircle2,
} from "lucide-react";

export default function DashboardPage() {
  return (
    <DashboardLayout>

      <div className="space-y-8">

        <div>

          <h2 className="text-3xl font-semibold">
            Task Overview
          </h2>

          <p className="mt-2 text-slate-500">
            Monitor your tasks in real time.
          </p>

        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

          <StatsCard
            title="Total Tasks"
            value={24}
            icon={ListTodo}
          />

          <StatsCard
            title="Pending"
            value={8}
            icon={Clock3}
            color="bg-amber-500"
          />

          <StatsCard
            title="Processing"
            value={3}
            icon={LoaderCircle}
            color="bg-blue-600"
          />

          <StatsCard
            title="Completed"
            value={13}
            icon={CheckCircle2}
            color="bg-green-600"
          />

        </div>

      </div>

    </DashboardLayout>
  );
}