"use client";

import { DashboardLayout } from "../../components/layouts/DashboardLayout";
import { StatsGrid } from "../../components/dashboard/StatsGrid";
import { QuickActions } from "../../components/dashboard/QuickActions";
import { useDashboardStats } from "../../hooks/useDashboardStats";
import { useAuth } from "../../hooks/useAuth";
import { Breadcrumb } from "../../components/ui/Breadcrumb";
import { LoadingSpinner } from "../../components/ui/LoadingSpinner";

export default function DashboardPage() {
  const { user, loading: authLoading } = useAuth({ requireAuth: true });
  const { stats, loading: statsLoading, error } = useDashboardStats();

  if (authLoading || statsLoading) {
    return <LoadingSpinner />;
  }

  return (
    <DashboardLayout user={user} activePage="dashboard">
      <Breadcrumb items={["Planori", "Dashboard"]} />
      
      <div className="p-8 space-y-8">
        {error && (
            <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded">
            Fehler beim Laden der Dashboard-Statistiken. Bitte versuchen Sie es erneut.
            </div>
        )}
        
        <StatsGrid stats={stats} />
        <QuickActions />
      </div>
    </DashboardLayout>
  );
}