import { homes } from "@/constants/types";

export function useCloudinaryImages(name: homes) {
  const imageURL = `https://res.cloudinary.com/dfiajcza3/image/upload/${name}.jpg`;

  return { imageURL };
}
