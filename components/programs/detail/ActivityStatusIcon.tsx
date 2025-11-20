import { CheckCircle2, Flag, Clock } from "lucide-react";
import type { ActivityStatus } from "@/types/activity";

interface ActivityStatusIconProps {
  status: ActivityStatus;
}

export function ActivityStatusIcon({ status }: ActivityStatusIconProps) {
  switch (status) {
    case "past":
      return <CheckCircle2 className="h-5 w-5 text-gray-400" />;
    case "next":
      return (
        <div className="relative">
          <div className="absolute inset-0 bg-purple-500 rounded-full animate-ping opacity-75" />
          <Flag className="h-5 w-5 text-purple-600 relative" />
        </div>
      );
    case "upcoming":
      return <Clock className="h-5 w-5 text-blue-500" />;
  }
}