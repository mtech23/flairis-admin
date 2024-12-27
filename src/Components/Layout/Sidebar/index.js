import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBorderAll,
  faUser,
  faPenFancy,
  faMoneyBill,
} from "@fortawesome/free-solid-svg-icons";
import { faMessage } from "@fortawesome/free-regular-svg-icons";

import "./style.css";

export const Sidebar = (props) => {
  const location = useLocation();
  return (
    <div className={`sidebar ${props.sideClass}`} id="sidebar">
      <ul className="list-unstyled">
        <li className="sidebar-li">
          <Link
            className={`sideLink ${
              location.pathname.includes("/dashboard") ? "active" : ""
            }`}
            to="/dashboard"
          >
            <span className="sideIcon">
              <FontAwesomeIcon icon={faBorderAll} />
            </span>
            <span className="sideLinkText">Dashboard</span>
          </Link>
        </li>

        <li className="sidebar-li">
          <Link
            className={`sideLink ${
              location.pathname.includes("product") ? "active" : ""
            }`}
            to="/product-management"
          >
            <span className="sideIcon">
              <FontAwesomeIcon icon={faBorderAll} />
            </span>
            <span className="sideLinkText">Product Management</span>
          </Link>
        </li>

        <li className="sidebar-li">
          <Link
            className={`sideLink ${
              location.pathname.includes("order") ? "active" : ""
            }`}
            to="/order-management"
          >
            <span className="sideIcon">
              <FontAwesomeIcon icon={faBorderAll} />
            </span>
            <span className="sideLinkText">Order Management</span>
          </Link>
        </li>

        <li className="sidebar-li">
          <Link
            className={`sideLink ${
              location.pathname.includes("category") ? "active" : ""
            }`}
            to="/category-management"
          >
            <span className="sideIcon">
              <FontAwesomeIcon icon={faBorderAll} />
            </span>
            <span className="sideLinkText">Category Management</span>
          </Link>
        </li>
        {/* <li className="sidebar-li">
          <Link
            className={`sideLink ${
              location.pathname.includes("color") ? "active" : ""
            }`}
            to="/color-management"
          >
            <span className="sideIcon">
              <FontAwesomeIcon icon={faBorderAll} />
            </span>
            <span className="sideLinkText">Color Management</span>
          </Link>
        </li>
        <li className="sidebar-li">
          <Link
            className={`sideLink ${
              location.pathname.includes("blogs") ? "active" : ""
            }`}
            to="/blogs-management"
          >
            <span className="sideIcon">
              <FontAwesomeIcon icon={faBorderAll} />
            </span>
            <span className="sideLinkText">Blogs Management</span>
          </Link>
        </li>

        <li className="sidebar-li">
          <Link
            className={`sideLink ${
              location.pathname.includes("portfolio") ? "active" : ""
            }`}
            to="/portfolio-management"
          >
            <span className="sideIcon">
              <FontAwesomeIcon icon={faUser} />
            </span>
            <span className="sideLinkText">Portfolio Management</span>
          </Link>
        </li>
        <li className="sidebar-li">
          <Link
            className={`sideLink ${
              location.pathname.includes("gallery") ? "active" : ""
            }`}
            to="/gallery-management"
          >
            <span className="sideIcon">
              <FontAwesomeIcon icon={faPenFancy} />
            </span>
            <span className="sideLinkText">Gallery Management</span>
          </Link>
        </li>
        <li className="sidebar-li">
          <Link
            className={`sideLink ${
              location.pathname.includes("#") ? "active" : ""
            }`}
            to="#"
          >
            <span className="sideIcon">
              <FontAwesomeIcon icon={faMoneyBill} />
            </span>
            <span className="sideLinkText">Subscription Management</span>
          </Link>
        </li> */}

        {/* <li className="sidebar-li">
          <Link className={`sideLink ${location.pathname.includes('/product-management') ? 'active' : ''}`} to="/product-management">
            <span className="sideIcon">
              <FontAwesomeIcon icon={faBorderAll} />
            </span>
            <span className="sideLinkText">Product Management</span>
          </Link>
        </li> */}

        {/* <li className="sidebar-li">
          <Link className={`sideLink ${location.pathname.includes('/category-management') ? 'active' : ''}`} to="/category-management">
            <span className="sideIcon">
              <FontAwesomeIcon icon={faEye} />
            </span>
            <span className="sideLinkText">Category Management</span>
          </Link>
        </li> */}

        {/* <li className="sidebar-li">
          <Link className={`sideLink ${location.pathname.includes('/customise-menu') ? 'active' : ''}`} to="/customise-menu">
            <span className="sideIcon">
              <FontAwesomeIcon icon={faEye} />
            </span>
            <span className="sideLinkText">Customize Menu</span>
          </Link>
        </li>
        <li className="sidebar-li">
          <Link className={`sideLink ${location.pathname.includes('/zipcode-list') ? 'active' : ''}`} to="/zipcode-list">
            <span className="sideIcon">
              <FontAwesomeIcon icon={faEye} />
            </span>
            <span className="sideLinkText">Zipcode List</span>
          </Link>
        </li> */}

        {/* <li className="sidebar-li">
          <Link className={`sideLink ${location.pathname.includes('/dietary-management') ? 'active' : ''}`} to="/dietary-management">
            <span className="sideIcon">
              <FontAwesomeIcon icon={faEye} />
            </span>
            <span className="sideLinkText">Dietary Management</span>
          </Link>
        </li> */}
        {/* <li className="sidebar-li">
          <Link className={`sideLink ${location.pathname.includes('/ads-management') ? 'active' : ''}`} to="/ads-management">
            <span className="sideIcon">
              <FontAwesomeIcon icon={faTasks} />
            </span>
            <span className="sideLinkText">Ads Management</span>
          </Link>
        </li>

        <li className="sidebar-li">
          <Link className={`sideLink ${location.pathname.includes('/genre-management') ? 'active' : ''}`} to="/genre-management">
            <span className="sideIcon">
              <FontAwesomeIcon icon={faMountainCity} />
            </span>
            <span className="sideLinkText">Genre Management</span>
          </Link>
        </li>
      
        <li className="sidebar-li">
          <Link className={`sideLink ${location.pathname.includes('/customer-support') ? 'active' : ''}`} to="/customer-support">
            <span className="sideIcon">
              <FontAwesomeIcon icon={faHeadset} />
            </span>
            <span className="sideLinkText">Customer Support</span>
          </Link>
        </li>

        <li className="sidebar-li">
          <Link className={`sideLink ${location.pathname.includes('/currency-management') ? 'active' : ''}`} to="/currency-management">
            <span className="sideIcon">
              <FontAwesomeIcon icon={faMoneyBill} />
            </span>
            <span className="sideLinkText">Currency Management</span>
          </Link>
        </li> */}
        {/* 
       
       
        <li className="sidebar-li">
          <Link className={`sideLink ${location.pathname.includes('/user-management') ? 'active' : ''}`} to="/user-management">
            <span className="sideIcon">
              <FontAwesomeIcon icon={faUser} />
            </span>
            <span className="sideLinkText">User Management</span>
          </Link>
        </li>
        <li className="sidebar-li">
          <Link className={`sideLink ${location.pathname.includes('/target-listing') ? 'active' : ''}`} to="/target-listing">
            <span className="sideIcon">
              <FontAwesomeIcon icon={faMoneyBill} />
            </span>
            <span className="sideLinkText">Sales</span>
          </Link>
        </li> */}
      </ul>
    </div>
  );
};
