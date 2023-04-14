import React from "react";
import { NavLink } from "react-router-dom";
import { Icon } from "@iconify/react";
import { useState } from "react";
import styled from "styled-components";

const SideBar = () => {
  const [num, setnum] = useState(0);

  return (
    <Side>
      <NavLink to="/">
        <img src="image/logo.png" alt="" />
      </NavLink>

      <NavLink to="/" onClick={() => setnum(0)} className={num === 0 ? "back_type" : "nav_item"}>
        <Menu>
          <div>
            <Icon icon="ion:extension-puzzle" width="35" />
          </div>
          <Font> Machine Health</Font>
        </Menu>
      </NavLink>

      <NavLink to="/vm" onClick={() => setnum(1)} className={num === 1 ? "back_type" : "nav_item"}>
        <Menu>
          <div>
            <Icon icon="bi:globe" width="35" />
          </div>
          <Font2> VM</Font2>
        </Menu>
      </NavLink>
    </Side>
  );
};

export default SideBar;

const Side = styled.div`
  display: flex;
  flex-direction: column;
  width: 95px;
  height: 100vh;
  background-color: white;
  align-items: center;
`;
const Menu = styled.div`
  margin-top: 30px;
  width: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Font = styled.div`
  margin-top: 5px;
  font-size: small;
  margin-left: 22px;
`;

const Font2 = styled.div`
  margin-top: 5px;
  font-size: small;
`;
