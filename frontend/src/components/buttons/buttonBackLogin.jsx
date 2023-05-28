import { useState } from "react";
import { BsArrowLeftShort } from "react-icons/bs";

export default function BackButton({ openPanel, setOpenPanel }) {
  const handleClickBack = (e) => {
    setOpenPanel(false);
    console.log("click");
    e.preventDefault();
  };

  let toggleClassCheck = openPanel ? " sign-in-mode" : "";

  return (
    <button
      className={`back-btn${toggleClassCheck}`}
      id="back-btn"
      onClick={handleClickBack}
    >
      <BsArrowLeftShort size="32px" fill="#3889c1" />
    </button>
  );
}
