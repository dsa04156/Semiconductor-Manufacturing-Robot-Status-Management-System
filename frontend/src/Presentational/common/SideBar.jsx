import React from "react";
import { NavLink } from "react-router-dom";
import { Icon } from "@iconify/react";
import { useState } from "react";
import styled from "styled-components";
import { useDispatch } from 'react-redux';
import { authActions } from '../../redux/reducer/authReducer'

const SideBar = () => {
  const [num, setnum] = useState(0);
  const dispatch = useDispatch();

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

      <NavLink
        to="/Admin"
        onClick={() => setnum(2)}
        className={num === 2 ? "back_type" : "nav_item"}
      >
        <Menu>
          <div>
            <Icon icon="mdi:human-male" width="35" />
          </div>
          <Font2> Admin</Font2>
        </Menu>
      </NavLink>

      <Logout onClick={() =>dispatch(authActions.logOut()) }>
        <Font2> Logout </Font2>
        <Icon icon="ic:sharp-logout" />
      </Logout>
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
const Logout = styled.button`
  margin-top: 300px;
  font-size: small;
  background:none;
  border : none;
  cursor:pointer;
`;
