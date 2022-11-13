import type { NextPage } from "next";
import { AddressDetails } from "../../../components/addressDetails";
import { Search } from "../../../components/search";
import { Footer } from "../../../components/footer";

const Home: NextPage = () => {

  return (
    <>
    <div className="flex min-h-screen flex-col mobile:p-4 laptop:p-12">
      <Search/>
      <AddressDetails/>
    </div>
    <Footer/>
    </>
  );
};

export default Home;