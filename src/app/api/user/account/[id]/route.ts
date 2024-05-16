import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { Estado } from "@/interfaces";

async function getAccountData(
  request: Request,
  { params }: { params: { id: string } },
  req: NextRequest,
  res: NextResponse
) {
  if (!params.id)
    return NextResponse.json(
      { message: "Falta Id del usuario" },
      { status: 400 }
    );

  const account = await prisma.m_user.findUnique({
    where: {
      id: params.id,
    },
  });
  if (!account)
    return NextResponse.json(
      { message: "No existe usuario por ese id" },
      { status: 400 }
    );
  return NextResponse.json({ ...account }, { status: 200 });
}

async function updateAccountData(
  request: Request,
  { params }: { params: { id: string } },
  req: NextRequest,
  res: NextResponse
) {
  const { email, password, estado } = (await new Response(
    request.body
  ).json()) as {
    email: string;
    password: string;
    estado: string;
  };

  if (!params.id)
    return NextResponse.json(
      { message: "Falta Id del usuario" },
      { status: 400 }
    );

  const account = await prisma.m_user.update({
    where: {
      id: params.id,
    },
    data: {
      email,
      password,
      estado: estado as Estado,
    },
  });

  return NextResponse.json({ ...account }, { status: 200 });
}

export { getAccountData as GET, updateAccountData as PUT };
