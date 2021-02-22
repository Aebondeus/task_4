import { useCallback, useEffect, useState } from "react"
const storage = 'storage';
export const useAuth = () =>{
    const [token, setToken] = useState(null);
    const [id, setId] = useState(null);

    const login = useCallback((jwtToken, userId)=>{
        setToken(jwtToken);
        setId(userId);
        localStorage.setItem(storage, JSON.stringify({userId:userId, token:jwtToken}));
    }, [token, id])

    const logout = useCallback(() => {
        setToken(null);
        setId(null);
        localStorage.removeItem(storage);
    }, [])

    useEffect(() =>{
        const data = JSON.parse(localStorage.getItem(storage));
        if (data && data.token){
            login(data.token, data.userId)
        }
    }, [])

    return {login, logout, token, id}
}

