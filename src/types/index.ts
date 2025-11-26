import { icons } from "@/constants/icons";

export interface UserData {
  admin: boolean;
  email: string;
  name: string;
  matricula: string;
  house: string;
}

export type IconsKeys = keyof typeof icons;
