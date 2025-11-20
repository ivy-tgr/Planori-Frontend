import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, Plus } from "lucide-react";

export function EmptyState() {
  const router = useRouter();

  return (
    <Card>
      <CardContent className="flex flex-col items-center justify-center py-12">
        <Clock className="h-12 w-12 text-gray-400 mb-4" />
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          No programs available
        </h3>
        <p className="text-gray-500 mb-6">
          Create your first quarterly program
        </p>
        <Button onClick={() => router.push("/programs/new")}>
          <Plus className="h-4 w-4 mr-2" />
          Create New Program
        </Button>
      </CardContent>
    </Card>
  );
}