import React, { useState } from "react";
import MyAsideBar from "../components/asideBar";
import MyAsideBarActive from "../components/asideBarActive";
import MyNavBar from "../components/navBar";

export default function Coupon() {
  const [act, setAct] = useState(false);

  return (
    <div className="Coupon">
      <MyNavBar act={act} setAct={setAct}></MyNavBar>
      <div className="lh"></div>
      
      <MyAsideBarActive act={act} setAct={setAct}></MyAsideBarActive>
      <h2 className="titre">coupon</h2>
    </div>
  );
}
