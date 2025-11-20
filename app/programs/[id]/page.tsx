"use client";

import { useParams } from "next/navigation";
import { DashboardLayout } from "@/components/layouts/DashboardLayout";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import { ErrorState } from "@/components/ui/ErrorState";
import { ProgramDetailBreadcrumb } from "@/components/programs/detail/ProgramDetailBreadcrumb";
import { ProgramHeader } from "@/components/programs/detail/ProgramHeader";
import { ActivitiesTimeline } from "@/components/programs/detail/ActivitiesTimeline";
import { useAuth } from "@/hooks/useAuth";
import { useProgramDetail } from "@/hooks/useProgramDetail";

export default function ProgramDetailPage() {
  const params = useParams();
  const id = params.id as string;

  const { user, loading: authLoading } = useAuth({ requireAuth: true });
  const { quarterPlan, activities, loading, error } = useProgramDetail(id);

  if (authLoading || loading) {
    return <LoadingSpinner />;
  }

  if (error || !quarterPlan) {
    return (
      <DashboardLayout user={user} activePage="programs">
        <ErrorState message="Quarter program not found" />
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout user={user} activePage="programs">
      <ProgramDetailBreadcrumb programName={quarterPlan.name} />

      <div className="p-8 bg-gray-50">
        <ProgramHeader quarterPlan={quarterPlan} />
        <ActivitiesTimeline activities={activities} />
      </div>
    </DashboardLayout>
  );
}