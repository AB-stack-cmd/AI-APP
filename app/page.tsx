"use client";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";
import { Header } from "./_shared/Header";
import { Hero } from "./_shared/Hero";

export default function Home() {
  return (
    <>
    
     <div>
         <Header/>
         <Hero/>
         <div className="absolute -top-40 -left-40 h-[500px] w-[500px]
         bg-purple-400/20 blur-[120px]" ></div>


      </div>
     
    </>
  );
}
