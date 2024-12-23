import NextAuth, { Session, SessionStrategy } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import prisma from "./db";
import { JWT } from "next-auth/jwt";
import bcrypt from "bcryptjs";

type CredentialsType = {
  username: string;
  password: string;
};

export const authOptions = NextAuth({
  providers: [
    Credentials({
      credentials: {
        username: { type: "text", placeholder: "username" },
        password: { type: "password", placeholder: "password" },
      },
      authorize: async (credentials: CredentialsType | undefined) => {
        if (!credentials) {
          console.error("Please provide the credentials!");
          return null;
        }
        try {
          if (!credentials.password || !credentials.username) {
            throw new Error("Missing fields!");
          }

          const user = await prisma.user.findUnique({
            where: {
              username: credentials.username,
            },
            select: { id: true, username: true, password: true },
          });

          if (!user) throw new Error("User not found!");

          const isValid = await bcrypt.compare(
            credentials.password,
            user.password
          );

          if (!isValid) throw new Error("Wrong password!");

          return {
            id: user.id,
            username: user.username,
          };
        } catch (error) {
          console.warn("Authorization error");
          console.error(error);
          return null;
        }
      },
    }),
  ],
  session: { strategy: "jwt" as SessionStrategy },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, user }): Promise<JWT> {
      if (user) {
        token.username = user.username, 
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }): Promise<Session> {
      if (token) {
        session.user.username = token.username
        session.user.id = token.id;
      }
      return session;
    },
  },
});

export const GET = NextAuth(authOptions);
export const POST = NextAuth(authOptions);
