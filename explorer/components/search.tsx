import { useRouter } from "next/router";


export const Search = () => {
  const router = useRouter()

  const searchAll = async (e: any) => {
    e.preventDefault()
    let send:any;
    const data = new FormData(e.target);
    const input = String(data.get("search"))
    if (input.length === 66) {
      send = "/txn/" + input
    } else if (input.length === 42) {
      send = "/address/" + input
    } else if (/^\d+$/.test(input)) {
      send = "/block/" + input
    } else {
      alert("failed")
    }
    router.push(send);
    }



  return (
    <>
    <h1 className="font-bold mobile:text-[20px] laptop:text-[50px]">Subplorer</h1>
    <form className="flex flex-row mobile:w-full" onSubmit={searchAll}>
    <input
      id="search"
      name="search"
      type="string"
      placeholder="Search by Address / Txn Hash / Block"
      className=" border rounded-l-full px-3 py-2 mobile:w-full laptop:w-1/3"
    ></input>
    <button type="submit" className="rounded-r-full bg-[#05e69f] flex flex-row justify-center items-center">
      <img className=" mx-3 my-2 w-[22px]" src="/search.svg" />
    </button>
    </form>
    </>

  )

}