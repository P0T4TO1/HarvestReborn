import axios from "axios";
import { ILote } from "@/interfaces";

export const getBatchsDistinct = async (id_negocio: number) => {
  if (!id_negocio) return;

  try {
    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/store/inventory/batch/all/distinct/${id_negocio}?api_key=${process.env.API_KEY}`
    );

    return data as unknown as ILote[];
  } catch (error) {
    console.error(error);
    return;
  }
};
