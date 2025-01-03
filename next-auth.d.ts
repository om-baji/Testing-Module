import NextAuth from "next-auth";
import { DefaultSession, DefaultUser } from "next-auth";
import { Role } from "./server/utils/types";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      username: string;
      role : Role;
    } & DefaultSession["user"];
  }

  interface User extends DefaultUser {
    id: string;
    username: string;
    role? : Role;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    username: string;
    role : Role;
  }
}
