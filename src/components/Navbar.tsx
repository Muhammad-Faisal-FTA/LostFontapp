"use client";
import React, { useState } from "react";
import { HoveredLink, Menu, MenuItem, ProductItem } from "./ui/navbar-menu";
// import { cn } from "@/lib/utils";
import Link from 'next/link';
import logo from '@/constants/Logo.png'
import Image from "next/image";

const Navbar = ({className }: { className?: string }) => {
    const [active, setActive] = useState<string | null>(null);
  return (
    <div 
       className="mt-3"
    >
      <Menu setActive={setActive} >
        <div className="flex  justify-around items-center">
          <Link href={'/'}>
           <Image src={logo} alt="Logo" width={100} height={90} />
          </Link>
        <h1 className="text-black text-3xl font-bold">Lost & Found</h1>
        </div>
        {/* Navbar items */}
        <div className="w-[60%]  flex p-5 px-[1rem] justify-around  items-center ">
       <Link href={'/lost-item'}>
       <MenuItem setActive={setActive} active={active} item="Lost"></MenuItem>
       </Link> 

       <Link href={'/post-lost'}>
       <MenuItem setActive={setActive} active={active} item="ReportLost"></MenuItem>
       </Link> 

       <Link href={'/found-item'}>
       <MenuItem setActive={setActive} active={active} item="Found"></MenuItem>
       </Link> 

       <Link href={'post-find'}>
       <MenuItem setActive={setActive} active={active} item="ReportFound"></MenuItem>
       </Link> 
       
       <Link href={'/profile'}>
       <MenuItem setActive={setActive} active={active} item="Profile"></MenuItem>
       </Link> 
       
       <Link href={'/sign-In'}>
       <MenuItem setActive={setActive} active={active} item="Login"></MenuItem>
       </Link> 
        <Link href={'/sign-Up'}>
        <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
          Sign Up
          </button>
        </Link>
        </div>
      </Menu>
    </div>
  )
}

export default Navbar
