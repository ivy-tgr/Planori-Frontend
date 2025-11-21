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
} from "@/components/ui/table";
import { Package, Search, CheckCircle, Circle } from "lucide-react";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged, User } from "firebase/auth";
import Sidebar from "@/components/Sidebar";

interface Material {
  id: string;
  item: string;
  unit: string;
  assignedTo: string;
  checked: boolean;
  activityName: string;
  activityDate: string;
  activityId: string;
}

export default function MaterialsPage() {
  const router = useRouter();
  const [materials, setMaterials] = useState<Material[]>([]);
  const [filteredMaterials, setFilteredMaterials] = useState<Material[]>([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterUser, setFilterUser] = useState<string>("all");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) {
        router.push("/login");
      } else {
        setUser(currentUser);
      }
    });
    return () => unsubscribe();
  }, [router]);

  useEffect(() => {
    const fetchMaterials = async () => {
      try {
        const response = await fetch(
          "http://localhost:3000/api/materials/upcoming"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch materials");
        }
        const data = await response.json();
        setMaterials(data);
        setFilteredMaterials(data);
      } catch (error) {
        console.error("Error fetching materials:", error);
        setMaterials([]);
        setFilteredMaterials([]);
      } finally {
        setLoading(false);
      }
    };

    fetchMaterials();
  }, []);

  useEffect(() => {
    let filtered = materials;

    if (filterUser !== "all") {
      filtered = filtered.filter((m) => m.assignedTo === filterUser);
    }

    if (searchTerm) {
      filtered = filtered.filter(
        (m) =>
          m.item.toLowerCase().includes(searchTerm.toLowerCase()) ||
          m.activityName.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredMaterials(filtered);
  }, [searchTerm, filterUser, materials]);

  const uniqueUsers = Array.from(
    new Set(materials.map((m) => m.assignedTo))
  ).sort();

  const formatDate = (dateString: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("de-DE", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const groupedByUser = filteredMaterials.reduce((acc, material) => {
    const user = material.assignedTo || "Unzugewiesen";
    if (!acc[user]) {
      acc[user] = [];
    }
    acc[user].push(material);
    return acc;
  }, {} as Record<string, Material[]>);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p>Lädt Materialien...</p>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen">
      <Sidebar user={user} activePage="materials" />

      <main className="flex-1 bg-white">
        <header className="border-b px-8 py-4">
          <div className="flex items-center text-sm text-gray-500">
            <span>$</span>
            <span className="mx-2">/</span>
            <span>Planori</span>
            <span className="mx-2">/</span>
            <span className="text-gray-900">Material</span>
          </div>
        </header>

        <div className="p-8">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-2xl flex items-center gap-2">
                    <Package className="h-6 w-6" />
                    Materialverwaltung
                  </CardTitle>
                  <p className="text-sm text-gray-500 mt-1">
                    Übersicht aller Materialien für kommende Aktivitäten (
                    {materials.length} Artikel)
                  </p>
                </div>
              </div>
            </CardHeader>

            <CardContent>
              <div className="mb-6 flex gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Suche nach Material oder Aktivität..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>

                <select
                  className="border border-gray-300 rounded-md px-4 py-2 bg-white"
                  value={filterUser}
                  onChange={(e) => setFilterUser(e.target.value)}
                >
                  <option value="all">Alle Verantwortlichen</option>
                  {uniqueUsers.map((user) => (
                    <option key={user} value={user}>
                      {user}
                    </option>
                  ))}
                </select>
              </div>

              {filteredMaterials.length === 0 ? (
                <div className="text-center py-12 text-gray-500">
                  <Package className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                  <p>Keine Materialien für kommende Aktivitäten gefunden</p>
                </div>
              ) : (
                <div className="space-y-8">
                  {Object.entries(groupedByUser).map(([userName, userMaterials]) => (
                    <div key={userName}>
                      <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center">
                          <span className="text-sm font-bold text-purple-700">
                            {userName.charAt(0).toUpperCase()}
                          </span>
                        </div>
                        {userName}
                        <span className="text-sm font-normal text-gray-500">
                          ({userMaterials.length} Artikel)
                        </span>
                      </h3>

                      <div className="border rounded-lg overflow-hidden">
                        <Table>
                          <TableHeader>
                            <TableRow className="bg-gray-50">
                              <TableHead className="w-12">Status</TableHead>
                              <TableHead className="w-24">Einheit</TableHead>
                              <TableHead>Material</TableHead>
                              <TableHead className="w-64">Aktivität</TableHead>
                              <TableHead className="w-32">Datum</TableHead>
                              <TableHead className="w-12"></TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {userMaterials.map((material, idx) => (
                              <TableRow
                                key={`${material.activityId}-${idx}`}
                                className="hover:bg-gray-50 cursor-pointer"
                                onClick={() =>
                                  router.push(`/activities/${material.activityId}`)
                                }
                              >
                                <TableCell>
                                  {material.checked ? (
                                    <CheckCircle className="h-5 w-5 text-green-500" />
                                  ) : (
                                    <Circle className="h-5 w-5 text-gray-300" />
                                  )}
                                </TableCell>
                                <TableCell className="font-medium">
                                  {material.unit}
                                </TableCell>
                                <TableCell>{material.item}</TableCell>
                                <TableCell className="text-sm text-gray-600">
                                  {material.activityName}
                                </TableCell>
                                <TableCell className="text-sm text-gray-500">
                                  {formatDate(material.activityDate)}
                                </TableCell>
                                <TableCell>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      router.push(`/activities/${material.activityId}`);
                                    }}
                                  >
                                  </Button>
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
