import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { QUINTALS } from "@/constants/quintals";
import type { ProgramFormData } from "@/types/program";

interface ProgramDetailsProps {
  formData: ProgramFormData;
  onChange: (data: ProgramFormData) => void;
}

export function ProgramDetails({ formData, onChange }: ProgramDetailsProps) {
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    onChange({ ...formData, [e.target.name]: e.target.value });
  };

  const handleQuintalChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const quintal = QUINTALS[parseInt(e.target.value)];
    onChange({ ...formData, quintal });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Program Details</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Program Name
          </label>
          <Input
            name="name"
            placeholder="e.g., Spring 2026 - Adventure Land"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Quintal
          </label>
          <select
            className="w-full border border-gray-300 rounded-md px-3 py-2"
            value={QUINTALS.indexOf(formData.quintal)}
            onChange={handleQuintalChange}
          >
            {QUINTALS.map((q, i) => (
              <option key={i} value={i}>
                {q.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <Textarea
            name="description"
            placeholder="Brief description of the quarter program"
            value={formData.description}
            onChange={handleChange}
            rows={3}
          />
        </div>
      </CardContent>
    </Card>
  );
}