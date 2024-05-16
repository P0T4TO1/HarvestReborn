import { RegisterForm } from "@/components";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { redirect } from "next/navigation";

interface RegisterPageProps {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
}

const Register = async ({ searchParams }: RegisterPageProps) => {
  const session = await getServerSession(authOptions);
  if (searchParams.oauth === "true") {
    if (!session) redirect("/auth/login");
    const user = session?.user;

    return <RegisterForm user={user} />;
  }
  if (session) redirect("/home");

  return <RegisterForm />;
};

export default Register;
