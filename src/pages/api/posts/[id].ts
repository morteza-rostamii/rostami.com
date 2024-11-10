import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;
  const { id } = req.query;
  console.log("id:--------", id);
  switch (method) {
    case "GET":
      // get one post
      if (id) {
        return res.status(200).json({ name: "fetch post: " + id });
      }

    case "PUT":
      return res.status(200).json({ name: "update" });

    case "DELETE":
      return res.status(200).json({ name: "delete" });

    default:
      res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }

  return res.status(200).json({ name: "nothing" });
}
