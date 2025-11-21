import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Save, Users } from "lucide-react";

interface ActivityEditorHeaderProps {
  isNew: boolean;
  activityName: string;
  activeUsers: number;
  onSave: () => Promise<void>;
}

export function ActivityEditorHeader({
  isNew,
  activityName,
  activeUsers,
  onSave,
}: ActivityEditorHeaderProps) {
  const router = useRouter();

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm" onClick={() => router.back()}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
        <div>
          <h1 className="text-3xl font-bold">
            {isNew ? "New Activity" : "Edit Activity"}
          </h1>
          <p className="text-gray-500 mt-1">
            {activityName || "Untitled Activity"}
          </p>
          {!isNew && activeUsers > 0 && (
            <p className="text-sm text-blue-600 flex items-center gap-1 mt-1">
              <Users className="h-4 w-4" />
              {activeUsers} {activeUsers === 1 ? "other user" : "other users"}{" "}
              active
            </p>
          )}
        </div>
      </div>
      <Button onClick={onSave} className="gap-2">
        <Save className="h-4 w-4" />
        Save
      </Button>
    </div>
  );
}