import { MdDashboard } from "react-icons/md";
import { HiUserAdd } from "react-icons/hi";
import { BsFilePersonFill } from "react-icons/bs";
import { BsFillCalendarFill } from "react-icons/bs";
import { RiCoupon2Fill } from "react-icons/ri";
import { MdAnalytics } from "react-icons/md";
import { IoIosSettings } from "react-icons/io";
import { FiLogOut } from "react-icons/fi";
import { IconContext } from "react-icons";

export default function MyAsideBar() {
  /*let list = document.querySelectorAll(".list");
  for (let i = 0; i < list.length; i++) {
    list[i].onclick = function () {
      let j = 0;
      while (j < list.length) {
        list[j++].className = "list";
      }
      list[i].className = "list-active";
    };
  }*/
  return (
    <div className="asidebar">
      <aside className="aside">
        <ul>
          <li className="list">
            <a href="/dashboard">
              <span className="icon">
                <MdDashboard />
              </span>
              <span className="title">dashboard</span>
            </a>
          </li>
          <li className="list">
            <a href="/addpatients">
              <span className="icon">
                <HiUserAdd />
              </span>
              <span className="title">add patient</span>
            </a>
          </li>
          <li className="list">
            <a href="/patients">
              <span className="icon">
                <BsFilePersonFill />
              </span>
              <span className="title">patients</span>
            </a>
          </li>
          <li className="list">
            <a href="/calendrier">
              <span className="icon">
                <BsFillCalendarFill />
              </span>
              <span className="title">calendrier</span>
            </a>
          </li>
          <li className="list">
            <a href="/coupon">
              <span className="icon">
                <RiCoupon2Fill />
              </span>
              <span className="title">coupon</span>
            </a>
          </li>
          <li className="list">
            <a href="/analytics">
              <span className="icon">
                <MdAnalytics />
              </span>
              <span className="title">analytics</span>
            </a>
          </li>
          <li className="list">
            <a href="/settings">
              <span className="icon">
                <IoIosSettings />
              </span>
              <span className="title">settings</span>
            </a>
          </li>
          <li className="list">
            <a href="/login">
              <span className="icon">
                <FiLogOut />
              </span>
              <span className="title">log out</span>
            </a>
          </li>
        </ul>
      </aside>
      <div className="lv"></div>
    </div>
  );
}
