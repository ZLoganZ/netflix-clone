import bcrypt from "bcrypt";
import { NextApiRequest, NextApiResponse } from "next";
import prismadb from "@/lib/prismadb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method !== "POST") {
      return res.status(405).end();
    }

    const { email, password, name } = req.body;

    const existingUser = await prismadb.user.findUnique({
      where: {
        email,
      },
    });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await prismadb.user.create({
      data: {
        email,
        hashedPassword,
        name,
        image: "",
        emailVerified: new Date(),
      },
    });

    res.status(201).json(user);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
}
