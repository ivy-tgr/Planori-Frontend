"use client";

import { ActivityEditorHeader } from "./editor/ActivityEditorHeader";
import { BasicInfoCard } from "./editor/BasicInfoCard";
import { RedThreadCard } from "./editor/RedThreadCard";
import { SafetyNotesCard } from "./editor/SafetyNotesCard";
import { ProgramSectionsCard } from "./editor/ProgramSectionsCard";
import { MaterialsCard } from "./editor/MaterialsCard";
import type { ActivityEditorState } from "@/types/activity";

interface ActivityEditorProps extends ActivityEditorState {
  isNew: boolean;
  activityId: string;
}

export function ActivityEditor({
  activityData,
  programSections,
  materials,
  activeUsers,
  isNew,
  activityId,
  handleFieldChange,
  updateProgramSection,
  updateMaterial,
  addProgramSection,
  removeProgramSection,
  addMaterial,
  removeMaterial,
  handleSave,
  userOptions,
}: ActivityEditorProps) {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto space-y-6">
        <ActivityEditorHeader
          isNew={isNew}
          activityName={activityData.name}
          activeUsers={activeUsers}
          onSave={handleSave}
        />

        <BasicInfoCard
          activityData={activityData}
          onChange={handleFieldChange}
        />

        <RedThreadCard
          value={activityData.redThread}
          onChange={(value: string) => handleFieldChange("redThread", value)}
        />

        <SafetyNotesCard
          value={activityData.safetyNotes}
          onChange={(value: string) => handleFieldChange("safetyNotes", value)}
        />

        <ProgramSectionsCard
          sections={programSections}
          onUpdate={updateProgramSection}
          onAdd={addProgramSection}
          onRemove={removeProgramSection}
        />

        <MaterialsCard
          materials={materials}
          userOptions={userOptions}
          onUpdate={updateMaterial}
          onAdd={addMaterial}
          onRemove={removeMaterial}
        />
      </div>
    </div>
  );
}