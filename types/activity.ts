export interface Activity {
  id: string;
  name: string;
  date: string;
  location: string;
  redThread?: string;
  safetyNotes?: string;
  qpId: string;
  createdBy?: string;
  createdAt?: string;
}

export type ActivityStatus = "past" | "next" | "upcoming";