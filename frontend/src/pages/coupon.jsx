import React, { useState } from "react";
import MyAsideBarActive from "../components/asideBarActive";

export default function Coupon() {
  const [act, setAct] = useState(false);

  return (
    <div className="Coupon">
      <MyAsideBarActive act={act} setAct={setAct}></MyAsideBarActive>
      <h2 className="titre">coupon</h2>
    </div>
  );
}
