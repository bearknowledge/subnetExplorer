import React, { useEffect, useState } from "react"
import { BigNumber, ethers, utils } from "ethers";
import { useRouter } from 'next/router'
import moment from 'moment';
import axios from 'axios';

export const BlockDetails = () => {
const provider = new ethers.providers.JsonRpcProvider("http://localhost:8080");
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
    const blockDetails = await axios.get("/api/block/" + router.query.block);
    if (blockDetails.data[0] == undefined) {
      router.push("/404")
    } else {
      setData(blockDetails.data[0])
    }
    
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


const handleClick = (href:any, type:string) => {
  let send;
  if (type === "addr") {
    send = "/address/" + href
  } else {
    send = "/block/" + href + "/transactions"
  }
router.push(send);
}

const setExpanded = (status:boolean) => {
  setExpansion(status)

}


useEffect(() => {
fetchBlock()
// gasFetch()
}, [router.isReady, router.query.block])
return (

<div className="w-full shadow shadow-lg mt-5 p-7 rounded-lg">
<h1 className="font-bold text-[25px]">Block# {data?.number}</h1>
 <div className="flex flex-col w-full py-3">
  <div className="flex flex-row py-3 truncate"><h1>Block Hash:&nbsp; </h1><h1 className="truncate">{data?.hash}</h1></div>
  <div className="flex flex-row py-3 truncate"><h1>Parent Hash:&nbsp; </h1><h1  className="truncate">{data?.parentHash}</h1></div>
  <div className="flex flex-row py-3"><h1>Difficulty:&nbsp; </h1><h1>{data?.difficulty}</h1></div>
  <div className="flex flex-row py-3 truncate"><h1>Fee Recipient:&nbsp; </h1><button className="w-fit text-[#1fade0] truncate" onClick={() => handleClick(data?.miner, "addr")}>{data?.miner}</button></div>
  <div className="flex flex-row py-3 items-center"><button className=" w-fit" onClick={() => handleClick(data?.number, "block")}><h1 className="text-[#1fade0] bg-gray-200 rounded-md px-3 py-2">{data?.transactions?.length} Transaction(s)</h1></button><h1>&nbsp;in this block</h1></div>
<div className="flex flex-row py-3"><h1>Timestamp:&nbsp;</h1><h1>{data?.timestamp},&nbsp;{moment(data?.timestamp * 1000).fromNow()}</h1></div>
<div className="flex flex-row py-3"><h1>Gas Limit:&nbsp; </h1><h1>{data?.gasLimit}</h1></div>
 <div className="flex flex-row py-3"><h1>Gas Used:&nbsp; </h1><h1>{data?.gasUsed}</h1></div>
 <div className="flex flex-row py-3"><h1>Nonce:&nbsp; </h1><h1>{data?.nonce}</h1></div>
 <div className="flex flex-row py-3"><h1>Extra Data:&nbsp; </h1><h1>{data?.extraData}</h1></div>

 
 </div>
 </div>

)


}



