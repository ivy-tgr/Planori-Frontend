import { LucideIcon } from "lucide-react";

interface DetailRowProps {
  icon: LucideIcon;
  label: string;
  value: string;
  iconClassName?: string;
}

export function DetailRow({
  icon: Icon,
  label,
  value,
  iconClassName = "text-gray-400",
}: DetailRowProps) {
  return (
    <div className="flex items-start gap-3">
      <Icon className={`h-4 w-4 mt-0.5 ${iconClassName}`} />
      <div>
        <p className="text-sm font-medium text-gray-700">{label}</p>
        <p className="text-sm text-gray-600">{value}</p>
      </div>
    </div>
  );
}