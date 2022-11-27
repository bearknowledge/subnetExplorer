import type { NextPage } from "next";
import clientPromise from "../lib/mongodb";
import { TransactionBlocks } from "../components/transactions-blocks";
import { Footer } from "../components/footer";
import { Search } from "../components/search";
import { useEffect, useState } from "react";
import {ethers, utils, FixedNumber} from "ethers"

export async function getServerSideProps() {
  try {
    const client = await clientPromise;
    const db = client.db("explorerdb");
    let averageGas = await db.collection("transactions").aggregate([{$group: {_id:null, avg_val:{$avg:"$gasPrice"}}}]).toArray()
    const transactions = await db.collection("transactions").find().sort("timestamp",-1).limit(10).toArray()
    const subnet_stats = await db.collection("infos").find().toArray()
    const blocks = await db.collection("blocks").find().sort("number",-1).limit(10).toArray();
    return {
      props: {
        transactions: JSON.parse(JSON.stringify(transactions)),
        averageGas: JSON.parse(JSON.stringify(averageGas)),
        stats: JSON.parse(JSON.stringify(subnet_stats)),
        blocks: JSON.parse(JSON.stringify(blocks)),
      },
    };
  } catch (e) {
    console.error(e);
  }
}

const Home: NextPage = (blocks: any) => {
  const [averageGas, setAverageGas] = useState("" as any);
  const check = () => {
    if (blocks.averageGas.length === 0) {
      setAverageGas("0")
    } else {
      setAverageGas(utils.formatEther((String(Math.floor(blocks.averageGas[0].avg_val)))))
    }
  }
  useEffect(() => {
    check()
  })
  return (
    <>
    <div className="flex min-h-screen flex-col mobile:p-4 laptop:p-12">
     <Search/>
     <div className="w-full rounded-lg flex shadow shadow-lg p-7 mt-10 mobile:mb-10 mobile:flex-col mobile:items-center">
      <div className="flex mobile:flex-col mobile:w-fit tablet:flex-row tablet:justify-between tablet:w-full">
     <div className="flex flex-row mobile:items-center">
        <h1 className="rounded-sm text-[30px] mr-3">
        🧱⛏
        </h1>
      <span className="flex flex-col my-2">
      <h1 className="text-slate-400"> Last Mined Block</h1>
      <h1> {blocks.stats[0].bestBlockHeight}</h1>
      </span>
      </div>

      <div className="flex flex-row items-center">
        <h1 className="rounded-sm text-[30px] mr-3">
        ⛓️
        </h1>
      <span className="flex flex-col my-2">
      <h1 className="text-slate-400">Total Transactions</h1>
      <h1> {blocks.stats[0].txCount}</h1>
      </span>
      </div>
      <div className="flex flex-row items-center">
        <h1 className="rounded-sm text-[30px] mr-3">
        ⛽️
        </h1>
      <span className="flex flex-col my-2">
      <h1 className="text-slate-400">Average Gas Price</h1>
      <h1> { averageGas } </h1>
      </span>
      </div>
      </div>
      </div>
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
