import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";

interface SafetyNotesCardProps {
  value: string;
  onChange: (value: string) => void;
}

export function SafetyNotesCard({ value, onChange }: SafetyNotesCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Sicherheitsgedanken</CardTitle>
      </CardHeader>
      <CardContent>
        <Textarea
          placeholder="Safety notes..."
          rows={3}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      </CardContent>
    </Card>
  );
}
