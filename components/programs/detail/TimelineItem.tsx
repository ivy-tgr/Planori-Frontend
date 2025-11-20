import { useRouter } from "next/navigation";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ActivityStatusIcon } from "./ActivityStatusIcon";
import { ActivityDetails } from "./ActivityDetails";
import { getStatusLabel, getStatusStyle } from "@/utils/activityHelpers";
import type { Activity, ActivityStatus } from "@/types/activity";

interface TimelineItemProps {
  activity: Activity;
  status: ActivityStatus;
}

export function TimelineItem({ activity, status }: TimelineItemProps) {
  const router = useRouter();

  return (
    <div className="relative pl-20">
      {/* Timeline Dot */}
      <div className="absolute left-5 top-6 z-10">
        <ActivityStatusIcon status={status} />
      </div>

      {/* Activity Card */}
      <Card
        className={`cursor-pointer hover:shadow-md transition-all ${getStatusStyle(
          status
        )}`}
        onClick={() => router.push(`/activities/${activity.id}`)}
      >
        <CardHeader>
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <span
                  className={`text-xs font-medium px-2 py-1 rounded-full ${
                    status === "next"
                      ? "bg-purple-100 text-purple-700"
                      : status === "past"
                      ? "bg-gray-100 text-gray-600"
                      : "bg-blue-100 text-blue-700"
                  }`}
                >
                  {getStatusLabel(status)}
                </span>
              </div>
              <CardTitle className="text-lg">{activity.name}</CardTitle>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <ActivityDetails activity={activity} />
        </CardContent>
      </Card>
    </div>
  );
}