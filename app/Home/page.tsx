'use client'
// import { useRouter } from "next/navigation";
import { useState } from "react"
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";


export default function HomePage() {
     const Router = useRouter();
    return(      
        <>
        
        <div className=" flex  flex-col text-center p-2 gap-4 " >
            <h2 className="">Welcom to Overflow </h2>
            <p >Great to see you are you ready to start Design .</p>
            
        </div>
          <div className="flex justify-center p-10 ">
            <button onClick={()=> Router.push("/")} className="bg-blue-800 border rounded-4xl text-white p-3 hover:bg-blue-950 hover:shadow-black">Get Started</button>
          </div>  
       
        </>
        
    )
}

