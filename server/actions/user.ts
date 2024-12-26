"use server";

import bcrypt from "bcryptjs";
import { loginSchema, loginSchemaTypes } from "../models/loginSchema";
import { registerSchema } from "../models/registerSchema";
import prisma from "../utils/db";
import { ROLES } from "../utils/types";

type RegisterUserType = {
  firstName: string;
  middleName: string;
  surname: string;
  dateOfBirth: Date | string;
  role: ROLES;
  schoolId: string;
  email: string;
  invitationId: string | null;
};

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
        status: 404,
        error: "User not found with the given username",
      };
    }

    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
      return {
        message: "Invalid credentials!",
        success: false,
        status: 401,
        error: "Incorrect username or password.",
      };
    }

    return {
      message: "Login successful!",
      user,
      status: 200,
      success: true,
      error: null,
    };
  } catch (error) {
    console.error(error);
    return {
      message: "Login unsuccessful!",
      success: false,
      status: 500,
      error:
        error instanceof Error
          ? error.message
          : "An error occurred,something went wrong.",
    };
  }
}
export async function SignUp({
  firstName,
  middleName,
  surname,
  dateOfBirth,
  role,
  schoolId,
  email,
  invitationId,
}: RegisterUserType) {
  const slug = `${firstName}-${surname}-${dateOfBirth}-${schoolId}`.toLowerCase();

  try {
    // Create validation object based on role
    const validationData = {
      firstName,
      middleName,
      surname,
      slug,
      dateOfBirth,
      role,
      schoolId,
      ...(role === ROLES.Teacher ? { email, invitationId } : {}),
    };

    const validation = registerSchema.safeParse(validationData);

    if (!validation.success) {
      return {
        message: "Validation failed!",
        success: false,
        error: validation.error.format(),
        status: 400,
      };
    }

    const existingUser = await prisma.user.findUnique({
      where: { slug },
    });

    if (existingUser) {
      return {
        message: "User already exists, login instead.",
        success: false,
        status: 409,
      };
    }

    const result = await prisma.$transaction(async (prisma) => {
      const username = `${firstName.toLowerCase()}@${Math.floor(Math.random() * 1000)}`;
      const hashedPassword = await bcrypt.hash(username, 12);
      
      const dateOfBirthDate = new Date(dateOfBirth + "T00:00:00Z");
      
      const userData = {
        firstName,
        middleName,
        surname,
        slug,
        dateOfBirth: dateOfBirthDate,
        role,
        schoolId,
        username,
        password: hashedPassword,
        ...(role === ROLES.Teacher ? { 
          email: email || null,
          invitationId 
        } : {}),
      };

      return await prisma.user.create({ data: userData });
    });

    return {
      message: "User registered successfully!",
      user: result,
      success: true,
      error: null,
      status: 201,
    };
  } catch (error : any) {
    console.error('SignUp error:', error);
    return {
      message: "Signup failed!",
      success: false,
      error: error instanceof Error ? error.message : "An error occurred, something went wrong.",
      status: 500,
    };
  }
}