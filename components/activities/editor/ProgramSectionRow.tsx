import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import type { ProgramSection } from "@/types/activity";

interface ProgramSectionRowProps {
  section: ProgramSection;
  onUpdate: (id: string, field: keyof ProgramSection, value: string) => void;
  onRemove: (id: string) => void;
}

export function ProgramSectionRow({
  section,
  onUpdate,
  onRemove,
}: ProgramSectionRowProps) {
  return (
    <div className="grid grid-cols-12 gap-2 items-center">
      <div className="col-span-2">
        <Input
          type="time"
          value={section.time}
          onChange={(e) => onUpdate(section.id, "time", e.target.value)}
        />
      </div>
      <div className="col-span-8">
        <Textarea
          rows={2}
          value={section.program}
          onChange={(e) => onUpdate(section.id, "program", e.target.value)}
          placeholder="Describe the program section..."
        />
      </div>
      <div className="col-span-1">
        <Input
          value={section.responsible}
          onChange={(e) => onUpdate(section.id, "responsible", e.target.value)}
        />
      </div>
      <div className="col-span-1 flex justify-end">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onRemove(section.id)}
        >
          <Trash2 className="h-4 w-4 text-red-500" />
        </Button>
      </div>
    </div>
  );
}