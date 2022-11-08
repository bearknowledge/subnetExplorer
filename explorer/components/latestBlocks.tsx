import React, { useState, useEffect } from "react"


export const LatestBlocks = ({block}: any) => {
  const [time, setTime] = useState(undefined as any)

 const calculateTime = () => {
  const elapsedTime:number = Math.floor(Date.now()/ 1000) - block?.timestamp
  setTime(elapsedTime)
 }


  useEffect(() => {
    calculateTime();
  }, [])
return (
<div className="flex flex-row py-3"> 
<div className="flex flex-col">
 <h1>Block {block?.number}</h1>
 <h2 className="text-[10px]">{time} Seconds Ago</h2>
 </div>
 <div className="flex flex-col ">
 <h1 className="ml-4">Miner: {block?.miner}</h1>
 <h1 className="ml-4">{block?.transactions.length} Total Txns</h1>
 </div>
 <h1 className="ml-4">*Fill In Block Reward*</h1>

</div>
)


}