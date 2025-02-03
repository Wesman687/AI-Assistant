import Image from 'next/image'
import React from 'react'
import { assets } from "@/assets/assets";

const Nav = () => {
  return (
    <div className="flex items-center justify-between text-[22px] p-5 text-[#585858]">
        <p>Ai Assistant</p>
        <Image src={assets.user_icon} alt="" className="w-10 rounded-full" />
        
      </div>
  )
}

export default Nav