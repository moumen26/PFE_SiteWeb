import { AiOutlinePlus } from "react-icons/ai";
import { useState } from "react";
export default function AddCahierSante(/*{ add, setAdd }*/) {
  /*const classToggleAddcahier = () => {
    setAct(!add);
  };*/
  return (
    <div
    className="add-cahier-sante"
      /*add={add}
      setAdd={setAdd}
      onClick={classToggleAddcahier}*/
    >
      <h2>Carnet de sante</h2>
      <AiOutlinePlus size="32px" fill="#4F81FF" />
    </div>
  );
}
