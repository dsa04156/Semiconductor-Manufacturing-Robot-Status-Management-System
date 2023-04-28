import "./App.css";
import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import VirtualMetrology from "./Presentational/Pages/VirtualMetrology";
import Mainpage from "./Presentational/Pages/MainPage";
import SideBar from "./Presentational/common/SideBar";
import styled from "styled-components";
import Login from "./Presentational/Pages/Login";
import SignUp from "./Presentational/Pages/SignUp";
import { useSelector } from "react-redux";
import FindID from "./Presentational/Pages/FindID";
import Solid from "./Presentational/Pages/Solid";
import SolPass from "./Presentational/Pages/SolPass";
import FindPassword from "./Presentational/Pages/FindPassword";
import Admin from "./Presentational/Pages/Admin";
import TestIDs from "./Presentational/Pages/TestIDs";
import axios from 'axios';

function App() {
  const isLoggedIn = useSelector((state) => state.auth.isLogined);

  return (
    <Back>
      <Routes>
        {/* {isFindID ? (
          //아이디 찾기 조건에 부합하면 Solid 페이지로 이동
        <Route path="/FindID" element={<Navigate to="/Solid"/>} />
        ) : (
          //아이디 찾기 조건에 부합하지 않는다면 FindID 페이지에 머뭄
          console.log("Stay FindID page")
        )}

        {isFindPassword ? (
          //비밀번호 찾기 조건에 부합하면 FindPassword 페이지로 이동
        <Route path="/FindPassword" element={<Navigate to="/SolPass"/>} />
        ) : (
          //아이디 찾기 조건에 부합하지 않는다면 Solid 페이지에 머뭄
          console.log("Stay Solid page")
        )}

        {isGobackhome ? (
          //아이디 찾고 로그인 화면으로 돌아갈때
        <Route path="/Solid" element={<Navigate to="/"/>} />
        ) : (
          //아이디 찾기 조건에 부합하지 않는다면 Solid 페이지에 머뭄
          console.log("Stay Solid page")
        )}

        {isGobackhome2 ? (
          //비밀번호 찾았고 로그인 화면으로 돌아갈때
        <Route path="/SolPass" element={<Navigate to="/"/>} />
        ) : (
          //아이디 찾기 조건에 부합하지 않는다면 SolPass 페이지에 머뭄
          console.log("Stay SolPass page")
        )} */}
        <Route path="/" element={isLoggedIn ? <Mainpage /> : <Login />}/>
        <Route path="/FindPassword" element={<FindPassword />} />
        <Route path="/Solid" element={<Solid />} />
        <Route path="/SolPass" element={<SolPass />} />
        <Route path="/FindID" element={<FindID />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/main" element={<Mainpage />} />
        <Route path="/vm" element={<VirtualMetrology />} />
        <Route path="/Admin" element={<Admin />} />
        <Route path="/TestIDs" element={<TestIDs />} />
      </Routes>
      {isLoggedIn && <SideBar />}
    </Back>
  );
}

export default App;

const Back = styled.div`
  background-color: #eff1f5;
  position: relative;
`;
