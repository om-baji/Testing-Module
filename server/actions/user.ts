"use server";

import { loginSchema, loginSchemaTypes } from "../models/loginSchema";
import prisma from "../utils/db";

export async function login({ username, password }: loginSchemaTypes) {
  try {
    const validation = loginSchema.safeParse({
      username,
      password,
    });

    if (!validation.success) {
      return {
        message: "Validation failed!",
        success: false,
        error: validation.error.message,
      };
    }

    const user = await prisma.user.findUnique({
      where: {
        username,
      },
    });

    if (!user) {
      return {
        message: "Check your username!",
        success: false,
        error: "User not found with the given username",
      };
    }

    return {
      message: "Login successfull!",
      user,
      success: true,
      error: null,
    };
  } catch (error) {
    console.error(error);
    return {
      message: "Login unsuccessfull!",
      success: false,
      error: error as string,
    };
  }
}
