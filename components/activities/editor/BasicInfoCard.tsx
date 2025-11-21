import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { ActivityData } from "@/types/activity";

interface BasicInfoCardProps {
  activityData: ActivityData;
  onChange: (field: keyof ActivityData, value: string) => void;
}

export function BasicInfoCard({ activityData, onChange }: BasicInfoCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Grundinformationen</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label>Aktivitätstitel</Label>
          <Input
            value={activityData.name}
            onChange={(e) => onChange("name", e.target.value)}
            placeholder="z.B. Willy Wonka SSL"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label>Ort</Label>
            <Input
              value={activityData.location}
              onChange={(e) => onChange("location", e.target.value)}
              placeholder="z.B. Waldhütte Ettenberg"
            />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div>
            <Label>Datum</Label>
            <Input
              type="date"
              value={activityData.date}
              onChange={(e) => onChange("date", e.target.value)}
            />
          </div>
          <div>
            <Label>Von</Label>
            <Input
              type="time"
              value={activityData.startTime}
              onChange={(e) => onChange("startTime", e.target.value)}
            />
          </div>
          <div>
            <Label>Bis</Label>
            <Input
              type="time"
              value={activityData.endTime}
              onChange={(e) => onChange("endTime", e.target.value)}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}