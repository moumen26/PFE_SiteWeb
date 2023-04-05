import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useLogin = () => {
    const [isloading, setIsLoading] = useState(null);
    const [error, setError] = useState(null);
    const { dispatch } = useAuthContext();

    const login = async (email, password) => {
        setIsLoading(true);
        setError(null);
        
        const reponse = await fetch('http://localhost:4000/user/login', {
                method: "POST",
                headers: {'content-type': 'application/json',
                'Accept': 'application/json'},
                body: JSON.stringify({email: email, password: password})
            });
    
            const json = await reponse.json();
            
            if (!reponse.ok) {
                window.alert("login failed");
                setIsLoading(false);
                setError(json.error);
            }
            if (reponse.ok) {
                window.alert("login success");
                //save the user in local storage
                localStorage.setItem('user', JSON.stringify(json));
                //apdate the auth context
                dispatch({type: 'LOGIN', payload: json});
    
                setIsLoading(false);
            }
        

    };
    return {login, isloading, error};
    
}