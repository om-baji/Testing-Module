import { createMocks } from 'node-mocks-http';
import { handler } from "@/app/api/auth/[...nextauth]/route";
import { NextAuthOptions } from "next-auth";

describe("NextAuth Configuration", () => {
  it("should initialize NextAuth with correct options", async () => {
    const { req, res } = createMocks({
      method: "GET",
      query: {
        nextauth: ["session"],
      },
    });

    expect(handler).toBeDefined();
    expect(typeof handler).toBe('function');
  });
});
