import { registerSchema } from '@/server/models/registerSchema';
import prisma from '@/server/utils/db'; 
import { ROLES } from '@/server/utils/types';
import bcrypt from 'bcrypt';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const {
    firstName,
    middleName,
    surname,
    dateOfBirth,
    role,
    schoolId,
    email,
    invitationId,
  } = await req.json();

  const slug = `${firstName}-${surname}-${dateOfBirth}-${schoolId}`.toLowerCase();

  try {
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
      return NextResponse.json({
        message: "Validation failed!",
        success: false,
        error: validation.error.format(),
      }, { status: 400 });
    }

    const existingUser = await prisma.user.findUnique({
      where: { slug },
    });

    if (existingUser) {
      return NextResponse.json({
        message: "User already exists, login instead.",
        success: false,
      }, { status: 409 });
    }

    const username = `${firstName.toLowerCase()}@${Math.floor(Math.random() * 10000)}`;
    const hashedPassword = await bcrypt.hash(username, 12);
    
    const dateOfBirthDate = new Date(dateOfBirth + "T00:00:00Z");

    let userData;
    if(email) {
      userData = {
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
    } else {
      userData = {
        firstName,
        middleName,
        surname,
        slug,
        dateOfBirth: dateOfBirthDate,
        role,
        schoolId,
        username,
        password: hashedPassword,
      };
    }

    console.log(userData)
    
    const result = await prisma.user.create({ data: userData });

    return NextResponse.json({
      message: "User registered successfully!",
      user: result,
      success: true,
    }, { status: 201 });
  } catch (error) {
    console.error('SignUp error:');
    return NextResponse.json({
      message: "Signup failed!",
      success: false,
      error: error instanceof Error ? error.message : "An error occurred, something went wrong.",
    }, { status: 500 });
  }
}