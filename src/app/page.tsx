import Image from 'next/image'
import Link from 'next/link'
import { FcSearch } from "react-icons/fc";
import { CgSearchFound } from "react-icons/cg";
import img1 from '@/data/images/img1.png'
import img2 from '@/data/images/img2.jpg'
import img3 from '@/data/images/img3.png'
import img4 from '@/data/images/img4.png'
import img5 from '@/data/images/img5.png'
import img6 from '@/data/images/img6.png'
import img7 from '@/data/images/img7.png'
import img8 from '@/data/images/img8.png'
import img9 from '@/data/images/img9.png'
import img10 from '@/data/images/img10.png'
import img11 from '@/data/images/img11.png'

const images = [
  img1.src,img2.src, img3.src, img4.src, img5.src, img6.src, img7.src, img8.src, img9.src, img10.src
];
export default function Home() {
  return (
    <>
    <div 
     className='w-full h-100% text-center bg-Landing bg-cover bg-repeat'
    >
      <h1
       className="text-[3.5rem] text-[#032754] font-bold mt-10"
      >Find & Recover with <span
       className='bg-gradient-to-r from-blue-500 via-indigo-600 to-indigo-800 bg-clip-text text-transparent'
      >Ease</span></h1>
      <p
       className='text-blue-700 mt-3 text-[1rem]'
      >
        Experience effortless recovery with our dedicated lost and found service.</p>
      < div className='flex items-center justify-center mt-4'>
       <Link href={'/lost-item'}>
       <button type="button" className="flex items-center gap-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2  mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
          Lost  <FcSearch size={20} />
       </button>
       </Link>
      <Link href={'found-item'}>
      <button type="button" className="flex items-center gap-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2  mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
          Found  <CgSearchFound size={20} />
       </button>
      </Link>
      </div> 
      {/* landing page images */}
      <div className="w-50% h-auto flex justify-center flex-wrap mt-2  md:mx-[4rem] md:mt-3 md:mb-8  md:p-4">
       {images.map((src, index) => (
        <div
         key={index}
         className="w-40 h-40 border rounded-lg overflow-hidden shadow-md p-1 m-3"
        >
         <Image
           src={src}
           alt={`Image ${index + 1}`}
           width={162} // 40rem = 160px
           height={162} // 40rem = 160px
           className="w-full h-full rounded-[0.5rem] object-cover"
         />
        </div>
       ))}

      </div>
    </div>
    </>
  )
}
