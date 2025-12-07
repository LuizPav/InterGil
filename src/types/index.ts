import { icons } from "@/constants/icons";
import { DocumentReference } from "firebase/firestore";

export interface UserData {
  admin: boolean;
  email: string;
  name: string;
  matricula: string;
  house: DocumentReference;
}

export type house = {
  Name: string;
  Ano: number;
  Curso: string;
};

export type IconsKeys = keyof typeof icons;

export enum homes {
  // 3º ANO
  Hunters = "Hunters",
  Imperiais = "Imperiais",
  Extreme = "Extreme",
  Alatares = "Alatares",

  // 2º ANO
  Atlantis = "Atlantis",
  Ardharia = "Ardharia",
  Midgard = "Midgard",
  Monarcas = "Monarcas",

  // 1º ANO
  Spartta = "Spartta",
  Arcania = "Arcania",
  Valhalla = "Valhalla",
  Electra = "Electra",
}

export enum modalidades {}
