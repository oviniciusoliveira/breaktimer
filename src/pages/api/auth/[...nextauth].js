import NextAuth from "next-auth";
import Providers from "next-auth/providers";

import { connectToDatabase } from "./../../../utils/mongodb";

export default NextAuth({
  providers: [
    Providers.GitHub({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async session(session, user) {
      const textToReplace = "https://avatars.githubusercontent.com/u/";
      const remainingText = user.picture.replace(textToReplace, "");
      session.userId = remainingText.split("?")[0];

      const db = await connectToDatabase(process.env.MONGODB_URI);
      const collection = db.collection("breaktimer");

      const userFromDb = await collection.findOne({ userId: session.userId });
      if (!userFromDb) {
        await collection.insertOne({
          userId: session.userId,
          name: user.name,
          image: user.picture,
          level: 1,
          currentExperience: 0,
          totalExperience: 0,
          challengesCompleted: 0,
          registeredAt: Date.now(),
        });
      }

      console.log("userid: ", session.userId);

      return session;
    },
  },
});
