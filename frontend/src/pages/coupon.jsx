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
      <MyAsideBar></MyAsideBar>
      <MyAsideBarActive act={act} setAct={setAct}></MyAsideBarActive>
      <h2 className="titre">coupon</h2>
      <h1 class="text-3xl font-bold underline">Hello world!</h1>
    </div>
  );
}
