import { React, useState } from "react";
import "primereact/resources/themes/lara-light-indigo/theme.css";     
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";    

import { Calendar } from "primereact/calendar";

export default function MyDashboradCalendar() {
  const [date, setDate] = useState("");


  return (
    <div className="calendar-dashboard">
      <div className="calendar-dashboard-header">
        <h2>Calendar</h2>
      </div>
      <Calendar
        value={date}
        onChange={(e) => setDate(e.value)}
        inline
      />
    </div>
  );
}
