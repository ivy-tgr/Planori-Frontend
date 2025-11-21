import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Trash2 } from "lucide-react";
import type { Material, UserOption } from "@/types/activity";

interface MaterialRowProps {
  material: Material;
  userOptions: UserOption[];
  onUpdate: (id: string, field: keyof Material, value: string | boolean) => void;
  onRemove: (id: string) => void;
}

export function MaterialRow({
  material,
  userOptions,
  onUpdate,
  onRemove,
}: MaterialRowProps) {
  return (
    <div className="grid grid-cols-12 gap-2 items-center">
      <div className="col-span-1">
        <input
          type="checkbox"
          checked={material.checked}
          onChange={(e) => onUpdate(material.id, "checked", e.target.checked)}
          className="w-4 h-4"
        />
      </div>
      <div className="col-span-1">
        <Input
          value={material.unit}
          onChange={(e) => onUpdate(material.id, "unit", e.target.value)}
        />
      </div>
      <div className="col-span-6">
        <Input
          value={material.item}
          onChange={(e) => onUpdate(material.id, "item", e.target.value)}
          placeholder="e.g., kebab skewers"
        />
      </div>
      <div className="col-span-3">
        <Select
          value={material.assignedTo}
          onValueChange={(value) => onUpdate(material.id, "assignedTo", value)}
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {userOptions.map((user) => (
              <SelectItem key={user.id} value={user.id}>
                {user.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="col-span-1 flex justify-end">
        <Button variant="ghost" size="sm" onClick={() => onRemove(material.id)}>
          <Trash2 className="h-4 w-4 text-red-500" />
        </Button>
      </div>
    </div>
  );
}