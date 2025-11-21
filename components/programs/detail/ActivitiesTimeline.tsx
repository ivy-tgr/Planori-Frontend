import { TimelineItem } from "./TimelineItem";
import { EmptyActivities } from "./EmptyActivities";
import type { Activity } from "@/types/activity";
import { getActivityStatus } from "@/utils/activityHelpers";

interface ActivitiesTimelineProps {
  activities: Activity[];
}

export function ActivitiesTimeline({ activities }: ActivitiesTimelineProps) {
  if (activities.length === 0) {
    return <EmptyActivities />;
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-xl font-semibold mb-6 text-gray-900">
        Aktivitäten Zeitachse
      </h2>

      <div className="relative">
        <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gray-200" />

        <div className="space-y-6">
          {activities.map((activity) => {
            const status = getActivityStatus(activity.date, activities);
            return (
              <TimelineItem
                key={activity.id}
                activity={activity}
                status={status}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}