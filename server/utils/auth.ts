import NextAuth, { AuthOptions, Session, SessionStrategy } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import User from "@/server/models/user.model";
import { JWT } from "next-auth/jwt";
import bcrypt from "bcryptjs";
import { ROLE } from "./types";
import connectDB from "@/server/utils/db";

type CredentialsType = {
  username: string;
  password: string;
};

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
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

          await connectDB();

          const user = await User.findOne({
            username: credentials.username,
          }).select("id username password role");

          if (!user) throw new Error("User not found!");

          const isValid = await bcrypt.compare(
            credentials.password,
            user.password
          );

          if (!isValid) throw new Error("Wrong password!");

          return {
            id: user.id,
            username: user.username,
            role: user.role as ROLE,
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
        token.username = user.username;
        token.id = user.id;
        token.role = user.role as ROLE;
      }
      return token;
    },
    async session({ session, token }): Promise<Session> {
      if (token) {
        session.user.username = token.username;
        session.user.id = token.id;
        session.user.role = token.role;
      }
      return session;
    },
  },
};

export default NextAuth(authOptions);
