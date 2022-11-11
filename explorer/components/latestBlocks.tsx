import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import moment from "moment";

export const LatestBlocks = ({ block }: any) => {
  const router = useRouter();
  const [time, setTime] = useState(undefined as any);

console.log(block)

  const calculateTime = () => {
    const elapsedTime: any = moment(block?.timestamp * 1000).fromNow();
    setTime(elapsedTime);
  };

  const handleClick = (href: any) => {
    router.push(href);
  };

  const MinerHref = "address/" + block?.miner;
  const BlockHref = "block/" + block?.number;

  useEffect(() => {
    calculateTime();
  }, []);

  return (
    <div className="flex flex-row py-3">
      <div className="flex flex-col w-1/3">
        <div className="flex flex-row items-center text-[#1fade0]">
          <button
            onClick={() => handleClick(BlockHref)}
            className="text-[#1fade0]"
          >
            Block
          </button>
          <h1 className="ml-1">{block?.number}</h1>
        </div>
        <h2 className="text-[10px]">{time}</h2>
      </div>

      <div className="flex flex-col ml-4">
        <button
          onClick={() => handleClick(MinerHref)}
          className=""
        >
          <div className="flex flex-row items-center">
          <h1>Fee Recipient:</h1>
          <h1 className="ml-1 text-[#1fade0] truncate w-[75%]">{block?.miner}</h1>
          </div>
        </button>
        
        <h1>{block?.transactions.length} Total Txns</h1>
      </div>
      <h1 className="">*Fill In Block Reward*</h1>
    </div>
  );
};
