import clientPromise from "../../../lib/mongodb";

export default async function handler(req: any, res: any) {
    const {
      query: {address}
    } = req

  const client = await clientPromise;
      const db = client.db("test");

      const transactions = await db
          .collection("transactions")
          .find({from: address})
          .toArray();

      console.log(res.json(transactions))
}