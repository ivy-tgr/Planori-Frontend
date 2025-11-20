import type { ProgramStatus } from "@/types/program";

interface StatusBadgeProps {
  status: ProgramStatus;
}

const STATUS_CONFIG: Record<ProgramStatus, { label: string; className: string }> = {
  active: {
    label: "Active",
    className: "bg-green-100 text-green-700 border-green-200",
  },
  upcoming: {
    label: "Planned",
    className: "bg-blue-100 text-blue-700 border-blue-200",
  },
  past: {
    label: "Completed",
    className: "bg-gray-100 text-gray-600 border-gray-200",
  },
};

export function StatusBadge({ status }: StatusBadgeProps) {
  const config = STATUS_CONFIG[status];

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${config.className}`}
    >
      {config.label}
    </span>
  );
}