import { useState } from "react";
import "./App.css";
import MyAsideBar from "./components/asideBar";
import MyAsideBarActive from "./components/asideBarActive";
import MyChart from "./components/dashboardChart";
import MyDashboradTop from "./components/dashboradItems";
import MyNavBar from "./components/navBar";

function App() {
  const [act, setAct] = useState(false);

  return (
    <div className="Dashboard">
      <MyNavBar act={act} setAct={setAct}></MyNavBar>
      <div className="lh"></div>
      <MyAsideBar></MyAsideBar>
      <MyAsideBarActive act={act} setAct={setAct}></MyAsideBarActive>
      <div className="dashboard-container">
        <MyDashboradTop></MyDashboradTop>
        <div className="dashboard-charts-calnedar">
          <MyChart></MyChart>
        </div>
      </div>
    </div>
  );
}

export default App;
