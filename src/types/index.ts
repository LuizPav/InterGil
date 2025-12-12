import { icons } from "@/constants/icons";
import { DocumentReference, Timestamp } from "firebase/firestore";

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
  InstagramURL: string;
};

export type IconsKeys = keyof typeof icons;

export enum series {
  Spartta = "1 AADM",
  Arcania = "1 ADS",
  Electra = "1 BADM",
  Valhalla = "1 BDS",
  Midgard = "2 AADM",
  Monarcas = "2 ADS",
  Atlantis = "2 BADM",
  Ardharia = "2 BDS",
  Hunters = "3 AADM",
  Imperiais = "3 ADS",
  Extreme = "3 BADM",
  Alatares = "3 BDS",
}

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

export enum egressos {
  InfinityJewels = "InfinityJewels",
  Infernais = "Infernais",
  BlueStorm = "BlueStorm",
}

export interface confronto {
  id: string;
  modalidade: string;
  timeA: homes;
  timeB: homes;
  placarA?: number;
  placarB?: number;
  vencedor?: homes;
  data: Timestamp;
  local: string;
  status: "agendado" | "andamento" | "finalizado";
}

export enum modalidades {
  volei = "Volei",
  voleimesa = "Volei Mesa",
  basquete = "Basquete",
  futsal = "Futsal",
  futmesa = "Futsal Mesa Solo",
  futmesadupla = "Futsal Mesa Dupla",
  quadrado = "Quadrado",
  quadradoF = "Quadrado Feminino",
  queimado = "Queimado",
  pingpong = "Ping Pong",
  freefire = "Free Fire",
  wildrift = "LOL Wild Rift",
  lol = "LOL",
  cubo3 = "Cubo Magico 3x3",
  cubo2 = "Cubo Magico 2x2",
  domino = "Domino",
  uno = "Uno",
  atletismo100 = "Atletismo 100m",
  atletismo200 = "Atletismo 200m",
  atletismo1000 = "Atletismo 1KM",
  atletismo100F = "Atletismo 100m Feminino",
  atletismo200F = "Atletismo 200m Feminino",
  atletismo1000F = "Atletismo 1KM Feminino",
  calistenia = "Calistenia",
  calisteniaF = "Calistenia Feminina",
  revezamento = "Atletismo Revezamento",
  rpg = "RPG",
  cardgame = "Card Game",
  cosplay = "Cosplay",
  fifa = "FIFA",
  clashroyale = "Clash Royale",
  brawlstars = "Brawl Stars",
}

export enum locais {
  sala1 = "Sala 1",
  sala2 = "Sala 2",
  sala3 = "Sala 3",
  sala4 = "Sala 4",
  sala5 = "Sala 5",
  sala6 = "Sala 6",
  sala7 = "Sala 7",
  sala8 = "Sala 8",
  sala9 = "Sala 9",
  sala10 = "Sala 10",
  sala11 = "Sala 11",
  sala12 = "Sala 12",
  quadra = "Quadra",
  biblioteca = "Biblioteca",
  subsequente = "Subsequente",
  pistadecorrida = "Pista de Corrida",
}

export type champions = {
  Name: homes;
  Ano: number;
  Curso: string;
};
