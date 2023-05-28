import { useState } from "react";
import "../App.css";
import MyAsideBarActive from "../components/asideBarActive";
import MyDashboradCalendar from "../components/dashboardCalendar";
import MyChart from "../components/charts/dashboardChart";
import MyDashboradTop from "../components/dashboradItems";
import TableTraitement from "../components/tables/tableDashboardTraitement";
import SexeChart from "../components/charts/dashboardChart2";

function Dashboard() {
  const [act, setAct] = useState(false);

  return (
    <div className="Dashboard">
      <MyAsideBarActive act={act} setAct={setAct}></MyAsideBarActive>
      <div className="dashboard-container">
        <MyDashboradTop></MyDashboradTop>
        <div className="dashboard-charts-calnedar">
          <MyChart></MyChart>
          <MyDashboradCalendar></MyDashboradCalendar>
        </div>
        <TableTraitement></TableTraitement>
        <SexeChart></SexeChart>
      </div>
    </div>
  );
}

export default Dashboard;
