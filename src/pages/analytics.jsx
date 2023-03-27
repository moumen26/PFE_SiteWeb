import React, { useState } from "react";
import MyAsideBar from "../components/asideBar";
import MyAsideBarActive from "../components/asideBarActive";
import MyNavBar from "../components/navBar";
import MyCahierSwiper from "../components/swipeCahier";

export default function Analytics() {
  const [act, setAct] = useState(false);

  return (
    <div className="Analytics">
      <MyNavBar act={act} setAct={setAct}></MyNavBar>
      <div className="lh"></div>
      <MyAsideBar></MyAsideBar>
      <MyAsideBarActive act={act} setAct={setAct}></MyAsideBarActive>
      <div className="home-container">
        <h2 className="titre">Analytics</h2>
      </div>
    </div>
  );
}