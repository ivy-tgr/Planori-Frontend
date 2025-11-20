"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ProgramDetails } from "./form/ProgramDetails";
import { ActivitiesSection } from "./form/ActivitiesSection";
import { EventsSection } from "./form/EventsSection";
import { apiClient } from "@/lib/apiClient";
import { QUINTALS } from "@/constants/quintals";
import type { ProgramFormData, Activity, Event } from "@/types/program";

export function ProgramForm() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState<ProgramFormData>({
    name: "",
    description: "",
    quintal: QUINTALS[0],
    createdBy: "admin",
  });

  const [activities, setActivities] = useState<Activity[]>([]);
  const [events, setEvents] = useState<Event[]>([]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const payload = {
        name: formData.name,
        description: formData.description,
        startDate: formData.quintal.startDate,
        endDate: formData.quintal.endDate,
        createdBy: formData.createdBy,
        activities,
        events,
      };

      await apiClient.post("/quarter-plans", payload);
      router.push("/programs");
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to create program"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded">
          {error}
        </div>
      )}

      <ProgramDetails formData={formData} onChange={setFormData} />

      <ActivitiesSection
        activities={activities}
        onChange={setActivities}
      />

      <EventsSection events={events} onChange={setEvents} />

      <div className="flex gap-4">
        <Button
          type="button"
          variant="outline"
          onClick={() => router.push("/programs")}
          disabled={isSubmitting}
        >
          Cancel
        </Button>
        <Button type="submit" size="lg" disabled={isSubmitting}>
          {isSubmitting ? "Saving..." : "Save Quarter Program"}
        </Button>
      </div>
    </form>
  );
}