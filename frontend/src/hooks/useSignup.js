import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useSignup = () => {
    const [isloading, setIsLoading] = useState(null);
    const [error, setError] = useState(null);
    const { dispatch } = useAuthContext();

    const sign_up = async (email, password, lname, fname, speciality, phone) => {
        setIsLoading(true);
        setError(null);
        
        const reponse = await fetch('http://localhost:8000/user/signup', {
                method: "POST",
                headers: {'content-type': 'application/json',
                'Accept': 'application/json'},
                body: JSON.stringify({email: email, password: password, Lname: lname, Fname: fname, speciality: speciality, phone: phone})
            });
    
            const json = await reponse.json();
            if (!reponse.ok) {
                window.alert("signup failed");
                setError(true);
                setIsLoading(false);
                setError(json.error);
            }
            if (reponse.ok) {
                window.alert("signup success");
                //save the user in local storage
                localStorage.setItem('user', JSON.stringify(json));
                //apdate the auth context
                dispatch({type: 'LOGIN', payload: json});
    
                setIsLoading(false);
            }
        

    };
    return {sign_up, isloading, error};
    
}