"use client";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";


export default function Home() {
  return (
    <>
      <h1>HEllo</h1> <Button onClick={() => alert("Clicked")}>Click me</Button>
      <UserButton/>
    </>
  );
}
