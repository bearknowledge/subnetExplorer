import clientPromise from "../../lib/mongodb";
import { NextApiRequest, NextApiResponse } from "next";

export async function getServerSideProps()  {
   try {
       const client = await clientPromise;
       const db = client.db("test");

       const transactions = await db
           .collection("transactions")
           .find()
           .toArray();
      return  {
        props: {transactions: JSON.parse(JSON.stringify(transactions))}
      }
   } catch (e) {
       console.error(e);
   }


   











   
};