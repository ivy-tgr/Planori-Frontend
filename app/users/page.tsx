"use client";

import { useEffect, useState } from "react";
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
import { Edit, Trash2, UserPlus, AlertCircle } from "lucide-react";
import Sidebar from "@/components/Sidebar";

interface UserType {
  id: string;
  name: string;
  email: string;
  role: string;
  active: boolean;
}

export default function UsersPage() {
  const [users, setUsers] = useState<UserType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editingUser, setEditingUser] = useState<UserType | null>(null);
  const [form, setForm] = useState<{ name: string; email: string; role: string }>({
    name: "",
    email: "",
    role: "Leiter"
  });

  const fetchUsers = async () => {
    setLoading(true);
    setError(null);
    
    try {
      console.log('Fetching users from backend...');
      const response = await fetch("http://localhost:3000/api/users");
      
      console.log('Response status:', response.status);
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `HTTP ${response.status}`);
      }
      
      const data = await response.json();
      console.log('Received users:', data);
      setUsers(data);
    } catch (err: unknown) {
      console.error('Error fetching users:', err);
      const errorMessage =
        err instanceof Error
          ? err.message
          : typeof err === "string"
          ? err
          : "Fehler beim Laden der Benutzer";
      setError(errorMessage);
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleEdit = (user: UserType) => {
    setEditingUser(user);
    setForm({ name: user.name, email: user.email, role: user.role });
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Wirklich löschen?")) {
      try {
        const response = await fetch(`http://localhost:3000/api/users/${id}`, { 
          method: "DELETE" 
        });
        
        if (!response.ok) {
          throw new Error('Fehler beim Löschen');
        }
        
        await fetchUsers();
      } catch (err: unknown) {
        if (err instanceof Error) {
          alert(err.message);
        } else {
          alert("Fehler beim Löschen");
        }
      }
    }
  };

  const handleSave = async () => {
    try {
      if (editingUser) {
        const response = await fetch(`http://localhost:3000/api/users/${editingUser.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form)
        });
        
        if (!response.ok) {
          throw new Error('Fehler beim Aktualisieren');
        }
      } else {
        const response = await fetch("http://localhost:3000/api/users", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...form, active: true })
        });
        
        if (!response.ok) {
          throw new Error('Fehler beim Erstellen');
        }
      }
      
      setEditingUser(null);
      setForm({ name: "", email: "", role: "Leiter" });
      await fetchUsers();
    } catch (err: unknown) {
      if (err instanceof Error) {
        alert(err.message);
      } else {
        alert("Fehler beim Speichern");
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar user={null} activePage="users" />
      <main className="flex-1 bg-white">
        <header className="border-b px-8 py-4">
          <div className="flex items-center text-sm text-gray-500">
            <span>$</span>
            <span className="mx-2">/</span>
            <span>Planori</span>
            <span className="mx-2">/</span>
            <span className="text-gray-900">User Management</span>
          </div>
        </header>
        <div className="p-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-2">
                <UserPlus className="h-6 w-6" /> Benutzerverwaltung
              </CardTitle>
              <p className="text-sm text-gray-500 mt-1">
                Verwalte alle registrierten Benutzer ({users.length})
              </p>
            </CardHeader>
            <CardContent>
              {error && (
                <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-2">
                  <AlertCircle className="h-5 w-5 text-red-600 mt-0.5" />
                  <div>
                    <p className="font-medium text-red-900">Fehler beim Laden</p>
                    <p className="text-sm text-red-700">{error}</p>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={fetchUsers}
                      className="mt-2"
                    >
                      Erneut versuchen
                    </Button>
                  </div>
                </div>
              )}

              {!error && (
                <form 
                  onSubmit={e => { e.preventDefault(); handleSave(); }} 
                  className="flex gap-4 items-center mb-6 flex-wrap"
                >
                  <Input 
                    name="name" 
                    placeholder="Name" 
                    value={form.name} 
                    onChange={handleChange} 
                    required 
                  />
                  <Input 
                    type="email" 
                    name="email" 
                    placeholder="E-Mail" 
                    value={form.email} 
                    onChange={handleChange} 
                    required 
                  />
                  <select 
                    name="role" 
                    value={form.role} 
                    onChange={handleChange} 
                    className="border px-3 py-2 rounded"
                  >
                    <option value="lead">Leiter</option>
                    <option value="admin">Admin</option>
                  </select>
                  <Button type="submit">
                    {editingUser ? "Ändern" : "Hinzufügen"}
                  </Button>
                  {editingUser && (
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={() => setEditingUser(null)}
                    >
                      Abbrechen
                    </Button>
                  )}
                </form>
              )}

              <div className="border rounded-lg overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-gray-50">
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Rolle</TableHead>
                      <TableHead></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {loading ? (
                      <TableRow>
                        <TableCell colSpan={5} className="text-center py-8">
                          Lädt Benutzer...
                        </TableCell>
                      </TableRow>
                    ) : users.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={5} className="text-center py-8 text-gray-500">
                          Keine Benutzer gefunden
                        </TableCell>
                      </TableRow>
                    ) : (
                      users.map((user) => (
                        <TableRow key={user.id}>
                          <TableCell>{user.name}</TableCell>
                          <TableCell className="font-mono text-xs">
                            {user.email}
                          </TableCell>
                          <TableCell>
                            <span className="capitalize">{user.role}</span>
                          </TableCell>
                          <TableCell>
                            <div className="flex gap-1">
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                onClick={() => handleEdit(user)}
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                onClick={() => handleDelete(user.id)}
                              >
                                <Trash2 className="h-4 w-4 text-red-500" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
