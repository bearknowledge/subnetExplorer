import React, { useEffect, useState } from "react"
import { BigNumber, ethers, utils } from "ethers";
import { useRouter } from 'next/router'
import moment from 'moment';
import axios from 'axios';

export const BlockTransactionDetails = () => {
const provider = new ethers.providers.JsonRpcProvider("http://localhost:4000");
const [display, setDisplay] = useState([] as any)
const router = useRouter();
const block: string = String(router.query.block)
console.log(block)

const fetchData = async () => {
  if (!router.isReady) {
    return;
  } else {
    const blockData = (await axios.get("/api/block/" + router.query.block)).data
    console.log(blockData)
    const transactions:any = []
    const displayData:any = []
    for (let i = 0; i < blockData[0].transactions.length; i++) {
      const add = blockData[0].transactions[i]
      transactions.push(add)
    }
    
    for (let i = 0; i < transactions?.length; i++) {
    const addition = await axios.get("/api/txn/" + transactions[i]);
    displayData.push(addition.data)
  }
  setDisplay(displayData)
  }
  
};




const handleClick = (href:any, type:string) => {
  let send;
  if (type === "to" || type === "from") {
    send = "/address/" + href
  }  else {
    send = "/txn/" + href
  }
router.push(send);

}

const changeBlock = (direction:number) => {
  let send = router.query.block
  let url: any;
  if (direction === 1) {
    const block = Number(send)
    url = "/block/" + (block - 1) + "/transactions/"
  }  else {
    const block = Number(send)
    url = "/block/" + (block + 1) + "/transactions/"
  }
 router.push(url);

}


useEffect(() => {
  fetchData()
}, [router.isReady, router.query.block]);



return ( 
  <div>

    <div className=" w-[49%] shadow shadow-lg rounded-lg flex flex-col divide-y mt-5">
    <h1 className="p-4 font-bold">Overview</h1>
    <div className="flex flex-row items-center">
    <h1 className="p-4">Block:&nbsp;{router.query.block}</h1> 
    <button onClick={() => changeBlock(1)}> <img className="w-[25px]" src="/left.svg"/> </button>
     <button onClick={() => changeBlock(2)}> <img className="w-[25px] ml-1" src="/right.svg"/></button> 
     </div>
    <h1 className="p-4">Total Transactions:{display.length}</h1>
    </div>
  
   



<div className="grid grid-cols-9 gap-4 mt-5 shadow shadow-lg p-7 rounded-lg">
      <h1 className="col-span-2">Txn Hash</h1>
      <h1>Method</h1>
      <h1>Block</h1>
      <h1>Age</h1>
      <h1>From</h1>
      <h1>To</h1>
      <h1>Value</h1>
      <h1>Txn Fee</h1>

      {display[0]?.map((el:any) => (
          <>
         <button onClick={() => handleClick(el?.hash, "txn")} className="truncate col-span-2 text-[#1fade0]">{el?.hash}</button>
          <h1 className="col-span-1">Method</h1>
          <h1 className=" text-left col-span-1"> {el?.blockNumber}</h1>
            <h1 className="col-span-1">{moment(new Date(el?.timestamp * 1000)).fromNow()}</h1>
            <button onClick={() => handleClick(el?.from, "from")} className="text-[#1fade0] truncate col-span-1">{el?.from}</button>
            <button onClick={() => handleClick(el?.to, "to")} className="text-[#1fade0] truncate col-span-1">{el?.to}</button>
          <h1 className="col-span-1">{el?.value / 10 ** 18} ETH</h1>
          <h1 className="col-span-1">{el?.gas * el?.gasPrice / 10 ** 18}</h1>
          </>
      ))}

  </div>
  </div>
)

}