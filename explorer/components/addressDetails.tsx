import React, { useEffect, useState } from "react"
import { BigNumber, ethers, utils } from "ethers";
import { useRouter } from 'next/router'
import moment from 'moment';
import axios from 'axios';

export const AddressDetails = () => {
const provider = new ethers.providers.JsonRpcProvider("http://localhost:8080");
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
    if (test.data == undefined) {
      router.push("/404")
    } else {
      setAddrArray(test.data)
    }
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
}, [router.isReady, router.query.address]);



return ( 
  <div className="">

    <div className=" shadow shadow-lg rounded-lg flex flex-col divide-y mt-5 laptop:w-[49%] mobile:w-full">
    <h1 className="p-4 font-bold">Overview</h1>
    <h1 className="p-4 truncate">Address:&nbsp;{address}</h1>
    <h1 className="p-4">Native Token Balance:&nbsp;{balance}</h1>
    </div>
   


<div className="p-7 mt-5 shadow shadow-lg rounded-lg overflow-x-auto">
<table className="w-[1500px]">
  <thead className="text-left">
      <th scope="col" className="w-[200px]">Txn Hash</th>
      <th scope="col" className="w-[100px]" >Method</th>
      <th scope="col" className="w-[80px]" >Block</th>
      <th scope="col" className="w-[125px]"  >Age</th>
      <th scope="col" className="w-[200px]" >From</th>
      <th scope="col" className="w-[200px]"  >To</th>
      <th scope="col" className="w-[80px]"  >Value</th>
      <th scope="col" className="w-[80px]"  >Txn Fee</th>
  </thead>
  <tbody className="divide-y">
      {addrArray?.map((el:any) => (
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