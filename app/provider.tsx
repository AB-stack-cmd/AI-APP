"use client"
import React , {useEffect} from "react";
import axios from "axios";
import { currentUser } from "@clerk/nextjs/server";
export function Provider({ children }: { children: React.ReactNode }) {

    useEffect(() => {
       createUserData();
    }, []);

        const createUserData = async () => {
        try {
            const result = await axios.post("/api/user", {});
            console.log("result", result.data);

            console.log({currentUser})

        } catch (error: any) {
            console.log("API error:", error.response?.data);
        }
};


    return (
        <div>{children}</div>
    )
}
   