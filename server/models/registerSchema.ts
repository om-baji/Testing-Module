import { z } from "zod";

enum Role {
  Teacher = "Teacher",
  Student = "Student",
}

export const registerSchema = z.object({
  username: z.string().min(1, {
    message: "Required Field!",
  }),
  firstName: z.string().min(1, {
    message: "First name is required!",
  }),
  middleName: z.string().optional(),
  lastName: z.string().min(1, {
    message: "Last name is required!",
  }),
  surname: z.string().min(1, { message: "Surname is required!" }),
  dateOfBirth: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Invalid date format!",
  }),
  role: z.enum([Role.Teacher, Role.Student], {
    message: "Role must be either 'Teacher' or 'Student'",
  }),
  schoolId: z.string().min(1, {
    message: "School ID is required!",
  }),
  email: z.string().email({
    message: "Invalid email address!",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters long!",
  }),
  invitationId: z.string(),
});

export type RegisterSchemaTypes = z.infer<typeof registerSchema>;
