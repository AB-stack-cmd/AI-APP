"use client"
import React , {useEffect , useState} from "react";
import axios from "axios";
import { UserDetailContext } from "@/context/UserDetailContext";
export function Provider({ children }: { children: React.ReactNode }) {

      const[userData , setUserdata] = useState();
    useEffect(() => {
       createUserData();
    }, []);

        const createUserData = async () => {
        try {
            const result = await axios.post("/api/user", {});
            console.log("result", result.data);

          

            setUserdata(result.data);

        } catch (error: any) {
            console.log("API error:", error.response?.data);
        }
};


    return (
        
         <><UserDetailContext.Provider value={{userData , setUserdata}}>

          <div>{children}</div>
          </UserDetailContext.Provider></>
    )
}
   