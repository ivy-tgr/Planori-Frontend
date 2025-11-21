export interface ActivityData {
  name: string;
  date: string;
  location: string;
  startTime: string;
  endTime: string;
  redThread: string;
  safetyNotes: string;
}

export interface ProgramSection {
  id: string;
  time: string;
  program: string;
  responsible: string;
}

export interface Material {
  id: string;
  checked: boolean;
  item: string;
  unit: string;
  assignedTo: string;
}

export interface UserOption {
  id: string;
  name: string;
}

export interface ActivityEditorState {
  loading: boolean;
  activityData: ActivityData;
  programSections: ProgramSection[];
  materials: Material[];
  activeUsers: number;
  userOptions: UserOption[];
  handleFieldChange: (field: keyof ActivityData, value: string) => void;
  updateProgramSection: (
    id: string,
    field: keyof ProgramSection,
    value: string
  ) => void;
  updateMaterial: (
    id: string,
    field: keyof Material,
    value: string | boolean
  ) => void;
  addProgramSection: () => void;
  removeProgramSection: (id: string) => void;
  addMaterial: () => void;
  removeMaterial: (id: string) => void;
  handleSave: () => Promise<void>;
}

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