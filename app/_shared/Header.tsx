import React from "react"
import Link from "next/link"
import { SignInButton } from "@clerk/nextjs"
import Image from "next/image"
import { useUser } from "@clerk/nextjs"
import { Button } from "@/app/components/ui/button"
import { UserButton } from "@clerk/nextjs"


export function Header (){
    const user = useUser()
    return (
        <div className="flex  items-center  justify-between  p-4">
            <div className="flex items-center gap-2 ">
                <Image src={"/download.png"} alt="logo " height={40} width={40} className=""/>
                <h2 className="font-semibold"><span className="text-primary">UIUX</span> MOCK</h2>
            </div>  
        <ul className="flex items-center   text-lg  gap-10 p-5 h-7 hover:pointer overflow-hidden rounded-sm w-max">
            <li  className="hover:text-primary cursor-pointer "><Link href="/Home">Home</Link></li>
            <li  className="hover:text-primary cursor-pointer">Pricing</li>
            <li></li>
        </ul>
        
        {!user?<SignInButton mode="modal">
            <Button id="GetStarted">Get Started</Button>
            </SignInButton >:
         <UserButton></UserButton>
        }
         
        </div>   
        
    )
}