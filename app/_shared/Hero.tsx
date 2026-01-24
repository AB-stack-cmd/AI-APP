import { Scroll_animation } from "./Scroll"
import { ArrowUpIcon, ChevronDownIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { ChevronRightIcon } from "lucide-react"
import {categoryData} from "./nameShared"
import { ShineBorder } from "@/app/components/ui/shine-border"
import { AnimatedShinyText } from "@/app/components/ui/animated-shiny-text"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/app/components/ui/dropdown-menu"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupText,
  InputGroupTextarea,
} from "@/app/components/ui/input-group"
import { Separator } from "@/app/components/ui/separator"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Cipher } from "crypto"

export function Hero(){
    
        const router = useRouter()
     const [ userinput , setUserInput] = useState<string>()
    return (
        <>
        <button className="border rounded-2xl"><ArrowUpIcon size="20px"/></button>
       
        <div className="  p-2 text-2xl md:px-24 mt:20  items-center">
              <div className="z-10 flex h-10 w-full items-center justify-center  ">
                
                <div
                    className={cn(
                    " rounded-full border border-black/5 bg-neutral-100 text-base text-white x ease-in hover:cursor-pointer transition:all hover:bg-neutral-200 dark:border-white/5 dark:bg-neutral-900 dark:hover:bg-neutral-800"
                    )}
                    >
                  
                    <AnimatedShinyText className="inline-flex items-center justify-center px-4 py-1 transition ease-out hover:text-neutral-600 hover:duration-300 hover:dark:text-neutral-400">
                      
                    <span>✨ Introducing OverFlow </span><ChevronRightIcon/>
                    
                    </AnimatedShinyText>
                        </div>
                     </div>
           <h2 className=" text-center   font-bold p-2  ">Design <span className="text-primary">Quality UIUX</span> </h2>
           <p className=" text-center  text-gray-600 mt-3 p-2">Image Your Idea and Turn to Real </p> 
        </div>
        <p className="text-center p-2 text-gray-600">Create a Highly Impact Digital experieces for your mobile apps and Websites</p>

        <div className=" p-4 flex items-center justify-center w-full gap-6 bg-transparent">
       
            <InputGroup className= "max-w-xl max-h-50 ">
                <InputGroupTextarea placeholder="Bring Your Idea in Real..." value={userinput} onChange={(e)=>setUserInput(e.target.value)}/>
                <InputGroupAddon align="block-end">
               
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                    <InputGroupButton  variant="ghost" className="border !pr-1.5 text-2xs">Select <ChevronDownIcon className="size-3" /></InputGroupButton>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                    
                    align="end"
                    className="[--radius:0.90rem]"
                    >
                    <DropdownMenuItem >WEBSITE</DropdownMenuItem>
                    <DropdownMenuItem>MOBILE</DropdownMenuItem>
               
                    </DropdownMenuContent>
                        </DropdownMenu>
                        <InputGroupText className="ml-auto">
                         <InputGroupButton variant="default" size="sm"
                         className="bg-primary  " onClick={()=>router.push("/Canvas")}> Send </InputGroupButton></InputGroupText>
                        {/* <Separator orientation="vertical" className="!h-4" /> */}

                        {/* <div className=" border rounded-sm p-1 bg-blue-600 ">
                            <button onClick={()=>router?.push("/Home")} className="text-white w-full hover:shadow-2xl">Send</button> 
                        </div> */}
                        
                             
                        {/* <ArrowUpIcon /> */}
                        <span className="sr-only">Send</span>
                       
                        </InputGroupAddon>
                    </InputGroup>
 
                </div>
        
                <div className="gap-4   justify-center mt-4 items-center flex overflow-hidden ">
                {categoryData.map((element,index)=>(
                    <div key={index} className="p-2 border flex justify-center text-center items-center flex-col rounded-2xl max-h-20   "
                    onClick={()=>setUserInput(element?.description)}>
                    <h2 className="text-center  h-20 ">{element?.icon}</h2>
                    <h2 className="text-center w-15 max-h-full overflow-hiddent text-xs ">{element?.name}</h2>
                        </div>
                ))}
                </div>
       
         <Scroll_animation/>
        </>
    )
}