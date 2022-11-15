import React, { useEffect, useState } from "react"
import { BigNumber, ethers, utils } from "ethers";
import { useRouter } from 'next/router'
import moment from "moment";

export const LatestTransactions = ({transaction}: any) => {
const provider = new ethers.providers.JsonRpcProvider("http://localhost:4000");


const [time, setTime] = useState(undefined as any)

const router = useRouter();

const calculateTime = async () => {
  const time: any = await provider.getBlock(transaction?.blockNumber);
  const elapsedTime = moment(time?.timestamp * 1000).fromNow();
  setTime(elapsedTime);
}

const FromHref = "address/" + transaction?.from;
const ToHref = "address/" + transaction?.to;
const HashHref = "txn/" + transaction?.hash;


const handleClick = (href:any) => {
router.push(href);
}



useEffect(() => {
calculateTime()
}, [])
return (

<div className="flex flex-row items-center py-3"> 
<div className="flex flex-col w-1/4">
  <button onClick={() => handleClick(HashHref)} className=" text-[#1fade0] truncate">{transaction?.hash}</button>
 <h2 className="text-[10px]"> {time}</h2>
 </div>
 <div className="flex flex-col w-1/2">
 <span className="ml-4 flex flex-row">From: <button onClick={() => handleClick(FromHref)} className="truncate text-[#1fade0]">{transaction?.from}</button></span>
 <span className="ml-4 flex flex-row">To: <button  onClick={() => handleClick(ToHref)} className="truncate text-[#1fade0]">{transaction?.to}</button> </span>
 </div>
 <h1 className="ml-4 w-1/4 ">{(Number(transaction?.value)/ 10 ** 18)} ETH</h1>

</div> 

)


}