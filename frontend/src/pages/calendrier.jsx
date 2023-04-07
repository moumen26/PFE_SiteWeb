import React, { useState } from "react";
import MyAsideBar from "../components/asideBar";
import MyAsideBarActive from "../components/asideBarActive";
import MyNavBar from "../components/navBar";
import MyDashboradCalendar from "../components/dashboardCalendar";

export default function Calendrier() {
  const [act, setAct] = useState(false);

  return (
    <div className="Calendrier">
      <MyNavBar act={act} setAct={setAct}></MyNavBar>
      <div className="lh"></div>
      <MyAsideBar></MyAsideBar>
      <MyAsideBarActive act={act} setAct={setAct}></MyAsideBarActive>
      <div className="calendar-container">
        <MyDashboradCalendar className="Calendar"></MyDashboradCalendar>
      </div>
    </div>
  );
}
