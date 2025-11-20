import { Card, CardContent } from "@/components/ui/card";

export function EmptyActivities() {
  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-xl font-semibold mb-6 text-gray-900">
        Activities Timeline
      </h2>
      <Card>
        <CardContent className="py-12 text-center">
          <p className="text-gray-500">
            No activities yet for this quarter program
          </p>
        </CardContent>
      </Card>
    </div>
  );
}