import { FaUserMd } from "react-icons/fa";
import { BsBell } from "react-icons/bs";
import { useAuthContext } from "../hooks/useAuthContext";


export default function MyNavBar({ act, setAct }) {
  const classToggle = () => {
    setAct(!act);
  };
  const { user } = useAuthContext();
  return (
    <nav>
      <div className="left-nav">
        <div act={act} setAct={setAct} className="menu" onClick={classToggle}>
          <div className="line"></div>
          <div className="line"></div>
          <div className="line"></div>
        </div>
        <div className="image"></div>
        <a href="#">
          H
          <span>
            <FaUserMd size="24px" fill="#3889c1" />
          </span>
          SPITALI
        </a>
      </div>
      <div className="right-nav">
        <BsBell size="24px" cursor="pointer"/>
        <div className="doctor">
          <div className="doctor-pic"></div>
          <div className="doctor-name">
            {user && (
              <a className="medcine-name">Dr. {user.Fname}</a>
            )}
            {user && (
              <span>{user.speciality}</span>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
