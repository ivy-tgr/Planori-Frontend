import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ActivityItem } from "./ActivityItem";
import type { Activity } from "@/types/program";

interface ActivitiesSectionProps {
  activities: Activity[];
  onChange: (activities: Activity[]) => void;
}

export function ActivitiesSection({
  activities,
  onChange,
}: ActivitiesSectionProps) {
  const addActivity = () => {
    onChange([
      ...activities,
      {
        title: "",
        date: "",
        location: "",
        leader: "",
        redThread: "",
      },
    ]);
  };

  const updateActivity = (index: number, updated: Activity) => {
    onChange(activities.map((a, i) => (i === index ? updated : a)));
  };

  const removeActivity = (index: number) => {
    onChange(activities.filter((_, i) => i !== index));
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Aktivitäten</CardTitle>
            <p className="text-sm text-gray-500 mt-1">
              Füge Aktivitäten mit Titel, Datum, Ort, Leitung und rotem Faden hinzu
            </p>
          </div>
          <Button type="button" onClick={addActivity}>
            + Aktivität hinzufügen
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {activities.length === 0 ? (
          <p className="text-gray-500 text-center py-4">
            Noch keine Aktivitäten hinzugefügt
          </p>
        ) : (
          activities.map((activity, index) => (
            <ActivityItem
              key={index}
              activity={activity}
              index={index}
              onChange={(updated: Activity) => updateActivity(index, updated)}
              onRemove={() => removeActivity(index)}
            />
          ))
        )}
      </CardContent>
    </Card>
  );
}