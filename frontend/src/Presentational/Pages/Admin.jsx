import React from 'react'
import ReactApexChart from "react-apexcharts";
import { useMediaQuery } from "react-responsive";
import styled from "styled-components";
import Form from "react-bootstrap/Form";
import Information from './info-json';

// console.log(Information);

const Admin= () => {
  return (
    
    <div>
        
        <Box>
        </Box>
       <Form.Label className="adlabel">ID H.P Name Permisson Edit-Permission </Form.Label>
       <Form.Label className="admin">Administer</Form.Label>
       <Form.Control type="text" className="search" placeholder="이름 검색" />
    
    </div>
  )
}

export default Admin



const Box = styled.div`
  position: absolute;
  top: 200px;
  left: 150px;
  background: #ffffff;
  border: 1px solid rgba(0, 0, 0, 0.2);
  width: 80%;
  height: 70%;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 20px;
  display: flex;
  align-items: center;
`;
