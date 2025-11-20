import { useState, useEffect } from "react";
import type { DashboardStats } from "../types/dashboard";
import { apiClient } from "../lib/apiClient";

const EMPTY_STATS: DashboardStats = {
  upcomingActivities: 0,
  pastActivities: 0,
  totalActivities: 0,
  activePrograms: 0,
  totalPrograms: 0,
  materials: 0,
  users: 0,
  activeUsers: 0,
};

export function useDashboardStats() {
  const [stats, setStats] = useState<DashboardStats>(EMPTY_STATS);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await apiClient.get<DashboardStats>("/dashboard-stats");
        setStats(data);
      } catch (err) {
        setError(err instanceof Error ? err : new Error("Failed to fetch stats"));
        setStats(EMPTY_STATS);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return { stats, loading, error };
}
