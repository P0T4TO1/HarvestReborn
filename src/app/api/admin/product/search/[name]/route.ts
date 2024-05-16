import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

async function searchProductByName(
  request: Request,
  { params }: { params: { name: string } },
  req: NextRequest,
  res: NextResponse
) {
  try {
    if (!params.name) {
      return NextResponse.json(
        {
          error: "Internal Server Error",
          message: "No se ha enviado el nombre",
        },
        { status: 200 }
      );
    }

    const product = await prisma.m_producto.findFirst({
      where: {
        nombre_producto: params.name,
      },
    });
    const removeAccents = (str: string) => {
      return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    };

    if (product) {
      const nameToLowerCase = params.name.toLowerCase();
      const productNameToLowerCase = product.nombre_producto.toLowerCase();
      const nameWithoutAccents = removeAccents(nameToLowerCase);
      const productNameWithoutAccents = removeAccents(productNameToLowerCase);
      if (nameWithoutAccents === productNameWithoutAccents) {
        return NextResponse.json(
          {
            error: "Internal Server Error",
            message: "Este producto ya esta registrado",
          },
          { status: 200 }
        );
      }
    }

    return NextResponse.json(
      { product, message: "No existe el producto" },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        error: "Internal Server Error",
        message: "Error al buscar el producto",
      },
      { status: 500 }
    );
  }
}

export { searchProductByName as GET };
