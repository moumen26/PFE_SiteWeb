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
  return (
    <aside className="aside">
      <ul>
        <li className="list">
          <a href="#">
            <span className="icon">
              <MdDashboard />
            </span>
            <span className="title">dashboard</span>
          </a>
        </li>
        <li className="list">
          <a href="#">
            <span className="icon">
              <HiUserAdd />
            </span>
            <span className="title">add patient</span>
          </a>
        </li>
        <li className="list">
          <a href="#">
            <span className="icon">
              <BsFilePersonFill />
            </span>
            <span className="title">patients</span>
          </a>
        </li>
        <li className="list">
          <a href="#">
            <span className="icon">
              <BsFillCalendarFill />
            </span>
            <span className="title">calendrier</span>
          </a>
        </li>
        <li className="list">
          <a href="#">
            <span className="icon">
              <RiCoupon2Fill />
            </span>
            <span className="title">coupon</span>
          </a>
        </li>
        <li className="list">
          <a href="#">
            <span className="icon">
              <MdAnalytics />
            </span>
            <span className="title">analytics</span>
          </a>
        </li>
        <li className="list">
          <a href="#">
            <span className="icon">
              <IoIosSettings />
            </span>
            <span className="title">settings</span>
          </a>
        </li>
        <li className="list">
          <a href="#">
            <span className="icon">
              <FiLogOut />
            </span>
            <span className="title">log out</span>
          </a>
        </li>
      </ul>
      <ul className="aside-active">
        <li className="list-active">
          <a href="#">
            <span className="icon-active">
              <MdDashboard />
            </span>
            <span className="title-active">dashboard</span>
          </a>
        </li>
        <li className="list-active">
          <a href="#">
            <span className="icon-active">
              <HiUserAdd />
            </span>
            <span className="title-active">add patient</span>
          </a>
        </li>
        <li className="list-active">
          <a href="#">
            <span className="icon-active">
              <BsFilePersonFill />
            </span>
            <span className="title-active">patients</span>
          </a>
        </li>
        <li className="list-active">
          <a href="#">
            <span className="icon-active">
              <BsFillCalendarFill />
            </span>
            <span className="title-active">calendrier</span>
          </a>
        </li>
        <li className="list-active">
          <a href="#">
            <span className="icon-active">
              <RiCoupon2Fill />
            </span>
            <span className="title-active">coupon</span>
          </a>
        </li>
        <li className="list-active">
          <a href="#">
            <span className="icon-active">
              <MdAnalytics />
            </span>
            <span className="title-active">analytics</span>
          </a>
        </li>
        <li className="list-active">
          <a href="#">
            <span className="icon-active">
              <IoIosSettings />
            </span>
            <span className="title-active">settings</span>
          </a>
        </li>
        <li className="list-active">
          <a href="#">
            <span className="icon-active">
              <FiLogOut />
            </span>
            <span className="title-active">log out</span>
          </a>
        </li>
      </ul>
    </aside>
  );
}
