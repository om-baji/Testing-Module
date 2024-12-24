"use server";

import { registerSchema, RegisterSchemaTypes } from "../models/registerSchema";
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


export async function register(data) {
  try {
    const validation = registerSchema.safeParse(data);

    if (!validation.success) {
      return {
        message: "Validation failed!",
        success: false,
        error: validation.error.errors.map((e) => e.message).join(", "),
      };
    }

    const { firstName, middleName, lastName, dateOfBirth, role, schoolName, email, invitationId } =
      validation.data;

    const existingUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (existingUser) {
      return {
        message: "User already exists!",
        success: false,
        error: "A user with the provided email already exists.",
      };
    }

    const user = await prisma.user.create({
      data: {
        firstName,
        middleName,
        lastName,
        dateOfBirth: new Date(dateOfBirth),
        role,
        schoolName,
        email,
        invitationId,
      },
    });

    return {
      message: "Registration successful!",
      user,
      success: true,
      error: null,
    };
  } catch (error) {
    console.error(error);
    return {
      message: "Registration failed!",
      success: false,
      error: error.message || "Something went wrong",
    };
  }
}

