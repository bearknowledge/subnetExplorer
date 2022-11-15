import React, { useEffect, useState } from "react"
import { BigNumber, ethers, utils } from "ethers";
import { useRouter } from 'next/router'
import Link from 'next/link'

export const TransactionDetails = ({transaction}:any) => {
const provider = new ethers.providers.JsonRpcProvider("http://localhost:4000");
const [elapsedTime, setElapsedTime] = useState(undefined as any)
const [time, setTime] = useState(undefined as any)
const [gasPrice, setGasPrice] = useState("")
const [isExpanded, setExpansion] = useState(false)
const router = useRouter();


console.log(transaction)


const valueSent = (Number(transaction?.value)/ 10 ** 18)


const gasFetch = async () => {
    const gas:BigNumber = await provider.getGasPrice();
    const estimate:string = utils.formatUnits(gas, "gwei")
    setGasPrice(estimate)
};


const calculateTime = async () => {
  const blockTime: any = await provider.getBlock(transaction?.blockNumber);
  const currTime: number = blockTime?.timestamp;
  const elapsedTime = Math.floor(Date.now()/ 1000) - blockTime.timestamp;
  setElapsedTime(elapsedTime);
  setTime(currTime)
}

const FromHref = "/address/" + transaction?.from;
const ToHref = "/address/" + transaction?.to;
const BlockHref = "/block/" + transaction?.blockNumber;


const handleClick = (href:any) => {
router.replace(href);
}

const setExpanded = (status:boolean) => {
  setExpansion(status)

}


useEffect(() => {
calculateTime()
gasFetch()
}, [])
return (

<div className=" shadow shadow-lg mt-5 p-7 rounded-lg">
<h1 className="font-bold text-[25px]">Transaction Details</h1>
 <div className="flex flex-col w-full py-3">
  <div className="flex flex-row py-3 truncate"><h1>Transaction Hash:&nbsp; </h1><h1 className="truncate">{transaction?.hash}</h1></div>
  <div className="flex flex-row py-3 truncate"><h1>Block Hash:&nbsp; </h1><h1 className="truncate">{transaction?.blockHash}</h1></div>
  <div className="flex flex-row py-3"><h1>Status:&nbsp; </h1><h1>Success</h1></div>
  <div className="flex flex-row py-3"><h1>Block:&nbsp; </h1><button onClick={() => handleClick(BlockHref)} className="text-[#1fade0]">{transaction?.blockNumber}</button></div>
  <div className="flex flex-row py-3"><h1>Timestamp:&nbsp;</h1><h1>{time}</h1></div>
 <span className="flex flex-row py-3">From:&nbsp; <button onClick={() => handleClick(FromHref)} className="truncate text-[#1fade0]">{transaction?.from}</button></span>
 <span className="flex flex-row py-3">To:&nbsp; <button  onClick={() => handleClick(ToHref)} className="truncate text-[#1fade0]">{transaction?.to}</button> </span>
 <div className="flex flex-row py-3"><h1>Value Sent:&nbsp;{valueSent} ETH</h1></div>
 <div className="flex flex-row py-3"><h1>Transaction Fee:&nbsp;{valueSent} ETH</h1></div>
 <div className="flex flex-row py-3"><h1>Gas Limit:&nbsp; </h1><h1>{transaction?.gas}</h1></div>
 <div className="flex flex-row py-3"><h1>Gas Price:&nbsp; </h1><h1>{transaction?.gasPrice}</h1></div>
 <div className="flex flex-row py-3"><h1>Nonce:&nbsp; </h1><h1>{transaction?.nonce}</h1></div>
 {isExpanded == false ?
 <button className="w-fit mx-auto p-3 rounded-lg bg-[#05e69f] font-semibold" onClick={() => setExpanded(true)}>See More Details</button>
 : 
  <div className="">
 <div className="flex flex-row py-3"><h1>Input Data:&nbsp; </h1><h1>{transaction?.input}</h1></div>
 <div className="flex flex-row py-3"><h1>r:&nbsp; </h1><h1>{transaction?.r}</h1></div>
 <div className="flex flex-row py-3"><h1>v:&nbsp; </h1><h1>{transaction?.v}</h1></div>
 <div className="flex flex-row py-3"><h1>ChainId:&nbsp; </h1><h1>{transaction?.chainid}</h1></div>
 <button className="w-fit mx-auto p-3 rounded-lg bg-[#05e69f] font-semibold" onClick={() => setExpanded(false)}>Show Less</button>
 </div> 

 }
 </div>
 </div>

)


}