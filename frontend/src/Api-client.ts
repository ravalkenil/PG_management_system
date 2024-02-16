import { RegisterFormdata } from "./Pages/Register";
import { SignInFormData } from "./Pages/SignIn";

const API_BASE_URL=import.meta.env.VITE_API_BASE_URL;

export const register= async( formData: RegisterFormdata)=>{
        const response= await fetch(`${API_BASE_URL}/api/users/register`,{
            method:'POST',
            credentials:"include",
            headers:{
                "Content-Type":"application/json"
            },
            body: JSON.stringify(formData),
        })

        const ResponseBody= await response.json();

        if(!response.ok){
            throw new Error(ResponseBody.message);
        }
}

export const signIn = async(formData : SignInFormData)=>{
    const response =  await fetch(`${API_BASE_URL}/api/auth/login`,{
        method :"POST",
        credentials : "include" ,
        headers :{
            "Content-type": "application/json"
        },
        body: JSON.stringify(formData)
    })

    const body= await response.json();
    if (!response.ok) {
        throw new Error(body.message)
    }

    return body;
}


export const validateToken= async()=>{
    const response = await fetch(`${API_BASE_URL}/api/auth/validate_token`,{
        credentials:"include"
    })

    if(!response.ok){
        throw new Error("Token invalid")
    }

    return response.json();
}