import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const QUICK_ACTIONS = [
  {
    title: "Aktivität erstellen",
    description: "Plane deine nächste Pfadfinder-Aktivität",
    path: "/activities/new",
  },
  {
    title: "Programm erstellen",
    description: "Plane dein Quartalsprogramm",
    path: "/programs/new",
  },
  {
    title: "Materialien verwalten",
    description: "Organisiere deine Materialien",
    path: "/materials",
  },
  {
    title: "Alle Aktivitäten",
    description: "Übersicht über alle Aktivitäten",
    path: "/activities",
  },
];

export function QuickActions() {
  const router = useRouter();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Start</CardTitle>
        <p className="text-sm text-gray-500">Starte mit Planori</p>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {QUICK_ACTIONS.map((action) => (
            <QuickActionButton
              key={action.path}
              {...action}
              onClick={() => router.push(action.path)}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

function QuickActionButton({
  title,
  description,
  onClick,
}: {
  title: string;
  description: string;
  onClick: () => void;
}) {
  return (
    <Button
      variant="outline"
      className="h-20 justify-start text-left"
      onClick={onClick}
    >
      <div>
        <p className="font-semibold">{title}</p>
        <p className="text-sm text-gray-500">{description}</p>
      </div>
    </Button>
  );
}