import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

interface ProgramsHeaderProps {
  totalPrograms: number;
}

export function ProgramsHeader({ totalPrograms }: ProgramsHeaderProps) {
  const router = useRouter();

  return (
    <div className="flex items-center justify-between mb-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Quarter Programs</h1>
        <p className="text-gray-500 mt-1">
          Verwalten Sie Ihre Quartalsprogramme ({totalPrograms})
        </p>
      </div>
      <Button
        size="lg"
        className="gap-2"
        onClick={() => router.push("/programs/new")}
      >
        <Plus className="h-5 w-5" />
        Neues Program
      </Button>
    </div>
  );
}