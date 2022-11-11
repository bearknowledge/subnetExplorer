import clientPromise from "../../../lib/mongodb";

export default async function handler(req: any, res: any) {
    const {
      query: {address}
    } = req

  const client = await clientPromise;
      const db = client.db("test");

      const transactionsFrom = await db
          .collection("transactions")
          .find({from: address})
          .toArray()

          const transactionTo = await db
          .collection("transactions")
          .find({to: address})
          .toArray()

       

          res.json(transactionsFrom.concat(transactionTo))

          

      console.log(res.json(transactionsFrom.concat(transactionTo)))
}