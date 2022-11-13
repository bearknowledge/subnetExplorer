import type { NextPage } from "next";
import { BlockTransactionDetails } from "../../../../components/blockTransactionDetails";
import { Footer } from "../../../../components/footer";
import { Search } from "../../../../components/search";

const Home: NextPage = () => {

  return (
    <>
    <div className="flex min-h-screen flex-col mobile:p-4 laptop:p-12">
    <Search/> 
      <BlockTransactionDetails/>
    </div>
    <Footer/>
    </>
  );
};

export default Home;