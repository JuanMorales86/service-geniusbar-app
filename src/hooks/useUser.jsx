import { useState, useEffect } from "react";

export default function useUser(user){
    const [loaduser, setLoadUser] = useState();
    

    useEffect(() => {
        if(user){
            setLoadUser(user);
        }
    }, [user]);


    return loaduser
}