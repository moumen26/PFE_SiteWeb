import { useState } from "react";

export default function AcceeButton({ openPanel, setOpenPanel }) {
  const handleClickAccee = (e) => {
    setOpenPanel(!openPanel);
    console.log("click");
    e.preventDefault();
  };

  let toggleClassCheck = openPanel ? ' sign-in-mode' : '';

  return (
    <button
      className={`demande-accee${toggleClassCheck}`}
      id="demande-accee"
      onClick={handleClickAccee}
    >
      Demande acces
    </button>
  );
}
