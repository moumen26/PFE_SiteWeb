import { AiOutlineArrowDown, AiOutlineArrowUp } from "react-icons/ai";


export default function MyDashboradTop() {
  return (
    <div className="dashboard-top">
      <div className="dashboard-item">
        <div className="dashboard-item-title">
          <h2>
            Nouveau-ne <span>/day</span>
          </h2>
          <AiOutlineArrowDown fill="#ff0000" />
        </div>
        <div className="dashboard-nombre">
          <h3>1000</h3>
          <h3 className="dashboard-pourcentage-bad">-15%</h3>
        </div>
      </div>
      <div className="dashboard-item">
        <div className="dashboard-item-title">
          <h2>En attente</h2>
          <AiOutlineArrowUp fill="#008000" />
        </div>
        <div className="dashboard-nombre">
          <h3>1050</h3>
          <h3 className="dashboard-pourcentage-good">+20%</h3>
        </div>
      </div>
      <div className="dashboard-item">
        <div className="dashboard-item-title">
          <h2>Cas particulier</h2>
          <AiOutlineArrowUp fill="#008000" />
        </div>
        <div className="dashboard-nombre">
          <h3>500</h3>
          <h3 className="dashboard-pourcentage-good">+10%</h3>
        </div>
      </div>
      <div className="dashboard-item">
        <div className="dashboard-item-title">
          <h2>
            Mort <span>/day</span>
          </h2>
          <AiOutlineArrowDown fill="#008000" />
        </div>
        <div className="dashboard-nombre">
          <h3>4</h3>
          <h3 className="dashboard-pourcentage-good">+12%</h3>
        </div>
      </div>
    </div>
  );
}
