import React from "react"
import Link from "next/link"
import { SignInButton } from "@clerk/nextjs"
import Image from "next/image"
import { useUser } from "@clerk/nextjs"
import { Button } from "@/app/components/ui/button"
import { UserButton } from "@clerk/nextjs"
import { SignOutButton } from "@clerk/nextjs"

export function Header (){
    const user = useUser()
    return (
       <div className="flex items-center justify-between px-6 py-3 border">

  {/* LEFT: Logo */}
  <div className="flex items-center gap-2">
    <Image src="/download.png" alt="logo" height={40} width={40} />
    <h2 className="font-semibold">
      <span className="text-primary">UIUX</span> MOCK
    </h2>
  </div>

  {/* CENTER: Navigation */}
  <ul className="flex items-center gap-10 text-lg">
    <li className="hover:text-primary cursor-pointer">
      <Link href="/Home">Home</Link>
    </li>
    <li className="hover:text-primary cursor-pointer">
      <Link href="/pricing">Pricing</Link>
    </li>
  </ul>

  {/* RIGHT: Auth Buttons */}
  <div className="flex items-center gap-4">
    {!user ? (
      <SignInButton mode="modal">
        <Button id="GetStarted">Get Started</Button>
      </SignInButton>
    ) : (
      <>
        <UserButton />
        <SignOutButton />
      </>
    )}
  </div>

</div>

        
    )
}