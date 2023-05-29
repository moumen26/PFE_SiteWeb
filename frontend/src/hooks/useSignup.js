import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import { useNavigate } from "react-router-dom";

export const useSignup = () => {
    const [isloading, setIsLoading] = useState(null);
    const [error, setError] = useState(null);
    const { dispatch } = useAuthContext();
    const navigate = useNavigate();
    const sign_up = async (email, password, lname, fname, speciality, phone, Hopital) => {
        setIsLoading(true);
        setError(null);
        
        const reponse = await fetch('http://localhost:8000/user/signup', {
                method: "POST",
                headers: {'content-type': 'application/json',
                'Accept': 'application/json'},
                body: JSON.stringify({email: email, password: password, Lname: lname, Fname: fname, speciality: speciality, phone: phone, Hopital: Hopital})
            });
    
            const json = await reponse.json();
            if (!reponse.ok) {
                setError(true);
                setIsLoading(false);
                setError(json.error);
                window.alert(json.message);
            }
            if (reponse.ok) {
                window.alert("signup success now wait for your validation");
            }
        

    };
    return {sign_up, isloading, error};
    
}