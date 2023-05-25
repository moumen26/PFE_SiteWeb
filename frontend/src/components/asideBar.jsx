import { MdDashboard } from "react-icons/md";
import { BsFilePersonFill, BsFilePerson } from "react-icons/bs";
import { BsFillCalendarFill } from "react-icons/bs";
import { RiCoupon2Fill } from "react-icons/ri";
import { MdAnalytics } from "react-icons/md";
import { IoIosSettings } from "react-icons/io";
import { FiLogOut } from "react-icons/fi";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";
import { Link, NavLink } from "react-router-dom";

export default function MyAsideBar() {
  const { logout } = useLogout();
  const { user } = useAuthContext();

  const SubmitLogout = () => {
    logout();
  };
  return (
    <div className="asidebar">
      <aside className="aside">
        <ul>
          <li className="mb-6">
            <NavLink to="/">
              <div className="link flex items-center justify-items-center">
                <MdDashboard className="w-6 h-6 ml-2" />
                <span className="title">Dashboard</span>
              </div>
            </NavLink>
          </li>
          <li className="mb-6">
            <NavLink to="patients">
              <div className="link flex items-center ">
                <BsFilePersonFill className="w-6 h-6 ml-2 " />
                <span className="title">Patients</span>
              </div>
            </NavLink>
          </li>
          <li className="mb-6">
            <NavLink to="Nouveaune">
              <div className="link flex items-center ">
                <BsFilePerson className="w-6 h-6 ml-2 " />
                <span className="title">Nouveau-ne</span>
              </div>
            </NavLink>
          </li>
          <li className="mb-6">
            <NavLink to="calendrier">
              <div className="link flex items-center ">
                <BsFillCalendarFill className="w-6 h-6 ml-2 " />
                <span className="title">Calendrier</span>
              </div>
            </NavLink>
          </li>
          <li className="mb-6">
            <NavLink to="coupon">
              <div className="link flex items-center ">
                <RiCoupon2Fill className="w-6 h-6 ml-2 " />
                <span className="title">Coupon</span>
              </div>
            </NavLink>
          </li>
          <li className="mb-6">
            <NavLink to="analytics">
              <div className="link flex items-center ">
                <MdAnalytics className="w-6 h-6 ml-2 " />
                <span className="title">Analytique</span>
              </div>
            </NavLink>
          </li>
          <li>
            <NavLink to="conculter">
              <div className="link flex items-center ">
                <IoIosSettings className="w-6 h-6 ml-2" />
                <span className="title">Paramètres</span>
              </div>
            </NavLink>
          </li>
          <li>
            <NavLink to="login">
              {user && (
                <div className="link flex items-center " onClick={SubmitLogout}>
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
