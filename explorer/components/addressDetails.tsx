import React, { useEffect, useState } from "react"
import { BigNumber, ethers, utils } from "ethers";
import { useRouter } from 'next/router'
import moment from 'moment';
import axios from 'axios';

export const AddressDetails = () => {
const provider = new ethers.providers.JsonRpcProvider("http://localhost:4000");
const [balance, setBalance] = useState(0)
const [isExpanded, setExpansion] = useState(false)
const [addrArray, setAddrArray] = useState([])
const router = useRouter();
const address: string = String(router.query.address)

const fetchAdd = async () => {
  if (!router.isReady) {
    return;
  } else {
    const test = await axios.get("/api/address/" + router.query.address);
    setAddrArray(test.data)
    console.log(test)
  }
};

const getBalance = async () => {
  if (!router.isReady) {
    return;
  } else {
    const balance:BigNumber = await provider.getBalance(address);
    const estimate:number = Number(Number(utils.formatEther(balance)).toFixed(2))
    setBalance(estimate)
}
}

const handleClick = (href:any, type:string) => {
  let send;
  if (type === "to" || type === "from") {
    send = "/address/" + href
  } else if (type === "txn") {
    send = "/txn/" + href
  } else {
    send = "/block/" + href
  }

router.push(send);
}

const setExpanded = (status:boolean) => {
  setExpansion(status)

}


useEffect(() => {
  fetchAdd()
  getBalance()
}, [router.isReady]);


useEffect(() => {
}, [router.query.address])


return ( 
  <div>

    <div className=" w-[49%] shadow shadow-lg rounded-lg flex flex-col divide-y mt-5">
    <h1 className="p-4 font-bold">Overview</h1>
    <h1 className="p-4">Address:&nbsp;{address}</h1>
    <h1 className="p-4">Native Token Balance:&nbsp;{balance}</h1>
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

      {addrArray?.map((el:any) => (
          <>
         <button onClick={() => handleClick(el?.to, "txn")} className="truncate col-span-2">{el?.hash}</button>
          <h1 className="col-span-1">Method</h1>
          <a className="col-span-1">{el?.blockNumber}</a>
            <h1 className="col-span-1">{moment(new Date(el?.timestamp * 1000)).fromNow()}</h1>
            <a className="truncate col-span-1">{el?.from}</a>
            <button onClick={() => handleClick(el?.to, "to")} className="truncate text-[#1fade0] truncate col-span-1">{el?.to}</button>
          <h1 className="col-span-1">{el?.value / 10 ** 18} ETH</h1>
          <h1 className="col-span-1">{el?.gas * el?.gasPrice / 10 ** 18}</h1>
          </>
      ))}

  </div>
  </div>
)

}