import React, { useState } from "react";
import filter from "../../Assets/filterNav.svg";
import dropdown from "../../Assets/dropdown.svg";
import "./Navbar.css";

export default function Navbar(props) {
  const [toggle, setToggle] = useState(false);

  function handleDisplayToggle(e) {
    setToggle(!toggle);
    if (e.target.value !== undefined) {
      props.handleGroupValue(e.target.value);
    }
  }
  function handleOrderVal(e) {
    setToggle(!toggle);
    if (e.target.value !== undefined) {
      props.handleOrderValue(e.target.value);
    }
  }

  return (
    <>
      <section className="nav">
        <div className="nav-container">
          <div className="nav-btn" onClick={handleDisplayToggle}>
            <div className="nav-icon nav-filter">
              <img src={filter} alt="icon" />
            </div>
            <div className="nav-heading">Display</div>
            <div className="nav-icon nav-drop">
              <img src={dropdown} alt="icon" />
            </div>
          </div>

          <div className={toggle ? "nav-menu nav-menu-active" : "nav-menu"}>
            <div className="nav-filters">
              <div className="nav-dropdown-category">Grouping</div>
              <div className="nav-dropdown-selector">
                <select
                  value={props.groupValue}
                  onChange={handleDisplayToggle}
                  className="nav-selector"
                  name="grouping"
                  id=""
                >
                  <option value="status">Status</option>
                  <option value="user">User</option>
                  <option value="priority">Priority</option>
                </select>
              </div>
            </div>

            <div className="nav-filters">
              <div className="nav-dropdown-category">Ordering</div>
              <div className="nav-dropdown-selector">
                <select
                  value={props.orderValue}
                  onChange={handleOrderVal}
                  className="nav-selector"
                  name="grouping"
                  id=""
                >
                  <option value="priority">Priority</option>
                  <option value="title">Title</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
