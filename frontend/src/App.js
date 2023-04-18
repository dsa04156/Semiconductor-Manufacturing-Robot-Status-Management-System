import "./App.css";
import React,{useState} from 'react'
import { Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import VirtualMetrology from "./Presentational/Pages/VirtualMetrology";
import Mainpage from "./Presentational/Pages/MainPage";
import SideBar from "./Presentational/common/SideBar";
import styled from "styled-components";
import Login from "./Presentational/Pages/Login";
import { useSelector } from 'react-redux';

function App() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn)

  return (
    <Back>

      <Routes>
        <Route path="/" element={<Login className="not_main"/>} />
        <Route path="/main" element={<Mainpage className="main" />} />
        <Route path="/vm" element={<VirtualMetrology />} />
      </Routes>
      {isLoggedIn &&<SideBar/>}

    </Back>
  );
}

export default App;
const Back = styled.div`
  background-color: #eff1f5;
  position: relative;
`;
