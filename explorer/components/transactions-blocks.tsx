import React from "react"
import { LatestTransactions } from "./latestTransactions"
import { LatestBlocks } from "./latestBlocks"

export const TransactionBlocks = ({transactions, block}: any) => {

return (
<div className="flex mobile:flex-col laptop:flex-row items-center"> 
<span className="flex flex-col rounded-lg shadow shadow-xl p-7  border-b-[7px] border-t-[7px] border-[#05e69f] mobile:w-full mobile:h-[320px] laptop:w-1/2 laptop:h-[550px] laptop:mb-0 laptop:mr-4">
<h1 className="font-semibold">Recent Blocks</h1>
<div className='overflow-y-scroll mt-5 divide-y'>

{block.map((el: any, index:number) => {
       return <LatestBlocks block={el} key={index}/>
      })} 
</div> 
</span>

<span className="flex flex-col border-t-[7px] border-b-[7px] border-[#05e69f] rounded-lg shadow shadow-xl p-7 mobile:w-full mobile:h-[330px] mobile:mt-10 laptop:w-1/2 laptop:mt-0 laptop:h-[550px]">
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