import { useState, useEffect } from "react";
import type { QuarterPlan } from "@/types/program";
import { apiClient } from "@/lib/apiClient";

export function usePrograms() {
  const [programs, setPrograms] = useState<QuarterPlan[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await apiClient.get<QuarterPlan[]>("/quarter-plans");
        setPrograms(data);
      } catch (err) {
        setError(err instanceof Error ? err : new Error("Failed to fetch programs"));
        setPrograms([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPrograms();
  }, []);

  return { programs, loading, error, refetch: () => {} };
}