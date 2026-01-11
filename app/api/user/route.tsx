import { currentUser } from "@clerk/nextjs/server";
import { db } from "@/config/db";
import { usersTable } from "@/config/schema"; 
import { NextRequest, NextResponse } from "next/server";
import { eq } from "drizzle-orm";

// req : request from data
export async function POST(req: NextRequest) {
    const user = await currentUser();
    
       console.log("CURRENT USER:", user);

    const users = await db.select().from(usersTable).where(eq(usersTable.email,user?.primaryEmailAddress?.emailAddress as string))
    const age = await req.json();

    if(!users){
        const data = {
            name : user?.fullName ?? '',
            email : user?.primaryEmailAddress?.emailAddress as string,
            age
        }
        //insert to usertable of data value 
        const result = await db.insert(usersTable).values({...data}).returning()
          
    }
    return NextResponse.json(users[0])

}

