import { useState } from "react";
import axios from "axios";

export const useUserProfile = () => {
    
    const [error, setError] = useState(null);
    const UserProfile = async (id,LieuDeNaissance, AddressActuel, Biographie
        ) => {
        try {
            const response = await axios.patch(`http://localhost:8000/user/${id}`, { 
                 LieuDeNaissance, AddressActuel, Biographie
            });
            // Handle response as needed
            if (!response.status === 200) {
                window.alert("profile not updated", response.data.message);
                setError(response.data.message);
                console.log("profile not updated", response.data.message);
            }else if (response.status === 200) {
                window.alert("profile updated successfully", response.data.message);
                setError(null);
            } 
        } catch (err) {
            window.alert("profile not updated", err.message);
            console.log(err);
        }
        
    };
    return { UserProfile,  error};
    
}