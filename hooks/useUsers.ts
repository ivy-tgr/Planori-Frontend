import { useState, useEffect } from "react";
import { apiClient } from "@/lib/apiClient";
import type { UserOption } from "@/types/activity";

export function useUsers() {
  const [userOptions, setUserOptions] = useState<UserOption[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  async function fetchUsers() {
    try {
      const users = await apiClient.get<{ id: string; name?: string; email?: string }[]>("/users");
      setUserOptions(
        users.map((u) => ({
          id: u.id,
          name: u.name || u.email || "Unknown",
        }))
      );
    } catch (error) {
      console.error("Error fetching users:", error);
      setUserOptions([]);
    } finally {
      setLoading(false);
    }
  }

  return { userOptions, loading };
}
