import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;
  const { id } = req.query;
  console.log("id:--------", id);
  switch (method) {
    case "GET":
      // all posts
      return res.status(200).json({ name: "fetch all posts" });

    case "POST":
      return res.status(201).json({ name: "create" });

    default:
      res.setHeader("Allow", ["GET", "POST"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }

  return res.status(200).json({ name: "nothing" });
}
