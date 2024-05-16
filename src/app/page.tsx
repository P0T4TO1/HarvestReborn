import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { redirect } from "next/navigation";
import {
  ServicesComponent,
  AboutUsComponent,
  NavbarComponent,
  Footer,
  HeroSection,
} from "@/components";

const LandingPage = async () => {
  const session = await getServerSession(authOptions);
  if (session) redirect("/home");
  return (
    <>
      <NavbarComponent />
      <HeroSection />
      <ServicesComponent />
      <AboutUsComponent />
      <Footer />
    </>
  );
};

export default LandingPage;
