import type { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "./../../../utils/mongodb";

export default async (request: NextApiRequest, response: NextApiResponse) => {
  const {
    userId,
    level,
    currentExperience,
    totalExperience,
    challengesCompleted,
  } = request.body;



  const db = await connectToDatabase(process.env.MONGODB_URI);

  const user = await db.collection("breaktimer").updateOne(
    { userId },
    {
      $set: {
        level,
        currentExperience,
        totalExperience,
        challengesCompleted,
      },
    }
  );

  return response.status(201).json(user);
};
