import React from "react"
import { LatestTransactions } from "./latestTransactions"
import { LatestBlocks } from "./latestBlocks"


export const TransactionBlocks = ({transactions, block, key}: any) => {
console.log(transactions)
return (
<div className="flex flex-row items-center mt-5"> 
<span className="flex flex-col border rounded-lg shadow shadow-xl p-7 mr-4 h-[550px]">
<h1 className="font-semibold">Recent Blocks</h1>
<div className='overflow-y-scroll mt-5'>

{block.map((el: any, index: number) => {
       return (
        <LatestBlocks block={el} key={index}/>
      )
      })} 
</div> 
</span>

<span className="flex flex-col border rounded-lg shadow shadow-xl p-7 mr-4 h-[550px]">
<h1 className="font-semibold">Recent Transactions</h1>
<div className='overflow-y-scroll mt-5'>
     {transactions.map((el: any, index: number) => {
       return <LatestTransactions transaction={el} key={index}/>
      })
      } 
    
      </div>

</span>
</div>

)


}