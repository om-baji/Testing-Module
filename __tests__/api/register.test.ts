import { createMocks } from 'node-mocks-http';
import { POST } from "@/app/api/register/route";
import { NextApiRequest, NextApiResponse } from 'next';

describe("Register API", () => {
  it("should register a new user successfully", async () => {
    const { req, res } = createMocks({
      method: "POST",
      body: {
        firstName: "John",
        middleName: "",
        surname: "Doe",
        dateOfBirth: "2000-01-01",
        role: "student",
        schoolId: "123456",
        email: "john.doe@example.com",
        invitationId: null,
      },
    });

    const response = await POST(req as Request);
    const data = await response.json();

    expect(response.status).toBe(201);
    expect(data).toHaveProperty("success", true);
    expect(data).toHaveProperty("message", "User registered successfully");
  });

  it("should validate required fields", async () => {
    const { req, res } = createMocks({
      method: "POST",
      body: {
        firstName: "",
        surname: "",
        role: "invalid",
      },
    });

    const response = await POST(req as Request);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data).toHaveProperty("success", false);
    expect(data).toHaveProperty("error");
  });
});
