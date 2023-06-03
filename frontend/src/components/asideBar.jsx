import { MdDashboard } from "react-icons/md";
import { BsFilePersonFill, BsFilePerson } from "react-icons/bs";
import { BsFillCalendarFill } from "react-icons/bs";
import { ImProfile } from "react-icons/im";
import { FiLogOut } from "react-icons/fi";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";
import { NavLink, useLocation } from "react-router-dom";

export default function MyAsideBar() {
  const { logout } = useLogout();
  const { user } = useAuthContext();

  const SubmitLogout = () => {
    logout();
  };

  const location = useLocation();
  return (
    <div className="asidebar">
      <aside className="aside">
        <ul>
          <li className="mb-6">
            <NavLink to="/">
              <div
                className={`link flex items-center justify-items-center ${
                  location.pathname === "/" ? "aside-item-active" : ""
                }`}
              >
                <MdDashboard className="w-6 h-6 ml-2" />
                <span className="title">Dashboard</span>
              </div>
            </NavLink>
          </li>
          <li className="mb-6">
            <NavLink to="patients">
              <div
                className={`link flex items-center ${
                  location.pathname === "/patients" ? "aside-item-active" : ""
                }`}
              >
                <BsFilePersonFill className="w-6 h-6 ml-2 " />
                <span className="title">Patients</span>
              </div>
            </NavLink>
          </li>
          <li className="mb-6">
            <NavLink to="Nouveaune">
              <div
                className={`link flex items-center ${
                  location.pathname === "/Nouveaune" ? "aside-item-active" : ""
                }`}
              >
                <BsFilePerson className="w-6 h-6 ml-2 " />
                <span className="title">Nouveau-ne</span>
              </div>
            </NavLink>
          </li>
          <li className="mb-6">
            <NavLink to="calendrier">
              <div
                className={`link flex items-center ${
                  location.pathname === "/calendrier" ? "aside-item-active" : ""
                }`}
              >
                <BsFillCalendarFill className="w-6 h-6 ml-2 " />
                <span className="title">Calendrier</span>
              </div>
            </NavLink>
          </li>

          <li>
            <NavLink to="profile">
              <div
                className={`link flex items-center ${
                  location.pathname === "/profile" ? "aside-item-active" : ""
                }`}
              >
                <ImProfile className="w-6 h-6 ml-2" />
                <span className="title">Profile</span>
              </div>
            </NavLink>
          </li>

          <li>
            <NavLink to="login">
              {user && (
                <div className="link flex items-center" onClick={SubmitLogout}>
                  <FiLogOut className="w-6 h-6 ml-2" />
                  <span className="title">Log Out</span>
                </div>
              )}
            </NavLink>
          </li>
        </ul>
      </aside>
      <div className="lv"></div>
    </div>
  );
}
