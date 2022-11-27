import React, { useEffect, useState } from "react"
import { BigNumber, ethers, utils } from "ethers";
import { useRouter } from 'next/router'
import moment from 'moment';
import axios from 'axios';

export const BlockTransactionDetails = () => {
const provider = new ethers.providers.JsonRpcProvider("http://localhost:4000");
const [display, setDisplay] = useState([] as any)
const router = useRouter();

const fetchData = async () => {
  if (!router.isReady) {
    return;
  } else {
    const blockData = (await axios.get("/api/block/" + router.query.block)).data
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

const changeBlock = async (direction:number) => {
  let send = router.query.block
  let url: any;
  if (direction === 1) {
    const block = Number(send)
    url = "/block/" + (block - 1) + "/transactions/"
  }  else {
    const block = Number(send)
    const currentBlock = (await provider.getBlock("latest")).number
    console.log(currentBlock)
    if (block + 1 <= currentBlock) {
    url = "/block/" + (block + 1) + "/transactions/"
    }
    else {
      url = "/block/" + (block) + "/transactions/"
    }

  }
 router.push(url);

}


useEffect(() => {
  fetchData()
}, [router.isReady, router.query.block]);



return ( 
  <div>

    <div className="mobile:w-full laptop:w-[49%] shadow shadow-lg rounded-lg flex flex-col divide-y mt-5">
    <h1 className="p-4 font-bold">Overview</h1>
    <div className="flex flex-row items-center">
    <h1 className="p-4">Block:&nbsp;{router.query.block}</h1> 
    <button onClick={() => changeBlock(1)}> <img className="w-[25px]" src="/left.svg"/> </button>
     <button onClick={() => changeBlock(2)}> <img className="w-[25px] ml-1" src="/right.svg"/></button> 
     </div>
    <h1 className="p-4">Total Transactions:{display.lengtd}</h1>
    </div>
  
   



<div className="p-7 mt-5 shadow shadow-lg rounded-lg overflow-x-auto">
<table className="w-[1500px]">
  <thead className="text-left">
    <tr>
      <th scope="col" className="w-[200px]">Txn Hash</th>
      <th scope="col" className="w-[100px]" >Metdod</th>
      <th scope="col" className="w-[80px]" >Block</th>
      <th scope="col" className="w-[125px]"  >Age</th>
      <th scope="col" className="w-[200px]" >From</th>
      <th scope="col" className="w-[200px]"  >To</th>
      <th scope="col" className="w-[80px]"  >Value</th>
      <th scope="col" className="w-[80px]"  >Txn Fee</th>
      </tr>
  </thead>
  <tbody className="divide-y">
      {display[0]?.map((el:any) => (
          <tr>
         <td className="w-[200px] truncate py-4 " ><button onClick={() => handleClick(el?.hash, "txn")} className="truncate w-[180px] text-[#1fade0]">{el?.hash}</button></td>
          <td className="w-[100px]">Method</td>
         <td className="w-[80px]"> <button onClick={() => handleClick(el?.blockNumber, "block")} className="text-[#1fade0] w-[80px] text-left"> {el?.blockNumber}</button></td>
          <td className="w-[125px]">{moment(new Date(el?.timestamp * 1000)).fromNow()}</td>
          <td className="w-[200px]">  <button onClick={() => handleClick(el?.from, "from")} className="text-[#1fade0]  w-[180px] truncate ">{el?.from}</button></td>
          <td className="w-[200px]"> <button onClick={() => handleClick(el?.to, "to")} className="text-[#1fade0]  w-[180px] truncate ">{el?.to}</button></td>
          <td className="w-[80px]">{el?.value / 10 ** 18} ETH</td>
          <td className="w-[80px]">{el?.gas * el?.gasPrice / 10 ** 18}</td>
          </tr>
      ))}
</tbody>
  </table>
  </div>
  </div>
)

}