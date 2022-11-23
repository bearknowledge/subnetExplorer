import clientPromise from "../../../lib/mongodb";

export default async function handler(req: any, res: any) {
    const {
      query: {txn}
    } = req

  const client = await clientPromise;
      const db = client.db("explorerdb");

      const transactions = await db
          .collection("transactions")
          .find({hash: txn})
          .toArray();

      console.log(res.json(transactions))
}