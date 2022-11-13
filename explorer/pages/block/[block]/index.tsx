import type { NextPage } from "next";
import { BlockDetails } from "../../../components/blockDetails";
import { Footer } from "../../../components/footer";
import { Search } from "../../../components/search";

const Home: NextPage = () => {

  return (
    <>
    <div className="flex min-h-screen flex-col mobile:p-4 laptop:p-12">
     <Search/>
      <BlockDetails/>
    </div>
    <Footer/>
    </>
  );
};

export default Home;
