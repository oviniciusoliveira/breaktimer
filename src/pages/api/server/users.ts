import type { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "./../../../utils/mongodb";

export default async (request: NextApiRequest, response: NextApiResponse) => {
  const db = await connectToDatabase(process.env.MONGODB_URI);

  const users = await db.collection("breaktimer").find({}).toArray();

  return response.status(201).json(users);
};
