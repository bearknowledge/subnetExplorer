import type { NextPage } from "next";
import { useEffect, useState } from "react";
import { BigNumber, ethers, utils } from "ethers";
import clientPromise from "../lib/mongodb";
import axios from 'axios';
import { useRouter } from "next/router";
import { TransactionBlocks } from "../components/transactions-blocks";
import Head from "next/head";

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
  const router = useRouter()
  const provider = new ethers.providers.JsonRpcProvider(
    "http://localhost:4000/"
  );

  const gasPrice = async () => {
    //   const gas:BigNumber = await provider.getGasPrice();
    //   const estimate:string = utils.formatUnits(gas, "gwei")
    //   setGasPrice(estimate)
    const latestBlock = await provider.getBlock("latest");
    console.log(latestBlock);
  };

  const searchAll = async (e: any) => {
  e.preventDefault()
  let send:any;
  const data = new FormData(e.target);
  const input = String(data.get("search"))
  if (input.length === 66) {
    send = "/txn/" + input
  } else if (input.length === 42) {
    send = "/address/" + input
  } else if (/^\d+$/.test(input)) {
    send = "/block/" + input
  } else {
    alert("failed")
  }
  router.push(send);
  }
  

  // const latestTransactions = async () => {

  //     let transactions:any = [];
  //   for (let i = 0; i < 10; i++ ) {
  //   const blockTransactions : any = await provider.getBlockWithTransactions(i);
  //    const details: {} = blockTransactions?.transactions
  //    console.log(details)
  //      transactions.push(details)

  //   }

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

  useEffect(() => {

gasPrice
  }, [])
  

  return (
    <div className="flex min-h-screen flex-col mobile:p-4 laptop:p-12">
      <Head>
        <title>Subnet Exploorer</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1 className="font-bold mobile:text-[20px] laptop:text-[50px]">Subnet Explorer</h1>
        <form className="flex flex-row mobile:w-full" onSubmit={searchAll}>
        <input
          id="search"
          name="search"
          type="string"
          placeholder="Search by Address / Txn Hash / Block"
          className=" border rounded-l-full px-3 py-2 mobile:w-full laptop:w-1/3"
        ></input>
        <button type="submit" className="rounded-r-full bg-[#05e69f] flex flex-row justify-center items-center">
          <img className=" px-1 h-[50%]" src="/search.svg" />
        </button>
        </form>

      <TransactionBlocks
        block={blocks.blocks}
        transactions={blocks.transactions}
      />
    </div>
  );
};

export default Home;
