import React from 'react';
import { FaRegHospital } from "react-icons/fa";


export default function HospitalisationButton({Hospitalisation}) {
  
  return (
    <div className="conculter-btn-class">
      <FaRegHospital size={15} fill="#fff" />
      <input
        type="submit"
        value="Hospitaliser"
        className="conculter-btn"
        onClick={Hospitalisation}
      />
    </div>
  );
}
