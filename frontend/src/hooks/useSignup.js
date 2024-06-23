import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { useAuthContext } from '../context/AuthContext';
const useSignup = () => {
    const [loading,setLoading] = useState(false);
    const {setAuthUser} = useAuthContext();
    const signup = async ({fullName,username,password,confirmpassword,gender}) =>{
        const success = handleInputErrors({fullName,username,password,confirmpassword,gender});
        if(!success) return;
        try{
            const res = await fetch("/api/auth/signup",{
                method:"POST",
                headers: {"Content-Type" : "application/json"},
                body:JSON.stringify({fullName,username,password,confirmpassword,gender})

            })

            const data = await res.json();
            if(data.error){
                throw new Error(data.error);
            }

            localStorage.setItem("chat-user",JSON.stringify(data));
            setAuthUser(data);
            // console.log(data);
        }catch(error)
        {
            console.log("hello");
            toast.error(error.message);
        }finally{
            setLoading(false);
        }
    };
    return {loading, signup};

}

export default useSignup;
function handleInputErrors({fullName,username,password,confirmpassword,gender}){
    if(!fullName || !username || !password || !confirmpassword || !gender) 
    {
        //use react hot toast library to generate msg as a notification
        toast.error("Please fill All the fields..!!")
        return false;
    }

    if(password !== confirmpassword)
    {
        
        toast.error("Passwords do not match")
        return false;
    }

    if(password.length < 6)
    {
        toast.error('Passwords must contains at least 6 characters');
        return false;
    }
    
    return true;
}