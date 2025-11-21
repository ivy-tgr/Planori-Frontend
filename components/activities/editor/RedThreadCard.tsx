import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";

interface RedThreadCardProps {
  value: string;
  onChange: (value: string) => void;
}

export function RedThreadCard({ value, onChange }: RedThreadCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Roter Faden</CardTitle>
      </CardHeader>
      <CardContent>
        <Textarea
          placeholder="Describe the activity story..."
          rows={4}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      </CardContent>
    </Card>
  );
}