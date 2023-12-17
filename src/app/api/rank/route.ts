import { NextApiRequest, NextApiResponse } from "next";

export async function GET(req: NextApiRequest, res: NextApiResponse) {
  const query = req.query;

  res.json({
    query: query,
  });
}
