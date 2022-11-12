import type { NextPage } from "next";
import Head from "next/head";

import { BlockTransactionDetails } from "../../../../components/blockTransactionDetails";

const Home: NextPage = () => {

  return (
    <div className="flex min-h-screen flex-col mobile:p-4 laptop:p-12">
      <Head>
        <title>Subnet Exploorer</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1 className="font-bold mobile:text-[20px] laptop:text-[50px]">
        Subnet Explorer
      </h1>
      <div className="flex flex-row mobile:w-full">
        <input
          placeholder="Search by Address / Txn Hash / Block / Contract"
          className=" border rounded-l-full px-3 py-2 mobile:w-full laptop:w-1/3"
        ></input>
        <button className="rounded-r-full bg-[#05e69f] flex flex-row justify-center items-center">
          <img className=" mx-4 w-[20px]" src="/search.svg" />
        </button>
      </div>
      <h1 className="text-black font-bold text-[30px]">{}</h1>
      
      <BlockTransactionDetails/>
    </div>
  );
};

export default Home;