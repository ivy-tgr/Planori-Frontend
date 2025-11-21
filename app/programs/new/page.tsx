"use client";

import { DashboardLayout } from "@/components/layouts/DashboardLayout";
import { ProgramForm } from "@/components/programs/ProgramForm";
import { useAuth } from "@/hooks/useAuth";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";

export default function NewProgramPage() {
  const { user, loading } = useAuth({ requireAuth: true });

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <DashboardLayout user={user} activePage="programs">
      <header className="border-b bg-white px-8 py-4">
        <h1 className="text-2xl font-bold text-gray-900">
          Neues Quartalsprogramm erstellen
        </h1>
        <p className="text-gray-500 mt-1">
          Wähle das Quartal aus, füge Aktivitäten & Veranstaltungen hinzu
        </p>
      </header>

      <div className="p-8 bg-gray-50 min-h-screen">
        <ProgramForm />
      </div>
    </DashboardLayout>
  );
}