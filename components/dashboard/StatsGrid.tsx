import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, FileText, Package, Users } from "lucide-react";
import type { DashboardStats } from "../../types/dashboard";

interface StatsGridProps {
  stats: DashboardStats;
}

export function StatsGrid({ stats }: StatsGridProps) {
  const statCards = [
    {
      title: "Bevorstehende Aktivitäten",
      value: stats.upcomingActivities,
      subtitle: `Gesamtaktivitäten: ${stats.totalActivities}`,
      icon: Calendar,
    },
    {
      title: "Aktive Programme",
      value: stats.activePrograms,
      subtitle: `Gesamt: ${stats.totalPrograms}`,
      icon: FileText,
    },
    {
      title: "Materialien",
      value: stats.materials,
      subtitle: "zu organisieren",
      icon: Package,
    },
    {
      title: "Benutzer",
      value: stats.users,
      subtitle: `Aktiv: ${stats.activeUsers}`,
      icon: Users,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {statCards.map((stat) => (
        <StatCard key={stat.title} {...stat} />
      ))}
    </div>
  );
}

function StatCard({ 
  title, 
  value, 
  subtitle, 
  icon: Icon 
}: { 
  title: string; 
  value: number; 
  subtitle: string; 
  icon: React.ComponentType<{ className?: string }>;
}) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-gray-600">
          {title}
        </CardTitle>
        <Icon className="h-4 w-4 text-gray-400" />
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold">{value}</div>
        <p className="text-xs text-gray-500 mt-1">{subtitle}</p>
      </CardContent>
    </Card>
  );
}
