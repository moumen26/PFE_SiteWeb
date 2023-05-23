import { useState } from "react";
import "../App.css";
import MyAsideBar from "../components/asideBar";
import MyAsideBarActive from "../components/asideBarActive";
import MyDashboradCalendar from "../components/dashboardCalendar";
import MyChart from "../components/dashboardChart";
import MyDashboradTop from "../components/dashboradItems";
import MyNavBar from "../components/navBar";
import TableTraitement from "../components/dashboardTableTraitement";
import SexeChart from "../components/dashboardChart2";

function Dashboard() {
  const [act, setAct] = useState(false);

  return (
    <div className="Dashboard">
      <MyNavBar act={act} setAct={setAct}></MyNavBar>
      <div className="lh"></div>
      
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
