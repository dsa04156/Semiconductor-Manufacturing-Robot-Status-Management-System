import "./App.css";
import { Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import VirtualMetrology from "./Presentational/Pages/VirtualMetrology";
import Mainpage from "./Presentational/Pages/MainPage";
import SideBar from "./Presentational/common/SideBar";
import styled from "styled-components";

function App() {
  return (
    <Back>
      <SideBar />
      <Routes>
        <Route path="/" element={<Mainpage />} />
        <Route path="/vm" element={<VirtualMetrology />} />
      </Routes>
    </Back>
  );
}

export default App;
const Back = styled.div`
  background-color: #eff1f5;
  position: relative;
`;
