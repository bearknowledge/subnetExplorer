export const Footer = () => {

return (
<footer className="relative bg-[black] text-[white] pt-8 pb-8 px-6 h-[300px]">
<div className="grid grid-cols-9  tablet:gap-3">
<div className="flex flex-col justify-center mobile:col-span-3 laptop:col-span-5 ">
  <span className="flex mobile:flex-col laptop:flex-row laptop:items-center">
  <h1 className="mobile:text-[12px] laptop:text-[30px]">Powered by</h1>
  <img className="mobile:w-[50%] laptop:w-[20%] laptop:ml-2 " src="/sparq.svg"/>
  </span>
  <p className="pt-3">Subplorer is a Block Explorer and Analytics Platform for Sparq Network.</p>
</div>

<span className="tablet:hidden"></span>

  <div className="flex flex-col col-span-2">
    <h1 className="font-bold border-b-[1px] border-[white]">Company</h1>
    <ul className="font-extralight space-y-2 mt-3">
    <li><a href="https://sparq.network/#Features" target="blank">Features</a></li>
      <li><a href="https://sparq.network/privacypolicy.html" target="blank">Privacy Policy</a></li>
      <li><a href="https://sparq.network/termsandconditions.html" target="blank">Terms & Conditions</a></li>
      <li><a href="https://sparq.network/#Partners" target="blank">Partners</a></li>
    </ul>
  </div>

  <span className="tablet:hidden"></span>

  <div className="flex flex-col col-span-2">
    <h1 className="font-bold border-b-[1px] border-[white]">Resources</h1>
    <ul className="font-extralight space-y-2 mt-3">
      <li><a href="https://github.com/SparqNet/" target="blank">Github</a></li>
      <li><a href="https://medium.com/@SparqNet" target="blank">Medium</a></li>
      <li><a href="https://twitter.com/SparqNet/" target="blank">Twitter</a></li>
    </ul>

  </div>

</div>
</footer>

)
}