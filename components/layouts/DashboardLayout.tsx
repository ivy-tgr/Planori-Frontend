import { ReactNode } from "react";
import { User } from "firebase/auth";
import Sidebar from "../Sidebar";

interface DashboardLayoutProps {
  children: ReactNode;
  user: User | null;
  activePage?: "dashboard" | "activities" | "programs" | "materials" | "users";
}

export function DashboardLayout({ 
  children, 
  user, 
  activePage 
}: DashboardLayoutProps) {
  return (
    <div className="flex min-h-screen">
      <Sidebar user={user} activePage={activePage} />
      <main className="flex-1 bg-white">
        {children}
      </main>
    </div>
  );
}