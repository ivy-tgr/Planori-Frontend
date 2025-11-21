"use client";

import { DashboardLayout } from "@/components/layouts/DashboardLayout";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import { ProgramsHeader } from "@/components/programs/ProgramsHeader";
import { ProgramsGrid } from "@/components/programs/ProgramsGrid";
import { EmptyState } from "@/components/programs/EmptyState";
import { useAuth } from "@/hooks/useAuth";
import { usePrograms } from "@/hooks/usePrograms";

export default function ProgramsPage() {
  const { user, loading: authLoading } = useAuth({ requireAuth: true });
  const { programs, loading: programsLoading, error } = usePrograms();

  if (authLoading || programsLoading) {
    return <LoadingSpinner />;
  }

  return (
    <DashboardLayout user={user} activePage="programs">
      <Breadcrumb items={["Planori", "Quartals Program"]} />

      <div className="p-8">
        <ProgramsHeader totalPrograms={programs.length} />

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded mb-6">
            Failed to load programs. Please try again.
          </div>
        )}

        {programs.length === 0 ? (
          <EmptyState />
        ) : (
          <ProgramsGrid programs={programs} />
        )}
      </div>
    </DashboardLayout>
  );
}
