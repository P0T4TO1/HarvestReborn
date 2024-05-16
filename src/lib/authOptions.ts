import { NextAuthOptions, getServerSession } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import prisma from "@/lib/prisma";
import { compare } from "bcrypt";
import { oAuthToDb } from "@/actions";
import { access } from "fs";

const getDomainWithoutSubdomain = (url: string) => {
  const urlParts = new URL(url).hostname.split(".");

  return urlParts
    .slice(0)
    .slice(-(urlParts.length === 4 ? 3 : 2))
    .join(".");
};

const useSecureCookies = process.env.NEXTAUTH_URL
  ? process.env.NEXTAUTH_URL.startsWith("https://")
  : false;
const cookiePrefix = useSecureCookies ? "__Secure-" : "";
const hostName = process.env.NEXTAUTH_URL
  ? getDomainWithoutSubdomain(process.env.NEXTAUTH_URL)
  : "localhost";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      credentials: {
        user_email: {
          label: "Email",
          type: "email",
          placeholder: "example@gmail.com",
        },
        user_password: {
          label: "Password",
          type: "password",
          placeholder: "Password",
        },
      },
      async authorize(credentials) {
        if (!credentials) return null;

        const { user_email, user_password } = credentials;
        if (!user_email || !user_password) return null;

        const user = await prisma.m_user.findUnique({
          where: {
            email: user_email,
          },
        });
        if (!user) return null;

        const passwordCorrect = await compare(user_password, user.password);
        if (!passwordCorrect) return null;

        const emailVerified = user.emailVerified;
        if (!emailVerified) return null;

        if (user.id_rol === 2) {
          const duenonegocio = await prisma.d_duenonegocio.findFirst({
            where: {
              id_user: user.id,
            },
            include: {
              negocio: {
                include: {
                  historial: true,
                  inventario: {
                    select: {
                      id_inventario: true,
                    },
                  },
                },
              },
            },
          });
          return { ...user, duenonegocio };
        } else if (user.id_rol === 3) {
          const cliente = await prisma.d_cliente.findFirst({
            where: {
              id_user: user.id,
            },
            include: {
              historial: true,
            },
          });
          return { ...user, cliente };
        }
        return user;
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID || "",
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET || "",
    }),
  ],
  callbacks: {
    async jwt({ token, user, account, profile }) {
      if (account) {
        token.accessToken = account.access_token;
        switch (account.type) {
          case "oauth":
            if (account.provider === "google") {
              user = await oAuthToDb(
                user?.email || "",
                user?.name || "",
                account.providerAccountId || "",
                // @ts-ignore
                profile?.given_name || "",
                // @ts-ignore
                profile?.family_name || ""
              );
              token.user = user;
            } else {
              user = await oAuthToDb(user?.email || "", user?.name || "");
              token.user = user;
            }
            break;
          case "credentials":
            token.user = user;
            break;
        }
      }
      return token;
    },
    async session({ session, token }) {
      // @ts-ignore
      session.accessToken = token.accessToken;
      session.user = token.user as any;
      return session;
    },
  },
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/auth/login",
    newUser: "/auth/register",
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === "development",
  useSecureCookies,
  cookies: {
    sessionToken: {
      name: `${cookiePrefix}next-auth.session-token`,
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: useSecureCookies,
        domain: hostName == "localhost" ? hostName : "." + hostName, // add a . in front so that subdomains are included
      },
    },
  },
};

export const getSession = () => getServerSession(authOptions);
