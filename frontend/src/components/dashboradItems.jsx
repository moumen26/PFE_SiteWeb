import { AiOutlineArrowDown, AiOutlineArrowUp } from "react-icons/ai";


export default function MyDashboradTop() {
  return (
    <div className="dashboard-top">
      <div className="dashboard-item">
        <div className="dashboard-item-title">
          <a href="#">
            New-born <span>/day</span>
          </a>
          <AiOutlineArrowDown fill="#ff0000" />
        </div>
        <div className="dashboard-nombre">
          <h3>1000</h3>
          <h3 className="dashboard-pourcentage-bad">-15%</h3>
        </div>
      </div>
      <div className="dashboard-item">
        <div className="dashboard-item-title">
          <a  href="#">En attente</a>
          <AiOutlineArrowUp fill="#008000" />
        </div>
        <div className="dashboard-nombre">
          <h3>1050</h3>
          <h3 className="dashboard-pourcentage-good">+20%</h3>
        </div>
      </div>
      <div className="dashboard-item">
        <div className="dashboard-item-title">
          <a href="#">Particular case</a>
          <AiOutlineArrowUp fill="#008000" />
        </div>
        <div className="dashboard-nombre">
          <h3>500</h3>
          <h3 className="dashboard-pourcentage-good">+10%</h3>
        </div>
      </div>
      <div className="dashboard-item">
        <div className="dashboard-item-title">
          <a href="#">
            Dead <span>/day</span>
          </a>
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
