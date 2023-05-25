import React from "react";
import { useState } from "react";
import MyAsideBar from "../components/asideBar";
import MyAsideBarActive from "../components/asideBarActive";
import MyNavBar from "../components/navBar";

export default function PatientProfile() {
  const [act, setAct] = useState(false);

  return (
    <div className="Patients">
      <MyAsideBarActive act={act} setAct={setAct}></MyAsideBarActive>
      <h2 className="titre">patient</h2>
    </div>
  );
}
