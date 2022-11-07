import type { NextPage } from 'next'
import { useEffect, useState } from 'react'
import { BigNumber, ethers, utils } from "ethers";
import Head from 'next/head'
import Image from 'next/image'
import { TransactionBlocks } from '../components/transactions-blocks';
import { LatestTransactions } from '../components/latestTransactions';
import { LatestBlocks } from '../components/latestBlocks';

const Home: NextPage = () => {

const [data, setData] = useState(0)
const [gas, setGasPrice] = useState("" as any)
const [blockTransactions, setBlockTransactions] = useState([] as any)
const [blocks, setBlocks] = useState([] as any)

const provider = new ethers.providers.JsonRpcProvider("http://localhost:4000/")


const gasPrice = async () => {
  const gas:BigNumber = await provider.getGasPrice();
  const estimate:string = utils.formatUnits(gas, "gwei")
  setGasPrice(estimate)
}

const lastBlock = async () => {
  const block:number = await provider.getBlockNumber()
  setData(block)
} 

const latestTransactions = async () => {

    let transactions:any = [];
  for (let i = 0; i < 10; i++ ) {
  const blockTransactions : any = await provider.getBlockWithTransactions(i);
   const details: {} = blockTransactions?.transactions
   console.log(details)
     transactions.push(details)
    
  }

  setBlockTransactions(transactions.reverse())
  console.log(transactions)

}

const last7Blocks = async () => {

  let blocks:any = [];
for (let i = 0 ; i < 8; i++) {
  const blockTransactions :any = await provider.getBlockWithTransactions(i);
  blocks.push(blockTransactions)
}
setBlocks(blocks.reverse())
  
}


useEffect(() => {
lastBlock();
gasPrice();
last7Blocks();
latestTransactions();

}, [])

// console.log(blockTransactions[0].hash)

  return (
    <div className="flex min-h-screen flex-col p-12">
      <Head>
        <title>Subnet Exploorer</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1 className='font-bold text-[50px]'>Subnet Explorer</h1>
      <div className='flex flex-row'>
      <input placeholder='Search by Address / Txn Hash / Block / Contract' className=' border rounded-l-full px-3 py-2 w-1/3'></input><button className='rounded-r-full bg-[#05e69f] flex flex-row justify-center items-center'><img className=" px-1 h-[50%]" src="/search.svg"/></button></div>
     

<TransactionBlocks block={blocks} transactions={blockTransactions}/>
    

     
    </div>
  )
}

export default Home
