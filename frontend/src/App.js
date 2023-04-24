import "./App.css";
import React, { useState,useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import VirtualMetrology from "./Presentational/Pages/VirtualMetrology";
import Mainpage from "./Presentational/UserPage/MainPage";
import SideBar from "./Presentational/common/SideBar";
import styled from "styled-components";
import Login from "./Presentational/UserPage/Login";
import SignUp from './Presentational/UserPage/SignUp';
import { useSelector } from "react-redux";
import FindID from "./Presentational/UserPage/FindID";
import Solid from "./Presentational/UserPage/Solid";
import SolPass from "./Presentational/UserPage/SolPass"
import FindPassword from "./Presentational/UserPage/FindPassword";
import Admin from "./Presentational/Pages/Admin";

function App() {
  const isLoggedIn = useSelector((state) => state.auth.isLogined);
  const isFindID = useSelector((state) => state.auth.isFindID);
  const isFindPassword = useSelector((state) => state.auth.isFindPassword);
  const isGobackhome = useSelector((state) => state.auth.Gobackhome);
  const isGobackhome2 = useSelector((state) => state.auth.Gobackhome2);

  console.log("\nisLoggedIn = " + isLoggedIn)
  console.log("isFindID = " + isFindID)
  console.log("isFindPassword = " + isFindPassword)
  console.log("isgobackhome = " + isGobackhome)
  console.log("isgobackhome2 = " + isGobackhome2)

  return (
    <Back>
      <Routes>
        {isLoggedIn ? ( // 로그인이 되었으면 Mainpage로 이동
          <Route path="/" element={<Navigate to="/main" />} />
        ) : (
          // 로그인이 되지 않았으면 Login 페이지로 이동
          <Route path="/" element={<Login/>} />
        )}

        {isFindID ? (
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
        )}


        <Route path="/FindPassword" element={<FindPassword/>} />  
        <Route path="/Solid" element={<Solid/>} />  
        <Route path="/SolPass" element={<SolPass/>} />  
        <Route path="/FindID" element={<FindID/>} />
        <Route path="/signup" element={<SignUp/>} />
        <Route path="/main" element={<Mainpage/>} />
        <Route path="/vm" element={<VirtualMetrology />} />
        <Route path="/Admin" element={<Admin />} />
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
