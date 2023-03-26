import { NextApiRequest, NextApiResponse } from "next";
import { without } from "lodash";

import prismadb from "@/lib/prismadb";
import serverAuth from "@/lib/serverAuth";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method === "POST") {
      const { user } = await serverAuth(req);

      const { movieId } = req.body;

      const existingMovie = await prismadb.movie.findUnique({
        where: { id: movieId },
      });

      if (!existingMovie) {
        throw new Error("Movie not found");
      }

      const userMovie = await prismadb.user.update({
        where: {
          email: user.email || "",
        },
        data: {
          favoriteIds: {
            push: movieId,
          },
        },
      });

      return res.status(200).json(userMovie);
    }

    if (req.method === "DELETE") {
      const { user } = await serverAuth(req);

      const { movieId } = req.body;

      const existingMovie = await prismadb.movie.findUnique({
        where: { id: movieId },
      });

      if (!existingMovie) {
        throw new Error("Movie not found");
      }

      const userMovie = await prismadb.user.update({
        where: {
          email: user.email || "",
        },
        data: {
          favoriteIds: {
            set: without(user.favoriteIds, movieId),
          },
        },
      });

      return res.status(200).json(userMovie);
    }

    return res.status(405).end();
  } catch (err) {
    console.error(err);
    return res.status(500).end();
  }
}
