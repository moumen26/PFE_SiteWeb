import { useState } from "react";

export const useAddPatientPart_1 = () => {
    const [error, setError] = useState(null);

    const AddPatientPart_1 = async (Accoucheur, Poids, Aspect, Anomalies, Placenta, Membranes, Cordon
        ,Sexe, Taille, Pc, Malformation, Remarque, Empreintes_digitales) => {
        
        try{
            
            const reponse = await fetch('http://localhost:8000/addpatients/', {
                method: "POST",
                headers: {'content-type': 'application/json',
                'Accept': 'application/json'},
                body: JSON.stringify({Accoucheur: Accoucheur, Poids: Poids, Aspect: Aspect, Anomalies: Anomalies, Placenta: Placenta, Membranes: Membranes, Cordon: Cordon
                    ,Sexe: Sexe, Taille: Taille, Pc: Pc, Malformation: Malformation, Remarque: Remarque, Empreintes_digitales: Empreintes_digitales})
            });
    
            const json = await reponse.json();
            
            if (!reponse.ok) {
                window.alert("Add patient failed",json.error.error);
                setError(json.error);
            }
            if (reponse.ok) {
                window.alert("Add patient success", json.message);
            } 
        }catch(error){
            window.alert(error)
        }
        

        
    };
    return {AddPatientPart_1, error};
    
}