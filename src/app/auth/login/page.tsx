import { Footer, LoginForm, NavbarComponent } from "@/components";
import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const LoginPage = async () => {
  const session = await getServerSession(authOptions);
  if (session?.user.id_rol === 1) redirect("/admin/dashboard");
  if (session) redirect("/home");

  return (
    <>
      <LoginForm />
    </>
  );
};

export default LoginPage;
