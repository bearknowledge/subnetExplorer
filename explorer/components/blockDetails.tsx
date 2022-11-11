import React, { useEffect, useState } from "react"
import { BigNumber, ethers, utils } from "ethers";
import { useRouter } from 'next/router'
import moment from 'moment';
import axios from 'axios';

export const BlockDetails = () => {
const provider = new ethers.providers.JsonRpcProvider("http://localhost:4000");
const [elapsedTime, setElapsedTime] = useState(undefined as any)
const [time, setTime] = useState(undefined as any)
const [gasPrice, setGasPrice] = useState("")
const [data, setData] = useState({} as any)
const [isExpanded, setExpansion] = useState(false)
const router = useRouter();


const fetchBlock = async () => {
  if (!router.isReady) {
    return;
  } else {
    console.log(router.query.block)
    const blockDetails = await axios.get("/api/block/" + router.query.block);
    setData(blockDetails.data[0])
  }
};


// const valueSent = (Number(data?.value)/ 10 ** 18)


const gasFetch = async () => {
    const gas:BigNumber = await provider.getGasPrice();
    const estimate:string = utils.formatUnits(gas, "gwei")
    setGasPrice(estimate)
};


// const calculateTime = async () => {
//   const blockTime: any = await provider.getBlock(data?.blockNumber);
//   const currTime: number = blockTime?.timestamp;
//   const elapsedTime = Math.floor(Date.now()/ 1000) - blockTime.timestamp;
//   setElapsedTime(elapsedTime);
//   setTime(currTime)
// }

const FromHref = "/address/" + data?.from;
const ToHref = "/address/" + data?.to;
const BlockHref = "/block/" + data?.number;


const handleClick = (href:any) => {
router.push(href);
}

const setExpanded = (status:boolean) => {
  setExpansion(status)

}


useEffect(() => {
fetchBlock()
// gasFetch()
}, [router.isReady, router.query.block])
return (

<div className=" shadow shadow-lg mt-5 p-7 rounded-lg">
<h1 className="font-bold text-[25px]">Block# {data?.number}</h1>
 <div className="flex flex-col w-full py-3">
  <div className="flex flex-row py-3"><h1>Block Hash:&nbsp; </h1><h1>{data?.hash}</h1></div>
  <div className="flex flex-row py-3"><h1>Parent Hash:&nbsp; </h1><h1>{data?.parentHash}</h1></div>
  <div className="flex flex-row py-3"><h1>Difficulty:&nbsp; </h1><h1>{data?.difficulty}</h1></div>
  {/* <div className="flex flex-row py-3"><h1>Block:&nbsp; </h1><button onClick={() => handleClick(BlockHref)} className="text-[#1fade0]">{data?.blockNumber}</button></div> */}
  <div className="flex flex-row py-3"><h1>Timestamp:&nbsp;</h1><h1>{data?.timestamp}</h1></div>
 {/* <span className="flex flex-row py-3">From:&nbsp; <button onClick={() => handleClick(FromHref)} className="truncate text-[#1fade0]">{data?.from}</button></span>
 <span className="flex flex-row py-3">To:&nbsp; <button  onClick={() => handleClick(ToHref)} className="truncate text-[#1fade0]">{data?.to}</button> </span> */}
 {/* <div className="flex flex-row py-3"><h1>data Fee:&nbsp;{valueSent} ETH</h1></div> */}
 <div className="flex flex-row py-3"><h1>Gas Limit:&nbsp; </h1><h1>{data?.gasLimit}</h1></div>
 <div className="flex flex-row py-3"><h1>Gas Used:&nbsp; </h1><h1>{data?.gasUsed}</h1></div>
 <div className="flex flex-row py-3"><h1>Nonce:&nbsp; </h1><h1>{data?.nonce}</h1></div>
 {isExpanded == false ?
 <button className="w-fit mx-auto p-3 rounded-lg bg-[#05e69f] font-semibold" onClick={() => setExpanded(true)}>See More Details</button>
 : <></>
}
 {isExpanded == true ?
  <>
 {/* <div className="flex flex-row py-3"><h1>Input Data:&nbsp; </h1><h1>{data?.input}</h1></div>
 <div className="flex flex-row py-3"><h1>r:&nbsp; </h1><h1>{data?.r}</h1></div>
 <div className="flex flex-row py-3"><h1>v:&nbsp; </h1><h1>{data?.v}</h1></div>
 <div className="flex flex-row py-3"><h1>ChainId:&nbsp; </h1><h1>{data?.chainid}</h1></div> */}
 <button className="w-fit mx-auto p-3 rounded-lg bg-[#05e69f] font-semibold" onClick={() => setExpanded(false)}>Show Less</button>
 </> 
 : <></> 
 }
 </div>
 </div>

)


}