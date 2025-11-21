import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSocket } from "@/hooks/useSocket";
import { useUsers } from "@/hooks/useUsers";
import { apiClient } from "@/lib/apiClient";
import type {
  ActivityData,
  ProgramSection,
  Material,
  ActivityEditorState,
} from "@/types/activity";

const INITIAL_ACTIVITY_DATA: ActivityData = {
  name: "",
  date: "",
  location: "",
  startTime: "",
  endTime: "",
  redThread: "",
  safetyNotes: "",
};

const INITIAL_PROGRAM_SECTION: ProgramSection = {
  id: "1",
  time: "09:30",
  program: "",
  responsible: "",
};

const INITIAL_MATERIAL: Material = {
  id: "1",
  checked: false,
  item: "",
  unit: "Stu",
  assignedTo: "Stu",
};

export function useActivityEditor(
  activityId: string,
  isNew: boolean
): ActivityEditorState {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [activityData, setActivityData] = useState<ActivityData>(
    INITIAL_ACTIVITY_DATA
  );
  const [programSections, setProgramSections] = useState<ProgramSection[]>([
    INITIAL_PROGRAM_SECTION,
  ]);
  const [materials, setMaterials] = useState<Material[]>([INITIAL_MATERIAL]);

  const { userOptions } = useUsers();
  const { socket, activeUsers } = useSocket(activityId, isNew, {
    onFieldChange: handleSocketFieldChange,
  });

  // Load activity data
  useEffect(() => {
    if (!isNew && activityId) {
      fetchActivity();
    } else {
      setLoading(false);
    }
  }, [activityId, isNew]);

  async function fetchActivity() {
    try {
      const data = await apiClient.get(`/activities/${activityId}`) as ActivityData & {
        programSections?: ProgramSection[];
        materials?: Material[];
      };

      setActivityData({
        name: data.name || "",
        date: data.date || "",
        location: data.location || "",
        startTime: data.startTime || "",
        endTime: data.endTime || "",
        redThread: data.redThread || "",
        safetyNotes: data.safetyNotes || "",
      });

      if ((data.programSections ?? []).length > 0) {
        setProgramSections(data.programSections as ProgramSection[]);
      }

      if ((data.materials ?? []).length > 0) {
        setMaterials(data.materials ?? []);
      }
    } catch (error) {
      console.error("Error loading activity:", error);
    } finally {
      setLoading(false);
    }
  }

  type SocketFieldChangeData = {
    field: string;
    value: string | boolean;
    section?: {
      type: "programSection" | "material";
      id: string;
    };
  };

  function handleSocketFieldChange(data: unknown) {
    if (
      typeof data === "object" &&
      data !== null &&
      "field" in data &&
      "value" in data
    ) {
      const { field, value, section } = data as SocketFieldChangeData;

      if (field in activityData) {
        setActivityData((prev) => ({ ...prev, [field]: value }));
      }

      if (section?.type === "programSection") {
        setProgramSections((prev) =>
          prev.map((s) => (s.id === section.id ? { ...s, [field]: value } : s))
        );
      }

      if (section?.type === "material") {
        setMaterials((prev) =>
          prev.map((m) => (m.id === section.id ? { ...m, [field]: value } : m))
        );
      }
    }
  }

  const handleFieldChange = (field: keyof ActivityData, value: string) => {
    setActivityData({ ...activityData, [field]: value });

    if (socket && !isNew) {
      socket.emit("activity-field-update", {
        activityId,
        field,
        value,
      });
    }
  };

  const updateProgramSection = (
    id: string,
    field: keyof ProgramSection,
    value: string
  ) => {
    setProgramSections(
      programSections.map((section) =>
        section.id === id ? { ...section, [field]: value } : section
      )
    );

    if (socket && !isNew) {
      socket.emit("activity-field-update", {
        activityId,
        field,
        value,
        section: { type: "programSection", id },
      });
    }
  };

  const updateMaterial = (
    id: string,
    field: keyof Material,
    value: string | boolean
  ) => {
    setMaterials(
      materials.map((material) =>
        material.id === id ? { ...material, [field]: value } : material
      )
    );

    if (socket && !isNew) {
      socket.emit("activity-field-update", {
        activityId,
        field,
        value,
        section: { type: "material", id },
      });
    }
  };

  const addProgramSection = () => {
    setProgramSections([
      ...programSections,
      {
        id: Date.now().toString(),
        time: "",
        program: "",
        responsible: "",
      },
    ]);
  };

  const removeProgramSection = (id: string) => {
    setProgramSections(programSections.filter((section) => section.id !== id));
  };

  const addMaterial = () => {
    setMaterials([
      ...materials,
      {
        id: Date.now().toString(),
        checked: false,
        item: "",
        unit: "Stu",
        assignedTo: "Stu",
      },
    ]);
  };

  const removeMaterial = (id: string) => {
    setMaterials(materials.filter((material) => material.id !== id));
  };

  const handleSave = async () => {
    try {
      const payload = {
        ...activityData,
        programSections,
        materials,
      };

      if (isNew) {
        await apiClient.post("/activities", payload);
      } else {
        await apiClient.put(`/activities/${activityId}`, payload);
      }

      router.back();
    } catch (error) {
      console.error("Error saving activity:", error);
      alert("Failed to save activity");
    }
  };

  return {
    loading,
    activityData,
    programSections,
    materials,
    activeUsers,
    userOptions,
    handleFieldChange,
    updateProgramSection,
    updateMaterial,
    addProgramSection,
    removeProgramSection,
    addMaterial,
    removeMaterial,
    handleSave,
  };
}