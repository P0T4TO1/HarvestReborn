import { Category } from "@/interfaces";

interface IProduct {
  nombre_producto: string;
  imagen_producto: string;
  descripcion?: string;
  enTemporada: boolean;
  categoria: Category;
}

interface seedData {
  products: IProduct[];
}

export const initialData: seedData = {
  products: [
    {
      nombre_producto: "Jitomate",
      imagen_producto: "jitomate.png",
      descripcion: "Jitomate rojo",
      enTemporada: true,
      categoria: Category.VERDURA,
    },
    {
      nombre_producto: "Pepino",
      imagen_producto: "/images/products/pepino.png",
      descripcion: "Pepino verde",
      enTemporada: true,
      categoria: Category.VERDURA,
    },
    {
      nombre_producto: "Calabaza",
      imagen_producto: "/images/products/calabaza.png",
      descripcion: "Calabaza naranja",
      enTemporada: true,
      categoria: Category.VERDURA,
    },
    {
      nombre_producto: "Papa",
      imagen_producto: "/images/products/papa.png",
      descripcion: "Papa blanca",
      enTemporada: true,
      categoria: Category.VERDURA,
    },
    {
      nombre_producto: "Cebolla",
      imagen_producto: "/images/products/cebolla.png",
      descripcion: "Cebolla blanca",
      enTemporada: true,
      categoria: Category.VERDURA,
    },
    {
      nombre_producto: "Cebolla Morada",
      imagen_producto: "/images/products/cebolla_morada.png",
      descripcion: "Cebolla morada",
      enTemporada: true,
      categoria: Category.VERDURA,
    },
    {
      nombre_producto: "Chile Serrano",
      imagen_producto: "/images/products/chile_serrano.png",
      descripcion: "Chile Serrano",
      enTemporada: true,
      categoria: Category.VERDURA,
    },
    {
      nombre_producto: "Elote",
      imagen_producto: "/images/products/elote.png",
      descripcion: "Elote amarillo",
      enTemporada: true,
      categoria: Category.VERDURA,
    },
    {
      nombre_producto: "Espinaca",
      imagen_producto: "/images/products/espinaca.png",
      descripcion: "Espinaca verde",
      enTemporada: true,
      categoria: Category.VERDURA,
    },
    {
      nombre_producto: "Lechuga Romana",
      imagen_producto: "/images/products/lechuga_romana.png",
      descripcion: "Lechuga verde",
      enTemporada: true,
      categoria: Category.VERDURA,
    },
    {
      nombre_producto: "Lechuga Orejona",
      imagen_producto: "/images/products/lechuga_orejona.png",
      descripcion: "Lechuga verde",
      enTemporada: true,
      categoria: Category.VERDURA,
    },
    {
      nombre_producto: "Zanahoria",
      imagen_producto: "/images/products/zanahoria.png",
      descripcion: "Zanahoria naranja",
      enTemporada: true,
      categoria: Category.VERDURA,
    },
    {
      nombre_producto: "Brócoli",
      imagen_producto: "/images/products/brocoli.png",
      descripcion: "Brócoli verde",
      enTemporada: true,
      categoria: Category.VERDURA,
    },
  ],
};
