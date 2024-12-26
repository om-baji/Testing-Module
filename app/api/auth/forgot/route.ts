import { NextApiRequest, NextApiResponse } from "next";
import crypto from "crypto";
import nodemailer from "nodemailer";
import userModel from "@/server/models/user.model";
import { connectDb } from "@/server/utils/db";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

export default async function POST(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }

  try {
    await connectDb();

    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const resetToken = crypto.randomBytes(32).toString("hex");
    const hashedToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");
    const tokenExpiration = new Date(Date.now() + 3600000);

    user.resetPasswordToken = hashedToken;
    user.resetPasswordExpires = tokenExpiration;
    await user.save();

    const resetUrl = `${process.env.NEXTAUTH_URL}/new-password?token=${resetToken}`;
    await transporter.sendMail({
      to: email,
      subject: "Reset Your Password",
      html: `
            <h1 style="font-family: Arial, sans-serif; color: #333333; font-size: 24px; margin-bottom: 20px;">
            Reset Your Password
            </h1>
            <p style="font-family: Arial, sans-serif; color: #555555; font-size: 16px; margin-bottom: 10px;">
            Click the link below to reset your password:
            </p>
            <a
            href="${resetUrl}"
            style="
                font-family: Arial, sans-serif;
                color: #ffffff;
                background-color: #007bff;
                padding: 10px 20px;
                text-decoration: none;
                border-radius: 5px;
                font-size: 16px;
                display: inline-block;
            "
            >
            Reset Password
            </a>
            <p style="font-family: Arial, sans-serif; color: #555555; font-size: 16px; margin-top: 20px;">
            This link will expire in 1 hour.
            </p>`,
    });

    return res.status(200).json({ message: "Password reset email sent" });
  } catch (error) {
    console.error("Error in forgot password handler:", error);
    return res.status(500).json({ message: "An error occurred" });
  }
}
