import { useState } from "react";
import "./App.css";
import MyAsideBar from "./components/asideBar";
import MyAsideBarActive from "./components/asideBarActive";
import MyNavBar from "./components/navBar";
import MySwiper from "./components/swiper";

function App() {
  const [act, setAct] = useState(false);

  return (
    <div className="App">
      <div className="home">
        <MyNavBar act={act} setAct={setAct}></MyNavBar>
        <div className="lh"></div>
        <MyAsideBar></MyAsideBar>
        <MyAsideBarActive act={act} setAct={setAct}></MyAsideBarActive>
        <div className="home-container">
          <div className="top">
            <div className="top-titre">
              <h2>Dossier patient</h2>
            </div>
            <div className="top-right">
              <div className="service">
                <h3>Nom de service :</h3>
              </div>
              <div className="paraticien">
                <h3>Nom de praticien :</h3>
                <a href="#">Dr. Khaldi</a>
              </div>
            </div>
          </div>
          <div className="home-formulaire-swiper">
            <MySwiper></MySwiper>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
