import React, { useEffect, useState } from "react"
import { BigNumber, ethers, utils } from "ethers";
import { useRouter } from 'next/router'
import Link from 'next/link'

export const AddressDetails = (details:any) => {
const provider = new ethers.providers.JsonRpcProvider("http://localhost:4000");
const [elapsedTime, setElapsedTime] = useState(undefined as any)
const [time, setTime] = useState(undefined as any)
const [gasPrice, setGasPrice] = useState("")
const [isExpanded, setExpansion] = useState(false)
const [addrArray, setAddrArray] = useState([])
const router = useRouter();

const valueSent = (Number(details?.value)/ 10 ** 18)


const gasFetch = async () => {
    const gas:BigNumber = await provider.getGasPrice();
    const estimate:string = utils.formatUnits(gas, "gwei")
    setGasPrice(estimate)
};


const calculateTime = async () => {
  const blockTime: any = await provider.getBlock(details?.blockNumber);
  const currTime: number = blockTime?.timestamp;
  const elapsedTime = Math.floor(Date.now()/ 1000) - blockTime.timestamp;
  setElapsedTime(elapsedTime);
  setTime(currTime)
}

const FromHref = "/address/" + details?.from;
const ToHref = "/address/" + details?.to;
const BlockHref = "/block/" + details?.blockNumber;


const handleClick = (href:any) => {
router.replace(href);
}

const setExpanded = (status:boolean) => {
  setExpansion(status)

}

const setData = () => {
  if (details == undefined) {
    return;
  } else {
    setAddrArray(details.details)
  }
 
}


useEffect(() => {
calculateTime()
gasFetch()
setData()
}, [details])

return ( 
  <div>

    <div className=" w-[49%] shadow shadow-lg rounded-lg flex flex-col divide-y mt-5">
    <h1 className="p-4 font-bold">Overview</h1>
    <h1 className="p-4">Address:</h1>
    <h1 className="p-4">Native Token Balance</h1>
    </div>
   



<div className="grid grid-cols-9 gap-4 mt-5 shadow shadow-lg p-7 rounded-lg">
      <h1 className="col-span-2">Txn Hash</h1>
      <h1>Method</h1>
      <h1>Block</h1>
      <h1>Age</h1>
      <h1>To</h1>
      <h1>From</h1>
      <h1>Value</h1>
      <h1>Txn Fee</h1>

      {addrArray?.map((el:any) => (
          <>
          <h1 className="truncate col-span-2">{el?.hash}</h1>
          <h1 className="col-span-1">Method</h1>
          <a className="col-span-1">{el?.blockNumber}</a>
          <h1 className="col-span-1">Age</h1>
          <a className="truncate col-span-1">{el?.to}</a>
          <a className="truncate col-span-1">{el?.from}</a>
          <h1 className="col-span-1">{el?.value / 10 ** 18} ETH</h1>
          <h1 className="col-span-1">{el?.gas * el?.gasPrice / 10 ** 18}</h1>
          </>
      ))}

  </div>
  </div>
)


 

{/* <h1 className="font-bold text-[25px]">details Details</h1>
 <div className="flex flex-row w-full py-3">
  <div className="flex flex-row py-3"><h1>details Hash:&nbsp; </h1><h1>{details?.hash}</h1></div>
  <div className="flex flex-row py-3"><h1>Block Hash:&nbsp; </h1><h1>{details?.blockHash}</h1></div>
  <div className="flex flex-row py-3"><h1>Status:&nbsp; </h1><h1>Success</h1></div>
  <div className="flex flex-row py-3"><h1>Block:&nbsp; </h1><button onClick={() => handleClick(BlockHref)} className="text-[#1fade0]">{details?.blockNumber}</button></div>
  <div className="flex flex-row py-3"><h1>Timestamp:&nbsp;</h1><h1>{time}</h1></div>
 <span className="flex flex-row py-3">From:&nbsp; <button onClick={() => handleClick(FromHref)} className="truncate text-[#1fade0]">{details?.from}</button></span>
 <span className="flex flex-row py-3">To:&nbsp; <button  onClick={() => handleClick(ToHref)} className="truncate text-[#1fade0]">{details?.to}</button> </span>
 <div className="flex flex-row py-3"><h1>Value Sent:&nbsp;{valueSent} ETH</h1></div>
 <div className="flex flex-row py-3"><h1>details Fee:&nbsp;{valueSent} ETH</h1></div>
 <div className="flex flex-row py-3"><h1>Gas Limit:&nbsp; </h1><h1>{details?.gas}</h1></div>
 <div className="flex flex-row py-3"><h1>Gas Price:&nbsp; </h1><h1>{details?.gasPrice}</h1></div>
 <div className="flex flex-row py-3"><h1>Nonce:&nbsp; </h1><h1>{details?.nonce}</h1></div>
 {isExpanded == false ?
 <button className="w-fit mx-auto p-3 rounded-lg bg-[#05e69f] font-semibold" onClick={() => setExpanded(true)}>See More Details</button>
 : <></>
}
 {isExpanded == true ?
  <>
 <div className="flex flex-row py-3"><h1>Input Data:&nbsp; </h1><h1>{details?.input}</h1></div>
 <div className="flex flex-row py-3"><h1>r:&nbsp; </h1><h1>{details?.r}</h1></div>
 <div className="flex flex-row py-3"><h1>v:&nbsp; </h1><h1>{details?.v}</h1></div>
 <div className="flex flex-row py-3"><h1>ChainId:&nbsp; </h1><h1>{details?.chainid}</h1></div>
 <button className="w-fit mx-auto p-3 rounded-lg bg-[#05e69f] font-semibold" onClick={() => setExpanded(false)}>Show Less</button>
 </> 
 : <></> 
 }
 </div> */}
//  </div>




}