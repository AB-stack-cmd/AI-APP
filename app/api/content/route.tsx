
import { NextRequest,NextResponse } from "next/server"
import { useUser } from "@clerk/nextjs"
import { currentUser } from "@clerk/nextjs/server"
import { ProjectTable } from "@/config/schema";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API);
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
export async function POST(req:NextRequest) {
    const user = await currentUser();
    if(!user || !user.emailAddresses){
        return NextResponse.json(
            { error: "Unauthorized" },
            { status: 401 })
    }

    const result = await model.generateContent("whai is genai")
    const respone =await result.response;


    console.log("gemini-",respone.text())
   return  NextResponse.json({message:"working.."})
}