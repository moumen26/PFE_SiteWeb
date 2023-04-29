import { useState } from "react";

export const useAddPatient = () => {
    
    const [error, setError] = useState(null);

    const AddPatient = async (Date_daccouchement, Heure_daccouchement) => {
        
        try{
            
            const reponse = await fetch('http://localhost:8000/addpatients/patient', {
                method: "POST",
                headers: {'content-type': 'application/json',
                'Accept': 'application/json'},
                body: JSON.stringify({Date_daccouchement: Date_daccouchement,Heure_daccouchement: Heure_daccouchement})
            });
    
            const json = await reponse.json();
            
            if (!reponse.ok) {
                window.alert("Add patient failed",json.error);
                setError(json.error);
            }
            if (reponse.ok) {
                window.alert("Add patient success", json.message);
            } 
        }catch(err){
            window.alert(err)
        }
        

        
    };
    return { AddPatient,  error};
    
}