import { useState } from "react";

export const useAddPatientPart_1 = () => {
    
    const [errorPart_1, setErrorPart_1] = useState(null);

    const AddPatientPart_1 = async (Date_daccouchement, Heure_daccouchement,Accoucheur, Poids, Aspect, Anomalies, Placenta, Membranes, Cordon
        ,Sexe, Taille, Pc, Malformation, Remarque, Empreintes_digitales) => {
        
        try{
            
            const reponse = await fetch('http://localhost:8000/addpatients/', {
                method: "POST",
                headers: {'content-type': 'application/json',
                'Accept': 'application/json'},
                body: JSON.stringify({Date_daccouchement: Date_daccouchement,Heure_daccouchement: Heure_daccouchement,Accoucheur: Accoucheur, Poids: Poids, Aspect: Aspect, Anomalies: Anomalies, Placenta: Placenta, Membranes: Membranes, Cordon: Cordon
                    ,Sexe: Sexe, Taille: Taille, Pc: Pc, Malformation: Malformation, Remarque: Remarque, Empreintes_digitales: Empreintes_digitales})
            });
    
            const json = await reponse.json();
            
            if (!reponse.ok) {
                window.alert("Add patient failed",json.errorPart_1);
                setErrorPart_1(json.errorPart_1);
            }
            if (reponse.ok) {
                window.alert("Add patient success", json.message);
            } 
        }catch(err){
            window.alert(err)
        }
        

        
    };
    return { AddPatientPart_1,  errorPart_1};
    
}