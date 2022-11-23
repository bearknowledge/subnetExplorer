import clientPromise from "../../../lib/mongodb";

export default async function handler(req: any, res: any) {
    const {
      query: {block}
    } = req

  const client = await clientPromise;
      const db = client.db("explorerdb");

      const blocks = await db
          .collection("blocks")
          .find({number: Number(block)})
          .toArray();
     res.json(blocks);
}