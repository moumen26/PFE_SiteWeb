import { MdDashboard } from "react-icons/md";
import { BsFilePersonFill, BsFilePerson } from "react-icons/bs";
import { BsFillCalendarFill } from "react-icons/bs";
import { RiCoupon2Fill } from "react-icons/ri";
import { MdAnalytics } from "react-icons/md";
import { IoIosSettings } from "react-icons/io";
import { FiLogOut } from "react-icons/fi";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";

export default function MyAsideBar() {
  // let list = document.querySelectorAll(".list");
  // for (let i = 0; i < list.length; i++) {
  //   list[i].onclick = function () {
  //     let j = 0;
  //     while (j < list.length) {
  //       list[j++].className = "list";
  //     }
  //     list[i].className = "list-active";
  //   };
  // }
  const { logout } = useLogout();
  const { user } = useAuthContext();
  
  const SubmitLogout = () => {
    logout();
  }
  return (
    <div className="asidebar">
      <aside className="aside">
        <ul className="flex flex-col gap-20">
          <li className="list">
            <a href="/dashboard" className="mb-2 h-10 pt-1">
              <div className="flex items-center justify-items-center">
                <MdDashboard className="w-6 h-6 ml-2" />
                <span className="title">Dashboard</span>
              </div>
            </a>
          </li>
          <li className="list">
            <a href="/patients" className="mb-2 h-10 pt-1">
              <div className="flex items-center justify-items-center">
                <BsFilePersonFill className="w-6 h-6 ml-2 " />
                <span className="title">Patients</span>
              </div>
            </a>
          </li>
          <li className="list">
            <a href="/Nouveaune" className="mb-2 h-10 pt-1">
              <div className="flex items-center justify-items-center">
                <BsFilePerson className="w-6 h-6 ml-2 " />
                <span className="title">Nouveau-ne</span>
              </div>
            </a>
          </li>
          <li className="list">
            <a href="/calendrier" className="mb-2 h-10 pt-1">
              <div className="flex items-center justify-items-center">
                <BsFillCalendarFill className="w-6 h-6 ml-2 " />
                <span className="title">Calendar</span>
              </div>
            </a>
          </li>
          <li className="list">
            <a href="/coupon" className="mb-2 h-10 pt-1">
              <div className="flex items-center justify-items-center">
                <RiCoupon2Fill className="w-6 h-6 ml-2 " />
                <span className="title">Coupon</span>
              </div>
            </a>
          </li>
          <li className="list">
            <a href="/analytics" className="mb-2 h-10 pt-1">
              <div className="flex items-center justify-items-center">
                <MdAnalytics className="w-6 h-6 ml-2 " />
                <span className="title">Analytics</span>
              </div>
            </a>
          </li>
          <li className="list">
            <a href="/seetings" className="h-10 pt-1">
              <div className="flex items-center justify-items-center">
                <IoIosSettings className="w-6 h-6 ml-2" />
                <span className="title">Seetings</span>
              </div>
            </a>
          </li>
          <li className="list">
            <a href="/login" className="h-10 pt-1">
              {user && (
                <div
                  className="flex items-center justify-items-center"
                  onClick={SubmitLogout}
                >
                  <FiLogOut className="w-6 h-6 ml-2" />
                  <span className="title">Log Out</span>
                </div>
              )}
            </a>
          </li>
        </ul>
      </aside>
      <div className="lv"></div>
    </div>
  );
}
