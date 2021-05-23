import type { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "./../../../utils/mongodb";

export default async (request: NextApiRequest, response: NextApiResponse) => {
  const { userId } = request.body;

  const db = await connectToDatabase(process.env.MONGODB_URI);

  const user = await db.collection("breaktimer").findOne({ userId });


  return response.status(201).json(user);
};
