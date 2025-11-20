"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { auth } from "@/lib/firebase";
import { signOut, User } from "firebase/auth";

interface SidebarProps {
  user: User | null;
  activePage?: "dashboard" | "activities" | "programs" | "materials" | "users";
}

export default function Sidebar({ user, activePage = "dashboard" }: SidebarProps) {
  const router = useRouter();

  const handleLogout = async () => {
    await signOut(auth);
    localStorage.removeItem("authToken");
    router.push("/login");
  };

  const navItems = [
    { id: "dashboard", label: "Übersicht", path: "/dashboard" },
    { id: "activities", label: "Aktivitäten", path: "/activities" },
    { id: "programs", label: "Quartals Programme", path: "/programs" },
    { id: "materials", label: "Material", path: "/materials" },
  ];

  return (
    <aside className="w-64 bg-purple-50 border-r p-6 flex flex-col">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Planori</h1>
      </div>

      <nav className="flex-1 space-y-2">
        {navItems.map((item) => (
          <Button
            key={item.id}
            variant={activePage === item.id ? "secondary" : "ghost"}
            className={`w-full justify-start ${
              activePage === item.id ? "bg-purple-200" : ""
            }`}
            onClick={() => router.push(item.path)}
          >
            {item.label}
          </Button>
        ))}

        <div className="pt-4 mt-4 border-t">
          <p className="text-xs text-gray-500 mb-2">Administration</p>
          <Button
            variant={activePage === "users" ? "secondary" : "ghost"}
            className={`w-full justify-start ${
              activePage === "users" ? "bg-purple-200" : ""
            }`}
            onClick={() => router.push("/users")}
          >
            User Management
          </Button>
        </div>
      </nav>

      <div className="mt-auto border-t pt-4">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-8 h-8 rounded-full bg-purple-300 flex items-center justify-center">
            <span className="text-sm font-semibold text-white">
              {user?.email?.[0].toUpperCase() || "?"}
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">admin</p>
            <p className="text-xs text-gray-500 truncate">{user?.email || "Not logged in"}</p>
          </div>
        </div>
        <Button
          variant="ghost"
          size="sm"
          className="w-full justify-start text-red-600"
          onClick={handleLogout}
        >
          <LogOut className="mr-2 h-4 w-4" />
          Logout
        </Button>
      </div>
    </aside>
  );
}
