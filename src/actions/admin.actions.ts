import axios, { AxiosError } from "axios";
import { IPublicacion } from "@/interfaces";

export const getAllPublications = async () => {
  try {
    const { data } = await axios.get<IPublicacion[]>(
      `${process.env.NEXT_PUBLIC_API_URL}/publications?api_key=${process.env.API_KEY}`
    );
    return data as unknown as IPublicacion[];
  } catch (error) {
    if (error instanceof AxiosError) {
      console.error(error.response?.data);
      return;
    }
    console.error(error);
    return;
  }
};
