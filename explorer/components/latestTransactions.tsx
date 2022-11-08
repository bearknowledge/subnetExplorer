import React, { useEffect, useState } from "react"
import { BigNumber, ethers, utils } from "ethers";

export const LatestTransactions = ({transaction, key}: any) => {
const provider = new ethers.providers.JsonRpcProvider("http://localhost:4000");
const [time, setTime] = useState(undefined as any)

const calculateTime = async () => {
  const time: any = await provider.getBlock(transaction?.blockNumber);
  const elapsedTime = Math.floor(Date.now()/ 1000) - time.timestamp;
  setTime(elapsedTime);
}


useEffect(() => {
calculateTime()
}, [])
return (

<div className="flex flex-row items-center py-3"> 
<div className="flex flex-col w-1/4">
  <a className=" text-[#1fade0] truncate">{transaction?.hash}</a>
 <h2 className="text-[10px]"> {time} Seconds Ago</h2>
 </div>
 <div className="flex flex-col w-1/2">
 <a href="www.google.com" className="ml-4 truncate">From: <span className="text-[#1fade0]">{transaction?.from}</span></a>
 <a className="ml-4 truncate">To: <span className="text-[#1fade0]">{transaction?.to}</span> </a>
 </div>
 <h1 className="ml-4 w-1/4 ">{(Number(transaction?.value)/ 10 ** 18)} ETH</h1>

</div> 

)


}