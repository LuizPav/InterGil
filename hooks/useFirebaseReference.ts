import { db } from "@/src/firebaseConnection";
import { house } from "@/src/types";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";

export function useFirebaseReference(ref: string | undefined) {
  const [data, setData] = useState<house>();
  const [isLoading, setIsLoading] = useState(!!ref);

  console.log(`HOOK chamado na rota ${ref}`);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!ref) {
          setIsLoading(false);
          return;
        }
        const document = doc(db, ref);
        const snap = await getDoc(document);
        if (snap.exists()) {
          const houseData = snap.data() as house;
          setData(houseData);
          console.log(`House data fetched: ` + houseData);
        } else {
          throw new Error("Document does not exist");
        }
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [ref]);
  return { data, isLoading };
}
