import clientPromise from "../lib/mongodb";
import axios from 'axios';
import useSWR, { mutate } from 'swr';

export const getTransaction = async (txn: any) => {
  const url = '/api/txn' + txn
    const client = await clientPromise;
    const db = client.db("test");
    const transactions = await db.collection("transactions").find({hash:txn}).toArray();
    
    return JSON.parse(JSON.stringify(transactions))

}


const getAddress = async () => {
  try {
    const client = await clientPromise;
    const db = client.db("test");

    const transactions = await db.collection("transactions").find().toArray();

    const blocks = await db.collection("blocks").find().toArray();
    return {
      props: {
        transactions: JSON.parse(JSON.stringify(transactions)),
        blocks: JSON.parse(JSON.stringify(blocks)),
      },
    };
  } catch (e) {
    console.error(e);
  }
  
}



const getBlock = async () => {
  try {
    const client = await clientPromise;
    const db = client.db("test");

    const transactions = await db.collection("transactions").find().toArray();

    const blocks = await db.collection("blocks").find().toArray();
    return {
      props: {
        transactions: JSON.parse(JSON.stringify(transactions)),
        blocks: JSON.parse(JSON.stringify(blocks)),
      },
    };
  } catch (e) {
    console.error(e);
  }
  
}




const dataCalls = {
  getAddress,
  getTransaction,
  getBlock
}



module.exports = dataCalls;