import { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";

export default function CloseButton2({ addVaccinTable2, setaddVaccinTable2 }) {
  const handleClickAddVaccinTable2 = () => {
    setaddVaccinTable2(!addVaccinTable2);
  };

  let toggleClassAddVaccinTable2 = addVaccinTable2
    ? " add-Vaccin-Table-active2"
    : "";

  return (
    <AiOutlineClose
      className={`close-button${toggleClassAddVaccinTable2}`}
      onClick={handleClickAddVaccinTable2}
    />
  );
}
