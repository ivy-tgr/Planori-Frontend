import type { QuarterPlan } from "@/types/program";
import { ProgramSection } from "./ProgramSection";
import { categorizePrograms } from "@/utils/programHelpers";

interface ProgramsGridProps {
  programs: QuarterPlan[];
}

export function ProgramsGrid({ programs }: ProgramsGridProps) {
  const categorized = categorizePrograms(programs);

  return (
    <div className="space-y-8">
      {categorized.active.length > 0 && (
        <ProgramSection
          title="Active Programs"
          programs={categorized.active}
          status="active"
        />
      )}

      {categorized.upcoming.length > 0 && (
        <ProgramSection
          title="Upcoming Programs"
          programs={categorized.upcoming}
          status="upcoming"
        />
      )}

      {categorized.past.length > 0 && (
        <ProgramSection
          title="Completed Programs"
          programs={categorized.past}
          status="past"
        />
      )}
    </div>
  );
}