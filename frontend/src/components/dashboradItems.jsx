import { AiOutlineArrowDown, AiOutlineArrowUp } from "react-icons/ai";


export default function MyDashboradTop() {
  return (
    <div className="dashboard-top">
      <div className="dashboard-item">
        <div className="dashboard-item-title">
          <a href="#">
            Nouveau-ne <span>/jour</span>
          </a>
          {/* <AiOutlineArrowDown fill="#ff0000" />
           */}
          <AiOutlineArrowUp fill="#008000" />
        </div>
        <div className="dashboard-nombre">
          <h3>0</h3>
          <h3 className="dashboard-pourcentage-good">0%</h3>
        </div>
      </div>
      <div className="dashboard-item">
        <div className="dashboard-item-title">
          <a href="#">En attente</a>
          <AiOutlineArrowUp fill="#008000" />
        </div>
        <div className="dashboard-nombre">
          <h3>0</h3>
          <h3 className="dashboard-pourcentage-good">0%</h3>
        </div>
      </div>
      <div className="dashboard-item">
        <div className="dashboard-item-title">
          <a href="#">Cas particulier</a>
          <AiOutlineArrowUp fill="#008000" />
        </div>
        <div className="dashboard-nombre">
          <h3>0</h3>
          <h3 className="dashboard-pourcentage-good">0%</h3>
        </div>
      </div>
      <div className="dashboard-item">
        <div className="dashboard-item-title">
          <a href="#">
            Mort <span>/jour</span>
          </a>
          <AiOutlineArrowDown fill="#008000" />
        </div>
        <div className="dashboard-nombre">
          <h3>0</h3>
          <h3 className="dashboard-pourcentage-good">0%</h3>
        </div>
      </div>
    </div>
  );
}
