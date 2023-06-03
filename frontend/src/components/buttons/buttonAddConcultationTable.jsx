import React from "react";

export default function ButtonAddConcultationTable({AddConsultation}) {
  return <input className="add-concultation-btn" type="submit" value="Ajouter un consultation" onClick={AddConsultation} />;
}
