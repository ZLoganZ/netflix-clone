import { NextApiRequest, NextApiResponse } from "next";

import serverAuth from "@/lib/serverAuth";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).end();
  }

  try {
    const { user } = await serverAuth(req);

    res.status(200).json(user);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}
