import { NextAuthOptions, getServerSession } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import { compare } from "bcrypt";
import prisma from "@/lib/prisma";
import { oAuthToDb } from "@/actions";

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,

  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 días
  },

  pages: {
    signIn: "/auth/login",
    newUser: "/auth/register",
    error: "/auth/login",
  },

  providers: [
    CredentialsProvider({
      name: "Credentials",

      credentials: {
        user_email: {
          label: "Email",
          type: "email",
        },
        user_password: {
          label: "Password",
          type: "password",
        },
      },

      async authorize(credentials) {
        try {
          if (!credentials) return null;

          const email = credentials.user_email?.trim().toLowerCase();
          const password = credentials.user_password;

          if (!email || !password) return null;

          const user = await prisma.m_user.findUnique({
            where: { email },
          });

          if (!user) return null;

          // Usuario OAuth sin password local
          if (!user.password) return null;

          const validPassword = await compare(password, user.password);

          if (!validPassword) return null;

          if (!user.emailVerified) return null;

          // Admin
          if (user.id_rol === 1) {
            return user;
          }

          // Dueño negocio
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

            return {
              ...user,
              duenonegocio,
            };
          }

          // Cliente
          if (user.id_rol === 3) {
            const cliente = await prisma.d_cliente.findFirst({
              where: {
                id_user: user.id,
              },
              include: {
                historial: true,
              },
            });

            return {
              ...user,
              cliente,
            };
          }

          return user;
        } catch (error) {
          console.error("Authorize error:", error);
          return null;
        }
      },
    }),

    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),

    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID!,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET!,
    }),
  ],

  callbacks: {
    async jwt({ token, user, account, profile }) {
      try {
        // Login inicial
        if (account) {
          token.provider = account.provider;

          if (account.access_token) {
            token.accessToken = account.access_token;
          }

          // OAuth
          if (account.type === "oauth") {
            let dbUser;

            if (account.provider === "google") {
              dbUser = await oAuthToDb(
                user?.email || "",
                user?.name || "",
                account.providerAccountId,
                // @ts-ignore
                profile?.given_name || "",
                // @ts-ignore
                profile?.family_name || ""
              );
            } else {
              dbUser = await oAuthToDb(
                user?.email || "",
                user?.name || ""
              );
            }

            token.user = dbUser;
          }

          // Credentials
          if (account.type === "credentials") {
            token.user = user;
          }
        }

        return token;
      } catch (error) {
        console.error("JWT callback error:", error);
        return token;
      }
    },

    async session({ session, token }) {
      try {
        if (token.user) {
          session.user = token.user as any;
        }

        // @ts-ignore
        session.accessToken = token.accessToken;

        return session;
      } catch (error) {
        console.error("Session callback error:", error);
        return session;
      }
    },

    async redirect({ url, baseUrl }) {
      // Seguridad redirects
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      if (url.startsWith(baseUrl)) return url;
      return baseUrl;
    },
  },

  debug: process.env.NODE_ENV === "development",
};

export const getSession = () => getServerSession(authOptions);