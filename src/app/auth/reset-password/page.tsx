import { ChangePasswordForm, ResetPasswordForm } from "@/components";
import prisma from "@/lib/prisma";
import React from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { redirect } from "next/navigation";

interface ResetPasswordPageProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

const ResetPasswordPage = async ({ searchParams }: ResetPasswordPageProps) => {
  const session = await getServerSession(authOptions);
  if (session) redirect("/home");
  if (searchParams.token) {
    const user = await prisma.m_user.findUnique({
      where: {
        resetPasswordToken: searchParams.token as string,
      },
    });
    if (!user) {
      return (
        <section className="relative min-h-screen sm:flex sm:flex-row justify-center bg-transparent">
          <div className="flex justify-center self-center z-10 shadow-xl">
            <div className="p-12 bg-white mx-auto rounded-3xl w-[386px]">
              <div className="mb-7">
                <h3 className="font-semibold text-2xl text-gray-800">
                  Token de verificación inválido
                </h3>
              </div>
            </div>
          </div>
        </section>
      );
    }

    return (
      <ChangePasswordForm resetPasswordToken={searchParams.token as string} />
    );
  } else {
    return <ResetPasswordForm />;
  }
};

export default ResetPasswordPage;
