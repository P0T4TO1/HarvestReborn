import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import prisma from '@/lib/prisma';
import { Category } from '@/interfaces';
import {
  validateUpdateProduct,
  validateCreateProduct,
} from '@/validations/admin.validation';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/authOptions';

async function createProduct(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json(
      {
        error: 'Unauthorized',
        message: 'You need to be signed in to view the protected content.',
      },
      { status: 401 }
    );
  }
  try {
    const body = await req.json();

    const { categoria, descripcion, enTemporada, file, nombre_producto } =
      validateCreateProduct(body);

    const product = await prisma.m_producto.create({
      data: {
        nombre_producto,
        imagen_producto: file,
        descripcion: descripcion || '',
        enTemporada,
        categoria: categoria.toUpperCase() as Category,
      },
    });

    return NextResponse.json(product, { status: 200 });
  } catch (error) {
    console.log(error, 'error al crear el producto');
    return NextResponse.json(
      { message: 'Error al crear el producto' },
      { status: 500 }
    );
  }
}

async function updateProduct(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json(
      {
        error: 'Unauthorized',
        message: 'You need to be signed in to view the protected content.',
      },
      { status: 401 }
    );
  }
  try {
    const body = await req.json();
    const { id, nombre_producto, file, descripcion, enTemporada, categoria } =
      validateUpdateProduct(body);

    const product = await prisma.m_producto.update({
      where: {
        id_producto: id,
      },
      data: {
        nombre_producto,
        imagen_producto: file,
        descripcion: descripcion || '',
        enTemporada,
        categoria: categoria?.toUpperCase() as Category,
      },
    });

    revalidatePath(`/`);

    return NextResponse.json(product, { status: 200 });
  } catch (error) {
    console.log(error, 'error al validar los datos');
    return NextResponse.json(
      { message: 'Error al validar los datos' },
      { status: 500 }
    );
  }
}

async function deleteProduct(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json(
      {
        error: 'Unauthorized',
        message: 'You need to be signed in to view the protected content.',
      },
      { status: 401 }
    );
  }
  const { id } = (await req.json()) as { id: string };

  if (!id) {
    return NextResponse.json(
      { message: 'Falta Id del producto' },
      { status: 400 }
    );
  }

  try {
    const product = await prisma.m_producto.delete({
      where: {
        id_producto: parseInt(id, 10),
      },
    });

    return NextResponse.json(product, { status: 200 });
  } catch (error) {
    console.log(error, 'error al eliminar el producto');
    return NextResponse.json(
      { message: 'Error al eliminar el producto' },
      { status: 500 }
    );
  }
}

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json(
      {
        error: 'Unauthorized',
        message: 'You need to be signed in to view the protected content.',
      },
      { status: 401 }
    );
  }
  const products = await prisma.m_producto.findMany();

  return NextResponse.json(products, { status: 200 });
}

export { createProduct as POST, updateProduct as PUT, deleteProduct as DELETE };
