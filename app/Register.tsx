import { Image, ScrollView, Text, View, TouchableOpacity } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { Picker } from "@react-native-picker/picker";
import { useState } from "react";

import { db } from "@/src/firebaseConnection";
import {
  collection,
  doc,
  DocumentReference,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { auth } from "@/src/firebaseConnection";
import { createUserWithEmailAndPassword } from "firebase/auth";

import LoginField from "@/components/LoginField";
import { series } from "@/src/types";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [matricula, setMatricula] = useState("");
  const [currentHouse, setCurrentHouse] = useState("");
  const [houseRef, setHouseRef] = useState<DocumentReference>();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  async function handleRegister() {
    if (!name || !matricula || !currentHouse || !password || !confirmPassword) {
      alert("Preencha todos os campos!");
      return;
    } else if (!houseRef) {
      alert("Selecione uma casa válida!");
      return;
    }

    if (password !== confirmPassword) {
      alert("As senhas não coincidem!");
      return;
    }

    if (email === "" || !email.includes("@")) {
      alert("Insira um email válido!");
      return;
    }

    setIsLoading(true);

    try {
      const validation = await getValidMatricula(matricula.trim());
      if (!validation.valid) {
        setIsLoading(false);
        return;
      }

      const userCredentials = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const uid = userCredentials.user.uid;
      // console.log(user);

      const userDocRef = doc(db, "Users", uid);

      await setDoc(userDocRef, {
        name: name.trim(),
        email: email.trim(),
        matricula: matricula.trim(),
        house: houseRef,
        password: password,
        admin: validation.isAdmin,
      });

      alert("Cadastro realizado com sucesso!");
      router.replace("/Login");
    } catch (error) {
      console.error("Erro ao criar usuário:", error);
      alert("Erro ao criar usuário. Tente novamente mais tarde.");
    } finally {
      setIsLoading(false);
    }
  }

  const getHouse = async (house: string) => {
    try {
      const parts = house.split(" ");

      if (parts.length < 2) return;

      const selectedCurso = parts[1];
      const selectedAno = parts[0];

      const docRef = collection(db, "Houses");
      const q = query(
        docRef,
        where("Ano", "==", parseInt(selectedAno)),
        where("Curso", "==", selectedCurso)
      );
      const snap = await getDocs(q);

      if (!snap.empty) {
        console.log(snap.docs[0].data().Name);
        return setHouseRef(snap.docs[0].ref);
      } else {
        throw new Error("Casa não encontrada!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getValidMatricula = async (
    currentMatricula: string
  ): Promise<{
    valid: boolean;
    isAdmin: boolean;
  }> => {
    try {
      const usersRef = collection(db, "Users");
      const qUsers = query(
        usersRef,
        where("matricula", "==", currentMatricula)
      );
      const usersSnap = await getDocs(qUsers);

      if (!usersSnap.empty) {
        alert("Esta matrícula já possui uma conta cadastrada!");
        return { valid: false, isAdmin: false };
      }

      const matriculasRef = collection(db, "Matriculas");
      const qMatriculas = query(
        matriculasRef,
        where("Matricula", "==", currentMatricula)
      );
      const matriculasSnap = await getDocs(qMatriculas);

      if (matriculasSnap.empty) {
        alert("Matrícula não encontrada no sistema.");
        return { valid: false, isAdmin: false };
      }
      const data = matriculasSnap.docs[0].data();
      if (data.Name.trim().toLowerCase() === name.trim().toLowerCase()) {
        const isAdmin = data.Admin === true;

        return { valid: true, isAdmin: isAdmin };
      } else {
        alert("O nome digitado não corresponde à matrícula informada.");
        return { valid: false, isAdmin: false };
      }
    } catch (error) {
      console.log("Erro na validação:", error);
      return { valid: false, isAdmin: false };
    }
  };

  const cursosOptions = Object.values(series);

  return (
    <SafeAreaView className="flex-1 bg-base">
      <ScrollView>
        <View className="flex flex-row justify-start ml-8 mt-10">
          <TouchableOpacity onPress={() => router.back()}>
            <FontAwesome5
              name="arrow-alt-circle-left"
              size={50}
              color="white"
            />
          </TouchableOpacity>
        </View>
        <Image
          source={require("@/assets/images/intergilAppLogo.png")}
          className="w-[70%] h-[250px] mx-auto mb-16"
        />
        <View className="flex-1">
          <Text className="font-horizon text-4xl text-white ml-8 mb-10">
            Cadastro
          </Text>
          <View>
            <LoginField
              type="default"
              placeholder="Nome Completo"
              onTextChange={setName}
              value={name}
            />
            <LoginField
              type="email-address"
              placeholder="Email"
              onTextChange={setEmail}
              value={email}
            />
            <LoginField
              type="default"
              placeholder="Matrícula"
              onTextChange={setMatricula}
              value={matricula}
            />
            <View className="w-[90%] h-[50px] bg-white rounded-lg mx-auto my-2">
              <Picker
                style={{
                  width: "98%",
                  height: 48,
                  backgroundColor: "white",
                  color: "#081736",
                  marginHorizontal: "auto",
                  fontWeight: "bold",
                }}
                dropdownIconColor={"#000"}
                selectedValue={currentHouse}
                onValueChange={(itemValue) => {
                  setCurrentHouse(itemValue);
                  getHouse(itemValue);
                }}
              >
                <Picker.Item
                  label="Selecione sua turma"
                  value={null}
                  color="#D9D9D9"
                  enabled={false}
                />
                {cursosOptions.map((item) => (
                  <Picker.Item key={item} label={item} value={item} />
                ))}
              </Picker>
            </View>
            <LoginField
              type="default"
              placeholder="Senha"
              onTextChange={setPassword}
              value={password}
              secureTextEntry={true}
            />
            <LoginField
              type="default"
              placeholder="Confirme a Senha"
              onTextChange={setConfirmPassword}
              value={confirmPassword}
              secureTextEntry={true}
            />
          </View>
          <TouchableOpacity
            onPress={handleRegister}
            disabled={isLoading}
            className="bg-[#5271FF] w-[40%] h-[50px] rounded-lg items-center justify-center mx-auto mb-10 mt-5"
          >
            <Text className="text-white font-bold text-lg font-clearSans">
              Criar conta
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
