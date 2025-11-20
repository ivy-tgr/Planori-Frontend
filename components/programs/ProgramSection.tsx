import type { QuarterPlan, ProgramStatus } from "@/types/program";
import { ProgramCard } from "./ProgramCard";

interface ProgramSectionProps {
  title: string;
  programs: QuarterPlan[];
  status: ProgramStatus;
}

export function ProgramSection({ title, programs, status }: ProgramSectionProps) {
  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-900 mb-4">{title}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {programs.map((program) => (
          <ProgramCard key={program.id} program={program} status={status} />
        ))}
      </div>
    </div>
  );
}