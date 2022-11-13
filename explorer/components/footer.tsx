export const Footer = () => {

return (
<footer className="relative bg-[black] text-[white] pt-8 pb-8 px-6 h-[300px]">
<div className="grid grid-cols-9 gap-3">
<div className="flex flex-col justify-center col-span-5">
  <span className="flex mobile:flex-col laptop:flex-row laptop:items-center">
  <h1 className="mobile:text-[12px] laptop:text-[30px]">Powered by</h1>
  <img className="mobile:w-[50%] laptop:w-[20%] laptop:ml-2 " src="sparq.svg"/>
  </span>
  <p className="pt-3">Subplorer is a Block Explorer and Analytics Platform for Sparq Network.</p>
</div>

  <div className="flex flex-col col-span-2">
    <h1 className="font-bold border-b-[1px] border-[white]">Company</h1>
    <ul className="font-extralight space-y-2 mt-3">
      <li>Get started</li>
      <li>Features</li>
      <li>SparqNet bridge</li>
      <li>Partners</li>
    </ul>
  </div>

  <div className="flex flex-col col-span-2">
    <h1 className="font-bold border-b-[1px] border-[white]">Resources</h1>
    <ul className="font-extralight space-y-2 mt-3">
      <li>Github</li>
      <li>Medium</li>
      <li>Twitter</li>
    </ul>

  </div>

</div>
</footer>

)
}