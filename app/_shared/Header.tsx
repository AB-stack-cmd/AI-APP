import React from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
export function Header (){
    return (
        <div className="flex border-black  items-center  justify-between  p-4">
            <div className="flex items-center gap-2 ">
                <Image src={"/download.png"} alt="logo " height={40} width={40}/>
                <h2 className="font-semibold"><span className="text-primary">UIUX</span> MOCK UP</h2>
            </div>  
        <ul className="flex items-center gap-5 text-lg ">
            <li className="hover:text-primary cursor-pointer">Home</li>
            <li  className="hover:text-primary cursor-pointer">Pricing</li>
            <li></li>
        </ul>
          <Button>Get Started</Button>
        </div>   
        
    )
}