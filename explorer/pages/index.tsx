import type { NextPage } from "next";
import clientPromise from "../lib/mongodb";
import { TransactionBlocks } from "../components/transactions-blocks";
import { Footer } from "../components/footer";
import { Search } from "../components/search";
import axios from "axios";
import { useEffect } from "react";

export async function getServerSideProps() {
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

const Home: NextPage = (blocks: any) => {

  

  //  const runIndexer = async () => {
  //   await axios.get("/api/indexer/indexer.js");
  //  }

  //   setBlockTransactions(transactions.reverse())
  //   console.log(transactions)

  // }

  // const last7Blocks = async () => {

  //   let blocks:any = [];
  // for (let i = 0 ; i < 8; i++) {
  //   const blockTransactions :any = await provider.getBlockWithTransactions(i);
  //   blocks.push(blockTransactions)
  // }
  // setBlocks(blocks.reverse())

  // }

  // useEffect(() => {
  //   runIndexer()
  // },[])


  return (
    <>
    <div className="flex min-h-screen flex-col mobile:p-4 laptop:p-12">
     <Search/>
      <TransactionBlocks
        block={blocks.blocks}
        transactions={blocks.transactions}
      />
    </div>
    <Footer/>
    </>
  );
};

export default Home;
