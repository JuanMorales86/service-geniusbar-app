import { useState, useEffect } from "preact/hooks";

export default function useUser(user){
    console.log(user)
    const [loaduser, setLoadUser] = useState();
    

    useEffect(() => {
        if(user){
            setLoadUser(user);
        }
    }, [user]);

    console.log(loaduser)

    return loaduser
}