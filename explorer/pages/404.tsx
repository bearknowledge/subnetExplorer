import {useRouter} from 'next/router'
import { useEffect } from 'react';

export const Error = () => {
const router = useRouter()
const goBack = () => {
  setTimeout(() => {
  router.push("/")
}, 4000);
}

  useEffect(() => {
   goBack()
  }, [])

  return (
    <div className='flex flex-row justify-center items-center h-screen w-screen'>
<img className='w-[5%] pr-4 border-r-[1px] ' src='/sparq_logo.svg'/>
<h1 className='pl-4 font-bold'>This Block, Transaction, or Address does not exist.</h1>
  </div>
  )
}

export default Error
