"use server";

import { loginSchema, loginSchemaTypes } from "../models/loginSchema";
import { registerSchema, RegisterSchemaTypes } from "../models/registerSchema";
import prisma from "../utils/db";
import bcrypt from "bcryptjs";
import { signIn } from "next-auth/react";

export async function login({ username, password }: loginSchemaTypes) {
  try {
    const validation = loginSchema.safeParse({ username, password });

    if (!validation.success) {
      return {
        message: "Validation failed!",
        success: false,
        error: validation.error.message,
      };
    }

    const user = await prisma.user.findUnique({ where: { username } });

    if (!user) {
      return {
        message: "Check your username!",
        success: false,
        error: "User not found with the given username",
      };
    }

    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
      return {
        message: "Invalid credentials!",
        success: false,
        error: "Incorrect username or password.",
      };
    }

    return {
      message: "Login successful!",
      user,
      success: true,
      error: null,
    };
  } catch (error) {
    console.error(error);
    return {
      message: "Login unsuccessful!",
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

export async function SignUp({
  username,
  firstName,
  middleName,
  surname,
  dateOfBirth,
  role,
  schoolId,
  email,
  invitationId,
  password,
}: RegisterSchemaTypes) {
  try {
    const validation = registerSchema.safeParse({
      username,
      firstName,
      middleName,
      surname,
      dateOfBirth,
      role,
      schoolId,
      email,
      invitationId,
      password,
    });

    if (!validation.success) {
      return {
        message: "Validation failed!",
        success: false,
        error: validation.error.message,
      };
    }

    const existingUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (existingUser) {
      return {
        message: "User already exists, login instead.",
        success: false,
      };
    }

    const result = await prisma.$transaction(async (prisma) => {
      const hash = await bcrypt.hash(password, 12);

      const user = await prisma.user.create({
        data: {
          username,
          firstName,
          middleName,
          surname,
          dateOfBirth,
          role,
          schoolId,
          email,
          invitationId,
          password: hash,
        },
      });

      const status = await signIn("credentials", { username, password, redirect: false });

      if (!status?.ok) {
        throw new Error(status?.error as string);
      }
      return user;
    });

    return {
      message: "User created and logged in successfully!",
      user: result,
      success: true,
      error: null,
    };
  } catch (error) {
    console.error(error);
    return {
      message: "Signup unsuccessful!",
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}