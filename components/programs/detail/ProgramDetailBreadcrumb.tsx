import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

interface ProgramDetailBreadcrumbProps {
  programName: string;
}

export function ProgramDetailBreadcrumb({ programName }: ProgramDetailBreadcrumbProps) {
  const router = useRouter();

  return (
    <header className="border-b bg-white px-8 py-4">
      <div className="flex items-center text-sm text-gray-500 mb-4">
        <span>$</span>
        <span className="mx-2">/</span>
        <span>Planori</span>
        <span className="mx-2">/</span>
        <span
          className="cursor-pointer hover:text-gray-900 transition-colors"
          onClick={() => router.push("/programs")}
        >
          Programs
        </span>
        <span className="mx-2">/</span>
        <span className="text-gray-900">{programName}</span>
      </div>

      <Button
        variant="ghost"
        onClick={() => router.push("/programs")}
        className="gap-2"
      >
        <ArrowLeft className="h-4 w-4" />
        Back
      </Button>
    </header>
  );
}