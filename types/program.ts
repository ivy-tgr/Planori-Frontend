export interface QuarterPlan {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  description?: string;
  createdBy?: string;
  createdAt?: string;
}

export type ProgramStatus = "active" | "upcoming" | "past";

export interface CategorizedPrograms {
  active: QuarterPlan[];
  upcoming: QuarterPlan[];
  past: QuarterPlan[];
}

export interface Activity {
  title: string;
  date: string;
  location: string;
  leader: string;
  redThread: string;
}

export interface Event {
  title: string;
  date: string;
  location: string;
}

export interface Quintal {
  label: string;
  startDate: string;
  endDate: string;
}

export interface ProgramFormData {
  name: string;
  description: string;
  quintal: Quintal;
  createdBy: string;
}
