import { AiOutlinePlus } from "react-icons/ai";
import { useState } from "react";
export default function AddCahierSante({ add, setAdd }) {
  const handleClickAddCahier = () => {
    setAdd(!add);
    console.log("cefeg");
  };

  let toggleClassAdd = add ? " add-cahier-active" : "";

  return (
    <button
      className={`add-cahier-sante${toggleClassAdd}`}
      onClick={handleClickAddCahier}
    >
      <h2>Carnet de sante</h2>
      <AiOutlinePlus size="32px" fill="#4F81FF" />
    </button>
  );
}
