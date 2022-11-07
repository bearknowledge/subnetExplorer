import React from "react"
import { BigNumber, ethers, utils } from "ethers";

export const LatestTransactions = ({transaction, key}: any) => {
  const elapsedTime:number = Math.floor(Date.now()/ 1000) - transaction?.timestamp
  console.log(transaction)

  if (transaction == undefined || transaction == null) {
  } else {
    transaction = transaction[0]
  }
return (

<div className="flex flex-row items-center"> 
<div className="flex flex-col items-center">
 {/* <h1>{transaction}</h1> */}
 <h2>{elapsedTime}</h2>
 <h2>Seconds Ago</h2>
 </div>
 <div className="flex flex-col ">
 <h1 className="ml-4">From: {transaction?.from}</h1>
 <h1 className="ml-4">To: {transaction?.to} Total Txns</h1>
 </div>
 <h1 className="ml-4">*Fill In Amount*</h1>

</div>
)


}