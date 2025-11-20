import { useState, useEffect } from "react";
import { apiClient } from "@/lib/apiClient";
import type { QuarterPlan } from "@/types/program";
import type { Activity } from "@/types/activity";

interface ProgramDetailResponse {
  quarterPlan: QuarterPlan;
  activities: Activity[];
}

export function useProgramDetail(id: string) {
  const [quarterPlan, setQuarterPlan] = useState<QuarterPlan | null>(null);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!id) return;

      try {
        setLoading(true);
        setError(null);
        const data = await apiClient.get<ProgramDetailResponse>(
          `/quarter-plans/${id}`
        );
        setQuarterPlan(data.quarterPlan);
        setActivities(data.activities);
      } catch (err) {
        setError(
          err instanceof Error ? err : new Error("Failed to fetch program")
        );
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  return { quarterPlan, activities, loading, error };
}