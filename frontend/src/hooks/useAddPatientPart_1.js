import { useState } from "react";

export const useAddPatientPart_1 = () => {
    const [isloading, setIsLoading] = useState(null);
    const [error, setError] = useState(null);


    const AddPatientPart_1 = async (Accoucheur, Poids, Aspect, Anomalies, Placenta, Membranes, Cordon
        ,Sexe, Taille, Pc, une_min, cinq_min, Malformation, Remarque, Empreintes_digitales) => {
        setIsLoading(true);
        setError(null);
        
        try{
            
            const reponse = await fetch('http://localhost:8000/addpatients', {
                method: "POST",
                headers: {'content-type': 'application/json',
                'Accept': 'application/json'},
                body: JSON.stringify({Accoucheur, Poids, Aspect, Anomalies, Placenta, Membranes, Cordon
                    ,Sexe, Taille, Pc, une_min, cinq_min, Malformation, Remarque, Empreintes_digitales})
            });
    
            const json = await reponse.json();
            
            if (!reponse.ok) {
                window.alert("Add patient failed",json.error);
                setIsLoading(false);
                setError(json.error);
            }
            if (reponse.ok) {
                window.alert("Add patient success");
                setIsLoading(false);
            } 
        }catch(error){
            window.alert(error)
        }
        

        
    };
    return {AddPatientPart_1, isloading, error};
    
}