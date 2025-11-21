"use client";

import { useParams } from "next/navigation";
import { DashboardLayout } from "@/components/layouts/DashboardLayout";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import { ActivityEditor } from "@/components/activities/ActivityEditor";
import { useAuth } from "@/hooks/useAuth";
import { useActivityEditor } from "@/hooks/useActivityEditor";

export default function ActivityPage() {
  const params = useParams();
  const activityId = params.id as string;
  const isNew = activityId === "new";

  const { user, loading: authLoading } = useAuth({ requireAuth: true });
  const editorState = useActivityEditor(activityId, isNew);

  if (authLoading || editorState.loading) {
    return <LoadingSpinner />;
  }

  return (
    <DashboardLayout user={user} activePage="activities">
      <ActivityEditor {...editorState} isNew={isNew} activityId={activityId} />
    </DashboardLayout>
  );
}