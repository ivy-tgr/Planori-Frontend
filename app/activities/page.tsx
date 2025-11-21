"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import {
  Plus,
  Search,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  MoreHorizontal,
  ArrowRight,
} from "lucide-react";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged, User } from "firebase/auth";
import Sidebar from "../../components/Sidebar";

interface Activity {
  id: string;
  name: string;
  date: string;
  qpId?: string;
  location: string;
  redThread?: string;
  safetyNotes?: string;
  createdBy?: string;
}

export default function ActivitiesPage() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);
  const [user] = useState<User | null>(null);
  const totalPages = 10;

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.push("/login");
      }
    });
    return () => unsubscribe();
  }, [router]);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/activities");
        if (!response.ok) {
          throw new Error("Failed to fetch activities");
        }
        const data = await response.json();
        setActivities(data);
      } catch (error) {
        console.error("Error fetching activities:", error);
        setActivities([]);
      } finally {
        setLoading(false);
      }
    };

    fetchActivities();
  }, []);

  const formatDate = (dateString: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("de-DE");
  };

  const filteredActivities = activities.filter(
    (activity) =>
      activity.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      activity.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      activity.redThread?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p>Lädt Aktivitäten...</p>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen">
      <Sidebar user={user} activePage="activities" />

      <main className="flex-1 bg-white">
        <header className="border-b px-8 py-4">
          <div className="flex items-center text-sm text-gray-500">
            <span>$</span>
            <span className="mx-2">/</span>
            <span>Planori</span>
            <span className="mx-2">/</span>
            <span className="text-gray-900">Aktivitäten</span>
          </div>
        </header>

        <div className="p-8">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-2xl">Aktivitäten</CardTitle>
                  <p className="text-sm text-gray-500 mt-1">
                    Liste von allen Aktivitäten ({activities.length})
                  </p>
                </div>
                <Button
                  className="gap-2"
                  onClick={() => router.push("/activities/new")}
                >
                  <Plus className="h-4 w-4" />
                  Erstelle neue Aktivität
                </Button>
              </div>
            </CardHeader>

            <CardContent>
              <div className="mb-6">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="search"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="border rounded-lg overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-gray-50">
                      <TableHead className="w-32">Date</TableHead>
                      <TableHead className="w-40">Thema</TableHead>
                      <TableHead>Title</TableHead>
                      <TableHead className="w-48">Ort</TableHead>
                      <TableHead className="w-12"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredActivities.length === 0 ? (
                      <TableRow>
                        <TableCell
                          colSpan={6}
                          className="text-center py-8 text-gray-500"
                        >
                          Keine Aktivitäten gefunden
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredActivities.map((activity) => (
                        <TableRow
                          key={activity.id}
                          className="cursor-pointer hover:bg-gray-50"
                          onClick={() =>
                            router.push(`/activities/${activity.id}`)
                          }
                        >
                          <TableCell className="font-medium">
                            {formatDate(activity.date)}
                          </TableCell>
                          <TableCell>
                            <span className="inline-block px-2 py-1 text-xs rounded bg-gray-100">
                              {activity.redThread || "???"}
                            </span>
                          </TableCell>
                          <TableCell className="max-w-md truncate">
                            {activity.name}
                          </TableCell>
                          <TableCell className="flex items-center gap-2">
                            {activity.location}
                          </TableCell>
                          <TableCell>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={(e) => {
                                e.stopPropagation();
                              }}
                            >
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>

              <div className="flex items-center justify-center gap-2 mt-6">
                <span className="text-sm text-gray-500 mr-4">
                  Page {currentPage} of {totalPages}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(1)}
                  disabled={currentPage === 1}
                >
                  <ChevronsLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    setCurrentPage(Math.min(totalPages, currentPage + 1))
                  }
                  disabled={currentPage === totalPages}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(totalPages)}
                  disabled={currentPage === totalPages}
                >
                  <ChevronsRight className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
