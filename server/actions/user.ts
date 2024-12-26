"use server";

import { loginSchema, loginSchemaTypes } from "../models/loginSchema";
import { registerSchema, RegisterSchemaTypes } from "../models/registerSchema";
import prisma from "../utils/db";
import bcrypt from "bcryptjs";
import { signIn } from "next-auth/react";
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
  const slug =
    `${firstName}-${middleName}-${surname}-${dateOfBirth}-${schoolId}`.toLowerCase();

  try {
    let validation: any;

    if (role === ROLES.Teacher) {
      validation = registerSchema.safeParse({
        firstName,
        middleName,
        surname,
        slug,
        dateOfBirth,
        role,
        schoolId,
        email: email,
        invitationId: invitationId,
      });
    } else {
      validation = registerSchema.safeParse({
        firstName,
        middleName,
        surname,
        slug,
        dateOfBirth,
        role,
        schoolId,
      });
    }

    if (!validation.success) {
      return {
        message: "Validation failed!",
        success: false,
        error: validation.error.message,
        status: 400,
      };
    }

    const existingUser = await prisma.user.findUnique({
      where: {
        slug,
      },
    });

    if (existingUser) {
      return {
        message: "User already exists, login instead.",
        success: false,
        status: 409,
      };
    }

    const result = await prisma.$transaction(async (prisma) => {
      const username = `${firstName.toLowerCase()}@${Math.floor(
        Math.random() * 1000
      )}`;

      const hashedPassword = await bcrypt.hash(username, 12);

      let user: any;
      if (role === ROLES.Teacher) {
        user = await prisma.user.create({
          data: {
            firstName,
            middleName,
            surname,
            slug,
            dateOfBirth: new Date(dateOfBirth),
            role,
            schoolId,
            email,
            invitationId,
            username,
            password: hashedPassword,
          },
        });
      } else {
        user = await prisma.user.create({
          data: {
            firstName,
            middleName,
            surname,
            slug,
            dateOfBirth: new Date(dateOfBirth),
            role,
            schoolId,
            username,
            password: hashedPassword,
          },
        });
      }
      return user;
    });

    return {
      message: "User registered successfully!",
      user: result,
      success: true,
      error: null,
      status: 201,
    };
  } catch (error) {
    console.log(error);
    return {
      message: "Signup failed!",
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "An error occurred,something went wrong.",
      status: 500,
    };
  }
}
