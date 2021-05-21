import { MongoClient, Db } from "mongodb";
import url from "url";

let cachedDb: Db = null;

export async function connectToDatabase(uri: string) {
  if (cachedDb) return cachedDb;

  const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };

  const client = await MongoClient.connect(uri, options);

  const dbName = url.parse(uri).pathname.substr(1);
  const db = client.db(dbName);

  cachedDb = db;

  return db;
}
