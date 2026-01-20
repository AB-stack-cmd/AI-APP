import { Scroll_animation } from "./Scroll"
import { ChevronDownIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { ChevronRightIcon } from "lucide-react"

import { AnimatedShinyText } from "@/components/ui/animated-shiny-text"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupText,
  InputGroupTextarea,
} from "@/components/ui/input-group"
import { Separator } from "@/components/ui/separator"


export function Hero(){
    return (
        <>
        <div className="  p-2 text-2xl md:px-24 mt:20">
              <div className="z-10 flex h-10 w-full items-center justify-center ">
                <div
                    className={cn(
                    " rounded-full border border-black/5 bg-neutral-100 text-base text-white x ease-in hover:cursor-pointer transition:all hover:bg-neutral-200 dark:border-white/5 dark:bg-neutral-900 dark:hover:bg-neutral-800"
                    )}
                    >
                    <AnimatedShinyText className="inline-flex items-center justify-center px-4 py-1 transition ease-out hover:text-neutral-600 hover:duration-300 hover:dark:text-neutral-400">
                    <span>✨ Introducing Magic UI</span><ChevronRightIcon/>
                    
                    </AnimatedShinyText>
                        </div>
                     </div>
           <h2 className=" text-center   font-bold  ">Design <span className="text-primary">Quality UIUX</span> </h2>
           <p className=" text-center  text-gray-600 mt-3 p-2">Image Your Idea and Turn to Real </p> 
        </div>
        <p className="text-center p-3">Create a Highly Impact Digital experieces for your mobile apps and Websites</p>

        <div className=" p-2 flex items-center justify-center w-full gap-6 bg-transparent">
       
            <InputGroup className= "max-w-xl max-h-50 ">
                <InputGroupTextarea placeholder="Bring Your Idea in Real..." />
                <InputGroupAddon align="block-end">
               
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                    <InputGroupButton  variant="ghost" className="!pr-1.5 text-2xs">Select <ChevronDownIcon className="size-3" /></InputGroupButton>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                    side="top"
                    align="start"
                    className="[--radius:0.90rem]"
                    >
                    <DropdownMenuItem >WEBSITE</DropdownMenuItem>
                    <DropdownMenuItem>MOBILE</DropdownMenuItem>
                    {/* <DropdownMenuItem>Manual</DropdownMenuItem> */}
                    </DropdownMenuContent>
                        </DropdownMenu>
                        <InputGroupText className="ml-auto">52% used</InputGroupText>
                        <Separator orientation="vertical" className="!h-4" />
                        <InputGroupButton
                            variant="default"
                            className="rounded-full "
                            size="icon-xs"
                            disabled
                                >
                        {/* <ArrowUpIcon /> */}
                        <span className="sr-only">Send</span>
                        </InputGroupButton>
                        </InputGroupAddon>
                    </InputGroup>
 
        </div>
         <Scroll_animation/>
        </>
    )
}