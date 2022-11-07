import React from "react"


export const LatestBlocks = ({block, key}: any) => {

  const elapsedTime:number = Math.floor(Date.now()/ 1000) - block?.timestamp
return (
<div className="flex flex-row items-center"> 
<div className="flex flex-col items-center">
 <h1>{block?.number}</h1>
 <h2>{elapsedTime}</h2>
 <h2>Seconds Ago</h2>
 </div>
 <div className="flex flex-col ">
 <h1 className="ml-4">{block?.miner}</h1>
 <h1 className="ml-4">{block?.transactions.length} Total Txns</h1>
 </div>
 <h1 className="ml-4">*Fill In Block Reward*</h1>

</div>
)


}