import { NextApiRequest, NextApiResponse } from "next";
import crypto from "crypto";
import userModel from "@/server/models/user.model";
import { connectDb } from "@/server/utils/db";

export default async function POST(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  const { token, newPassword } = req.body;

  if (!token || !newPassword) {
    return res
      .status(400)
      .json({ message: "Token and new password are required." });
  }

  try {
    await connectDb();

    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

    const user = await userModel.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({ message: "Invalid or expired token." });
    }

    user.password = newPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    return res
      .status(200)
      .json({ message: "Password has been reset successfully." });
  } catch (error) {
    console.error("Error in reset password handler:", error);
    return res.status(500).json({ message: "An error occurred." });
  }
}
