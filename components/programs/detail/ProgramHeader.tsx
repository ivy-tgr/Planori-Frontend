import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "lucide-react";
import { formatDate } from "@/utils/dateFormatters";
import type { QuarterPlan } from "@/types/program";

interface ProgramHeaderProps {
  quarterPlan: QuarterPlan;
}

export function ProgramHeader({ quarterPlan }: ProgramHeaderProps) {
  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle className="text-2xl">{quarterPlan.name}</CardTitle>
        {quarterPlan.description && (
          <p className="text-gray-600 mt-2">{quarterPlan.description}</p>
        )}
        <div className="flex items-center gap-2 text-sm text-gray-500 mt-4">
          <Calendar className="h-4 w-4" />
          <span>
            {formatDate(quarterPlan.startDate)} - {formatDate(quarterPlan.endDate)}
          </span>
        </div>
      </CardHeader>
    </Card>
  );
}