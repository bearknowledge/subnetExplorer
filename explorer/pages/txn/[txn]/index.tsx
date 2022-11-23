import type { NextPage } from "next";
import { useEffect, useState } from "react";
import { BigNumber, ethers, utils } from "ethers";
import { TransactionDetails } from "../../../components/transaction";
import { useRouter } from "next/router";
import axios from "axios";
import { Footer } from "../../../components/footer";
import { Search } from "../../../components/search";

const Txn: NextPage = (txn) => {
  const provider = new ethers.providers.JsonRpcProvider(
    "http://localhost:8080/"
  );
  const router = useRouter()
  console.log(router.query.txn);
  const [txnData, setTxnData] = useState({} as any)

  const fetchTxn = async () => {
    if (!router.isReady) {
      return;
    } else {
      const test = await axios.get("/api/txn/" + router.query.txn);
      console.log(test.data)
      if (test.data.length === 0) {
        router.push("/404")
      } else {
        setTxnData(test.data)
      }
    }
  };

  useEffect(() => {
    fetchTxn();
  }, [router.isReady]);

  return (
    <>
    <div className="flex min-h-screen flex-col mobile:p-4 laptop:p-12">
     <Search/>
      <TransactionDetails transaction={txnData[0]} />
    </div>
    <Footer/>
    </>
  );
};

export default Txn;
