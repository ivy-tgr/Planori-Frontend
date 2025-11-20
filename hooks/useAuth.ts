import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { User, onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebase";

interface UseAuthOptions {
  requireAuth?: boolean;
  redirectTo?: string;
}

export function useAuth({ 
  requireAuth = false, 
  redirectTo = "/login" 
}: UseAuthOptions = {}) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);

      if (requireAuth && !currentUser) {
        router.push(redirectTo);
      }
    });

    return () => unsubscribe();
  }, [requireAuth, redirectTo, router]);

  return { user, loading };
}