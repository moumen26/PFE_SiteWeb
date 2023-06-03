import React from "react";
import { FaStethoscope } from "react-icons/fa";


export default function ConculterButton({ AddConsultation }) {
  return (
    <div className="conculter-btn-class" onClick={AddConsultation}>
      <FaStethoscope size={15} fill="#fff" />
      <input type="submit" value="Consulter" className="conculter-btn" />
    </div>
  );
}
