import { useState, useEffect } from "react";
import { useAuthUser } from "./useAuthUser";

import { getDoc, doc } from "firebase/firestore";
import { db } from "@/src/firebaseConnection";

import { UserData } from "@/src/types";

type AdminAuthState = {
  adminUser: boolean | null;
  isLoading: boolean;
};

export function useAdminUser(): AdminAuthState {
  const [adminUser, setAdminUser] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const { user, isLoading: AuthLoading } = useAuthUser();

  useEffect(() => {
    const checkAdminStatus = async () => {
      if (AuthLoading) {
        setIsLoading(true);
        setAdminUser(null);
        return;
      }
      if (user) {
        try {
          const userDocRef = doc(db, "Users", user.uid);
          const userDoc = await getDoc(userDocRef);
          if (userDoc.exists()) {
            const userData = userDoc.data() as UserData;
            setAdminUser(userData.admin || false);
          } else {
            setAdminUser(false);
          }
        } catch (err) {
          console.error("Error fetching admin status:", err);
          setAdminUser(false);
        } finally {
          setIsLoading(false);
        }
      }
    };
    checkAdminStatus();
  }, [user, AuthLoading]);

  return { adminUser, isLoading };
}
