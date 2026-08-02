import { LucideIcon } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: number | string;
  icon: LucideIcon;
  color?: string;
}

export default function StatsCard({
  title,
  value,
  icon: Icon,
  color = "bg-black",
}: StatsCardProps) {
  return (
    <div className="rounded-md border border-slate-200 bg-white p-6 transition-all duration-200 hover:-translate-y-1 hover:shadow-lg">

      <div className="flex items-start justify-between">

        <div>

          <p className="text-sm text-slate-500">
            {title}
          </p>

          <h2 className="mt-3 text-3xl font-semibold">
            {value}
          </h2>

        </div>

        <div
          className={`flex h-12 w-12 items-center justify-center rounded-md text-white ${color}`}
        >
          <Icon size={22} />
        </div>

      </div>

    </div>
  );
}