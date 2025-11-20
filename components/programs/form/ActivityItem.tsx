import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import type { Activity } from "@/types/program";

interface ActivityItemProps {
  activity: Activity;
  index: number;
  onChange: (activity: Activity) => void;
  onRemove: () => void;
}

export function ActivityItem({
  activity,
  index,
  onChange,
  onRemove,
}: ActivityItemProps) {
  const handleChange = (field: keyof Activity, value: string) => {
    onChange({ ...activity, [field]: value });
  };

  return (
    <div className="border rounded-lg p-4 bg-gray-50 space-y-3">
      <div className="flex items-center justify-between mb-2">
        <h4 className="font-medium text-gray-900">Activity {index + 1}</h4>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={onRemove}
          className="text-red-600 hover:text-red-700"
        >
          Remove
        </Button>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Title
          </label>
          <Input
            placeholder="e.g., Willy Wonka SSL"
            value={activity.title}
            onChange={(e) => handleChange("title", e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Date
          </label>
          <Input
            type="date"
            value={activity.date}
            onChange={(e) => handleChange("date", e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Location
          </label>
          <Input
            placeholder="e.g., Forest Hut Ettenberg"
            value={activity.location}
            onChange={(e) => handleChange("location", e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Leader
          </label>
          <Input
            placeholder="e.g., Max Mustermann"
            value={activity.leader}
            onChange={(e) => handleChange("leader", e.target.value)}
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Red Thread
        </label>
        <Textarea
          placeholder="Describe the red thread of this activity"
          value={activity.redThread}
          onChange={(e) => handleChange("redThread", e.target.value)}
          rows={2}
        />
      </div>
    </div>
  );
}