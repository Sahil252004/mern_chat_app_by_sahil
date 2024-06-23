import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { useAuthContext } from '../context/AuthContext';

const useLogin = () => {
    const [loading,setLoading] = useState(false);
    const { setAuthUser } = useAuthContext();
    const login = async (username, password) => {
        const success = handleInputErrors(username,password);
        if(!success) return;
        setLoading(true)
        try{
            const res = await fetch("/api/auth/login",{
                method: "POST",
                headers: {"Content-Type":"application/json"},
                body: JSON.stringify({username,password})
            })
            const data = await res.json();
            if(data.error){
                throw new Error(data.error);
            }
            localStorage.setItem("chat-user",JSON.stringify(data))
            setAuthUser(data)
        } catch(error){
            toast.error(error.message)
        } finally{
            setLoading(false)
        }
    }
    return {loading,login};

	
};

export default useLogin

function handleInputErrors(username,password){
    if(!username || !password) 
    {
        //use react hot toast library to generate msg as a notification
        toast.error("Please fill All the fields..!!")
        return false;
    }

    if(password.length < 6)
    {
        toast.error('Passwords must contains at least 6 characters');
        return false;
    }
    
    return true;
}