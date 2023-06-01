import React from 'react'
import { FaRegEye } from "react-icons/fa";

export default function VoirButton({VoirPatient,CompletePatient}) {
  
  return (
    <div className="voir-btn-class" onClick={VoirPatient || CompletePatient}>
      <FaRegEye size={15} fill="#fff" />
      <input type="submit" value="Voir" className="voir-btn" />
    </div>
  );
}
