import { onAuthStateChanged, signOut, User } from "firebase/auth";
import {
  useEffect,
  useState,
  createContext,
  ReactNode,
  useContext,
} from "react";
import { UserData } from "@/src/types";
import { auth, db } from "../firebaseConnection";
import { doc, getDoc } from "firebase/firestore";

type authContextData = {
  user: User | null;
  isLoading: boolean;
  userData: UserData | null;
  logout: () => Promise<void>;
};

export const AuthContext = createContext<authContextData>(
  {} as authContextData
);

export function AuthUserContextProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState<UserData | null>(null);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (currentUser) => {
      if (!currentUser) {
        setUser(null);
        setUserData(null);
        setIsLoading(false);
        return;
      }

      setUser(currentUser);

      try {
        const docRef = doc(db, "Users", currentUser.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setUserData(docSnap.data() as UserData);
        } else {
          console.log("Documento do usuário não encontrado no Firestore.");
          setIsLoading(false);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    });

    return () => unsub();
  }, []);

  const logout = async () => {
    await signOut(auth);
    setUser(null);
    setUserData(null);
  };

  return (
    <AuthContext.Provider value={{ user, userData, isLoading, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthUser() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthUser deve ser usado dentro de AuthUserContext");
  }
  return context;
}
