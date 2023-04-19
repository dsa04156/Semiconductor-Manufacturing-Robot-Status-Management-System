import "./App.css";
import React, { useState,useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import VirtualMetrology from "./Presentational/Pages/VirtualMetrology";
import Mainpage from "./Presentational/Pages/MainPage";
import SideBar from "./Presentational/common/SideBar";
import styled from "styled-components";
import Login from "./Presentational/Pages/Login";
import SignUp from './Presentational/Pages/SignUp';
import { useSelector } from "react-redux";

function App() {
  const isLoggedIn = useSelector((state) => state.auth.isLogined);

  console.log(isLoggedIn)
  return (
    <Back>
      <Routes>
        {isLoggedIn ? ( // 로그인이 되었으면 Mainpage로 이동
          <Route path="/" element={<Navigate to="/main" />} />
        ) : (
          // 로그인이 되지 않았으면 Login 페이지로 이동
          <Route path="/" element={<Login/>} />
        )}
        <Route path="/signup" element={<SignUp/>} />
        <Route path="/main" element={<Mainpage/>} />
        <Route path="/vm" element={<VirtualMetrology />} />
      </Routes>
      {isLoggedIn?<SideBar />:""}
    </Back>
  );
}

export default App;
const Back = styled.div`
  background-color: #eff1f5;
  position: relative;
`;
