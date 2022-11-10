import React from "react"
import { LatestTransactions } from "./latestTransactions"
import { LatestBlocks } from "./latestBlocks"

export const TransactionBlocks = ({transactions, block}: any) => {

return (
<div className="flex mobile:flex-col laptop:flex-row items-center mt-5"> 
<span className="flex flex-col border rounded-lg shadow shadow-xl p-7 h-[550px] mobile:w-full mobile:mb-4 laptop:w-1/2 laptop:mb-0 laptop:mr-4">
<h1 className="font-semibold">Recent Blocks</h1>
<div className='overflow-y-scroll mt-5 divide-y'>

{block.map((el: any, index:number) => {
       return <LatestBlocks block={el} key={index}/>
      })} 
</div> 
</span>

<span className="flex flex-col border rounded-lg shadow shadow-xl p-7 h-[550px] mobile:w-full laptop:w-1/2 laptop:mr-4">
<h1 className="font-semibold">Recent Transactions</h1>
<div className='overflow-y-scroll mt-5 divide-y'>
     {transactions.map((el: any, index:number) => {
       return <LatestTransactions transaction={el} key={index}/>
      })
      } 
    
      </div>

</span>
</div>

)


}