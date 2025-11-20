import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import type { Event } from "@/types/program";

interface EventItemProps {
  event: Event;
  index: number;
  onChange: (event: Event) => void;
  onRemove: () => void;
}

export function EventItem({ event, index, onChange, onRemove }: EventItemProps) {
  const handleChange = (field: keyof Event, value: string) => {
    onChange({ ...event, [field]: value });
  };

  return (
    <div className="border rounded-lg p-4 bg-gray-50">
      <div className="flex items-center justify-between mb-3">
        <h4 className="font-medium text-gray-900">Event {index + 1}</h4>
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

      <div className="grid grid-cols-3 gap-3">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Title
          </label>
          <Input
            placeholder="e.g., Parent Evening"
            value={event.title}
            onChange={(e) => handleChange("title", e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Date
          </label>
          <Input
            type="date"
            value={event.date}
            onChange={(e) => handleChange("date", e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Location
          </label>
          <Input
            placeholder="e.g., Scout Hall"
            value={event.location}
            onChange={(e) => handleChange("location", e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}