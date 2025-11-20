import type { QuarterPlan, CategorizedPrograms, ProgramStatus } from "@/types/program";

export function categorizePrograms(programs: QuarterPlan[]): CategorizedPrograms {
  const now = new Date();
  const categorized: CategorizedPrograms = {
    active: [],
    upcoming: [],
    past: [],
  };

  programs.forEach((program) => {
    const start = new Date(program.startDate);
    const end = new Date(program.endDate);

    if (now >= start && now <= end) {
      categorized.active.push(program);
    } else if (now < start) {
      categorized.upcoming.push(program);
    } else {
      categorized.past.push(program);
    }
  });

  // Sort each category
  categorized.active.sort(
    (a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
  );
  categorized.upcoming.sort(
    (a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
  );
  categorized.past.sort(
    (a, b) => new Date(b.endDate).getTime() - new Date(a.endDate).getTime()
  );

  return categorized;
}

export function getProgramStatus(program: QuarterPlan): ProgramStatus {
  const now = new Date();
  const start = new Date(program.startDate);
  const end = new Date(program.endDate);

  if (now >= start && now <= end) return "active";
  if (now < start) return "upcoming";
  return "past";
}