import type { Activity, ActivityStatus } from "@/types/activity";

export function getActivityStatus(
  activityDate: string,
  allActivities: Activity[]
): ActivityStatus {
  const now = new Date();
  const date = new Date(activityDate);

  if (date < now) {
    return "past";
  }

  // Find next activity
  const upcomingActivities = allActivities
    .filter((a) => new Date(a.date) >= now)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  if (upcomingActivities.length > 0) {
    const nextActivity = upcomingActivities[0];
    if (nextActivity.date === activityDate) {
      return "next";
    }
  }

  return "upcoming";
}

export function getStatusLabel(status: ActivityStatus): string {
  const labels = {
    past: "Completed",
    next: "Next Activity",
    upcoming: "Planned",
  };
  return labels[status];
}

export function getStatusStyle(status: ActivityStatus): string {
  const styles = {
    past: "opacity-60 border-gray-200",
    next: "border-purple-300 shadow-lg ring-2 ring-purple-200",
    upcoming: "border-blue-200",
  };
  return styles[status];
}

export function getStatusBadgeClass(status: ActivityStatus): string {
  const classes = {
    past: "bg-gray-100 text-gray-600",
    next: "bg-purple-100 text-purple-700",
    upcoming: "bg-blue-100 text-blue-700",
  };
  return classes[status];
}
