import type { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "./../../../utils/mongodb";

export default async (request: NextApiRequest, response: NextApiResponse) => {
  const { name, image } = request.body;

  const db = await connectToDatabase(process.env.MONGODB_URI);

  const collection = db.collection("breaktimer");
  await collection.insertOne({
    name,
    image,
    level: 0,
    currentExperience: 0,
    totalExperience: 0,
    challengesCompleted: 0,
    registeredAt: Date.now(),
  });

  return response.status(201).json({ message: "success" });
};
