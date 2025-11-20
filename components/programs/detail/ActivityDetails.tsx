import { Calendar, MapPin, Flag, AlertTriangle } from "lucide-react";
import { formatDate } from "@/utils/dateFormatters";
import type { Activity } from "@/types/activity";
import { DetailRow } from "@/components/ui/DetailRow";

interface ActivityDetailsProps {
  activity: Activity;
}

export function ActivityDetails({ activity }: ActivityDetailsProps) {
  return (
    <div className="space-y-3">
      <DetailRow
        icon={Calendar}
        label="Date"
        value={formatDate(activity.date)}
      />

      <DetailRow icon={MapPin} label="Location" value={activity.location} />

      {activity.redThread && (
        <DetailRow icon={Flag} label="Red Thread" value={activity.redThread} />
      )}

      {activity.safetyNotes && (
        <DetailRow
          icon={AlertTriangle}
          label="Safety Notes"
          value={activity.safetyNotes}
          iconClassName="text-orange-500"
        />
      )}
    </div>
  );
}