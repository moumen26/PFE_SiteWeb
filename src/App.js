import { useState } from "react";
import "./App.css";
import MyAsideBar from "./components/asideBar";
import MyAsideBarActive from "./components/asideBarActive";
import MyNavBar from "./components/navBar";
import MySwiper from "./components/swiperDossier";

function App() {
  const [act, setAct] = useState(false);

  return (
    <div className="Dashboard">
      <MyNavBar act={act} setAct={setAct}></MyNavBar>
      <div className="lh"></div>
      <MyAsideBar></MyAsideBar>
      <MyAsideBarActive act={act} setAct={setAct}></MyAsideBarActive>
      <h2 className="titre">dashboard</h2>
    </div>
  );
}

export default App;
