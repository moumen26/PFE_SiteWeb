import { FaUserMd } from "react-icons/fa";
import { BsBell } from "react-icons/bs";
import { useAuthContext } from "../hooks/useAuthContext";
import Notification from "./notification";
import { useState } from "react";

export default function MyNavBar({ act, setAct }) {
  const classToggle = () => {
    setAct(!act);
  };
  const { user } = useAuthContext();

  const [addNotification, setAddNotification] = useState(false);

  let toggleNotificaitonAdd = addNotification ? " add-notification" : "";
  const handleClickAddNotification = () => {
    setAddNotification(!addNotification);
  };

  return (
    <div>
      <nav>
        <div className="left-nav">
          <div act={act} setAct={setAct} className="menu" onClick={classToggle}>
            <div className="line"></div>
            <div className="line"></div>
            <div className="line"></div>
          </div>
          <div className="image"></div>
          <a href="#">
            <div className="logo flex items-center justify-items-center">
              H
              <FaUserMd size="24px" fill="#3889c1" className="pb-1" />
              SPITALI
            </div>
          </a>
        </div>
        <div className="right-nav">
          <BsBell
            size="24px"
            cursor="pointer"
            onClick={handleClickAddNotification}
            addNotification={addNotification}
            setAddNotification={setAddNotification}
          />
          <div className="doctor">
            <div className="doctor-pic"></div>
            <div className="doctor-name">
              {user && <a className="medcine-name">Dr. {user.Fname}</a>}
              {user && <span>{user.speciality}</span>}
            </div>
          </div>
        </div>
      </nav>
      <div className={`nav-notification${toggleNotificaitonAdd}`}>
        <Notification />
      </div>
    </div>
  );
}
