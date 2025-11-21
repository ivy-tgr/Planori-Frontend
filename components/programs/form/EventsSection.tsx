import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { EventItem } from "./EventItem";
import type { Event } from "@/types/program";

interface EventsSectionProps {
  events: Event[];
  onChange: (events: Event[]) => void;
}

export function EventsSection({ events, onChange }: EventsSectionProps) {
  const addEvent = () => {
    onChange([
      ...events,
      {
        title: "",
        date: "",
        location: "",
      },
    ]);
  };

  const updateEvent = (index: number, updated: Event) => {
    onChange(events.map((e, i) => (i === index ? updated : e)));
  };

  const removeEvent = (index: number) => {
    onChange(events.filter((_, i) => i !== index));
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Veranstaltungen</CardTitle>
            <p className="text-sm text-gray-500 mt-1">
              Fügen Sie Veranstaltungen mit Titel, Datum und Ort hinzu (kein roter Faden)
            </p>
          </div>
          <Button type="button" onClick={addEvent}>
            + Veranstaltung hinzufügen
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {events.length === 0 ? (
          <p className="text-gray-500 text-center py-4">Noch keine Veranstaltungen hinzugefügt</p>
        ) : (
          events.map((event, index) => (
            <EventItem
              key={index}
              event={event}
              index={index}
              onChange={(updated) => updateEvent(index, updated)}
              onRemove={() => removeEvent(index)}
            />
          ))
        )}
      </CardContent>
    </Card>
  );
}
