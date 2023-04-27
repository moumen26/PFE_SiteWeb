import { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";

export default function CloseButton({ addVaccinTable, setaddVaccinTable }) {
  const handleClickAddVaccinTable = () => {
    setaddVaccinTable(!addVaccinTable);
    console.log('ddde');
  };

  let toggleClassAddVaccinTable = addVaccinTable
    ? " add-Vaccin-Table-active"
    : "";

  return (
    <AiOutlineClose
      className={`close-button${toggleClassAddVaccinTable}`}
      onClick={handleClickAddVaccinTable}
    />
  );
}
