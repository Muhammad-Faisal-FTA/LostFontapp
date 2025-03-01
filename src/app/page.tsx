import Image from 'next/image'
import { FcSearch } from "react-icons/fc";
import { CgSearchFound } from "react-icons/cg";


export default function Home() {
  return (
    <>
    <div 
     className='w-full h-screen text-center '
    >
      <h1
       className="text-[3.5rem] text-[#032754] font-bold mt-10"
      >Find & Recover with <span
       className='bg-gradient-to-r from-blue-500 via-indigo-600 to-indigo-800 bg-clip-text text-transparent'
      >Ease</span></h1>
      <p
       className='text-[rgba(10, 39, 84, 0.76)] text-[1.4rem]'
      >
        Experience effortless recovery with our dedicated lost and found service.</p>
      < div className='flex items-center justify-center mt-2'>
       <button type="button" className="flex items-center gap-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2  mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
          Lost  <FcSearch size={20} />
       </button>
      <button type="button" className="flex items-center gap-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2  mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
          Found  <CgSearchFound size={20} />
       </button>
      </div> 
      <div className="w-70% h-screen mx-8 bg-slate-400">
        <div></div>
      </div>
    </div>
    </>
  )
}
