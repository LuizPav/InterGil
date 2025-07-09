import { useEffect, useState } from "react";
import { auth } from "@/src/firebaseConnection";
import { onAuthStateChanged, User } from "firebase/auth";

type AuthState = {
  user: User | null;
  isLoading: boolean;
};

export function useAuthUser(): AuthState {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setIsLoading(false);
      return () => unsub();
    });
  }, []);
  return { user, isLoading };
}
