import React, { useState } from "react";
import MyAsideBar from "../components/asideBar";
import MyAsideBarActive from "../components/asideBarActive";
import MyNavBar from "../components/navBar";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import FullCalendar from "@fullcalendar/react";


export default function Calendrier() {
  const [act, setAct] = useState(false);

  

  return (
    <div className="Calendrier">
      <MyNavBar act={act} setAct={setAct}></MyNavBar>
      <div className="lh"></div>
      
      <MyAsideBarActive act={act} setAct={setAct}></MyAsideBarActive>
      <div className="calendar-container">
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView={"dayGridMonth"}
          headerToolbar={{
            start: "dayGridMonth,timeGridWeek,timeGridDay",
            center: "title",
            end: "today prev,next",
          }}
          height={"88vh"}
         
        />
      </div>
    </div>
  );
}
