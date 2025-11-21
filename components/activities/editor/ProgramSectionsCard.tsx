import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { ProgramSectionRow } from "./ProgramSectionRow";
import type { ProgramSection } from "@/types/activity";

interface ProgramSectionsCardProps {
  sections: ProgramSection[];
  onUpdate: (id: string, field: keyof ProgramSection, value: string) => void;
  onAdd: () => void;
  onRemove: (id: string) => void;
}

export function ProgramSectionsCard({
  sections,
  onUpdate,
  onAdd,
  onRemove,
}: ProgramSectionsCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Programm</CardTitle>
        <Button variant="outline" size="sm" onClick={onAdd}>
          <Plus className="h-4 w-4 mr-1" />
          Add
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="grid grid-cols-12 gap-2 pb-2 border-b font-medium text-sm">
            <div className="col-span-2">Zeit</div>
            <div className="col-span-8">Program</div>
            <div className="col-span-2">Verantwortlicher</div>
          </div>

          {sections.map((section) => (
            <ProgramSectionRow
              key={section.id}
              section={section}
              onUpdate={onUpdate}
              onRemove={onRemove}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}