import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "lucide-react";
import type { QuarterPlan, ProgramStatus } from "@/types/program";
import { StatusBadge } from "./StatusBadge";
import { formatDateRange } from "@/utils/dateFormatters";

interface ProgramCardProps {
  program: QuarterPlan;
  status: ProgramStatus;
}

export function ProgramCard({ program, status }: ProgramCardProps) {
  const router = useRouter();

  const cardStyles: Record<ProgramStatus, string> = {
    active: "border-2 border-green-200",
    upcoming: "",
    past: "opacity-75",
  };

  return (
    <Card
      className={`cursor-pointer hover:shadow-lg transition-shadow ${cardStyles[status]}`}
      onClick={() => router.push(`/programs/${program.id}`)}
    >
      <CardHeader>
        <div className="flex items-start justify-between">
          <CardTitle className="text-lg">{program.name}</CardTitle>
          <StatusBadge status={status} />
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Calendar className="h-4 w-4" />
            <span>{formatDateRange(program.startDate, program.endDate)}</span>
          </div>
          {program.description && (
            <p className="text-sm text-gray-600 line-clamp-2">
              {program.description}
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}