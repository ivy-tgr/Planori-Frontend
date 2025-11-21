import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { MaterialRow } from "./MaterialRow";
import type { Material, UserOption } from "@/types/activity";

interface MaterialsCardProps {
  materials: Material[];
  userOptions: UserOption[];
  onUpdate: (id: string, field: keyof Material, value: string | boolean) => void;
  onAdd: () => void;
  onRemove: (id: string) => void;
}

export function MaterialsCard({
  materials,
  userOptions,
  onUpdate,
  onAdd,
  onRemove,
}: MaterialsCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Materials</CardTitle>
        <Button variant="outline" size="sm" onClick={onAdd}>
          <Plus className="h-4 w-4 mr-1" />
          Add
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="grid grid-cols-12 gap-2 pb-2 border-b font-medium text-sm">
            <div className="col-span-1">Done</div>
            <div className="col-span-1">Unit</div>
            <div className="col-span-6">Item</div>
            <div className="col-span-3">Assigned To</div>
          </div>

          {materials.map((material) => (
            <MaterialRow
              key={material.id}
              material={material}
              userOptions={userOptions}
              onUpdate={onUpdate}
              onRemove={onRemove}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}