import { CiLock, CiUnlock } from "react-icons/ci";
import { useState } from "react";
export default function AddCahierSante({ add, setAdd, open }) {
  const handleClickAddCahier = () => {
    if(open){
      setAdd(!add);
    }
  };
  var toggleClassAdd = "";
  if(open){
    var toggleClassAdd = add ? " add-cahier-active" : "";
  }
  return (
    <button
      className={`add-cahier-sante${toggleClassAdd}`}
      onClick={handleClickAddCahier}
    >
      <h2>Carnet de sante</h2>
      <CiLock className="lock-icon" />
      <CiUnlock className="lock-icon-ouvert" />
    </button>
  );
}
