import { CiLock, CiUnlock } from "react-icons/ci";
import { useState } from "react";
export default function AddConsultation({ addConsultation, setAddConsultation }) {
  const handleClickAddConcultation = () => {
    setAddConsultation(!addConsultation);
  };

  let toggleClassAddConcultation = addConsultation
    ? " add-concultation-active"
    : "";

  return (
    <button
      className={`add-concultation-button${toggleClassAddConcultation}`}
      onClick={handleClickAddConcultation}
    >
      <h2>Consultation</h2>
      <CiLock className="lock-icon" />
      <CiUnlock className="lock-icon-ouvert" />
    </button>
  );
}
