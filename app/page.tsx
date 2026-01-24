"use client";
import Image from "next/image";
import { Button } from "@/app/components/ui/button";
import { UserButton } from "@clerk/nextjs";
import { Header } from "./_shared/Header";
import { Hero } from "./_shared/Hero";
export default function Home() {
  return (
    <>
    
     <div>
      <Header/>
      <Hero/>
         {/* <HomePage/> */}
         {/* <Main/> */}
         
      </div>
     
    </>
  );
}
