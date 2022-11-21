import { useRouter } from "next/router";
import { useState } from "react";
import axios from "axios";


export const Search = () => {
  const router = useRouter()
  const [NotFound, setNotFound] = useState(false)
  const [Active, setActive] = useState(false)

  const searchAll = async (e: any) => {
    e.preventDefault()
    let send:any;
    const data = new FormData(e.target);
    const input = String(data.get("search"))

    try {
    if (input.length === 66) {
      const exists = await axios.get("/api/txn/" + input);
      if (exists.data[0] === undefined) {
          throw "Not Found"
      } else {
        send = "/txn/" + input
      }

    } else if (input.length === 42) {
      const exists = await axios.get("/api/address/" + input);
      if (exists.data[0] === undefined) {
        throw "Not Found"
    } else {
      send = "/address/" + input
    }
    } else if (/^\d+$/.test(input)) {
      const exists = await axios.get("/api/block/" + input);
      if (exists.data[0] === undefined) {
        throw "Not Found"
    } else {
      send = "/block/" + input
    }
    } 

    router.push(send);
    }  catch (err) {
      console.log(err)
      setNotFound(true)
      setTimeout(() => {
        setNotFound(false)
      }, 4000);
    }
    
    }

    // const handleClick = (bool:boolean) => {
    //   setActive(bool)
    // }
  



  return (
    <>
    <a href="/" className="font-bold mobile:text-[20px] laptop:text-[50px] flex flex-row items-center w-fit"><img className="w-[7%] mr-3" src="/sparq_logo.svg" /> Subplorer</a>
    <form className="flex mt-3 flex-row mobile:w-full" onSubmit={searchAll}>
    <input
      // onFocus={() => handleClick(true)}
      // onBlur={() => handleClick(false)}
      id="search"
      autoComplete="off"
      name="search"
      type="string"
      list="promotions"
      placeholder="Search by Address / Txn Hash / Block"
      className=" border rounded-l-md px-3 py-2 mobile:w-full laptop:w-1/3 focus:outline-none focus:border-[#05e69f]"
    />

    <button type="submit" className="rounded-r-full bg-[#05e69f] flex flex-row justify-center items-center">
      <img className=" mx-3 my-2 w-[22px]" src="/search.svg" />
    </button>
    </form>
    { Active === true ?
    <a href="https://twitter.com/SparqNet" className="relative laptop:w-1/3 flex flex-row items-center bg-slate-300 px-3 py-4">Promoted - Follow us on Twitter!</a>
    : <></> }

    { NotFound === true ? 
      <h1 className="mt-3 text-[red]">Not Found</h1> : <></>
  }
    </>

  )

}