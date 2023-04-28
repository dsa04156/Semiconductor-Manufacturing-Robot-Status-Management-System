import React from 'react'
import ReactApexChart from "react-apexcharts";
import { useMediaQuery } from "react-responsive";
import styled from "styled-components";
import Form from "react-bootstrap/Form";
import { useState,useEffect } from "react";
import axios from 'axios';


const Admin= () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const _dbTest = async () => {
            // **헤더값에 토큰 값**을 주면 -> 토큰 값 인지해서 admin이 맞구나
            // 하면 다시 보낸다
            const res = await axios.get('http://localhost:4000/api/test');
            console.log(res.data);
            setData(res.data);
    };  
    _dbTest();
}, []);

  return (
    <div>
        {/* <HorizonLine /> */}
        <Box>
        <table class="table table-hover">
 <thead>
   <tr>
      <th>ID</th>
      <th>Email</th>
      <th>Email</th>
   </tr>
 </thead>
 <tbody>
   <tr>
      <td>
        {data.map((item, index) => (
          <li className="idlist" key={index} style={{fontSize: "24px"}}>
            {item.ID}  {item.Password} {item.PhoneNumber}
            </li>
        ))}
       </td>
      <td>Doe</td>
      <td>john@example.com</td>
   </tr>
   <tr>
      <td>Mary</td>
      <td>Moe</td>
      <td>mary@example.com</td>
   </tr>
   <tr>
      <td>July</td>
      <td>Dooley</td>
      <td>july@example.com</td>
   </tr>
 </tbody> 

</table>
        {/* <Box3>
        <ul className="idlabel" >ID
        {data.map((item, index) => (
          <li className="idlist" key={index} style={{fontSize: "24px"}}>
            {item.ID}  
            </li>
        ))}
       </ul>
       </Box3> */}

       {/* <Box4>
       <ul className="Passwordlabel">
        {data.map((item, index) => (
          <li className="idlist" key={index} style={{fontSize: "24px"}}>
            {item.PhoneNumber}  
            </li>
        ))}
       </ul>
       </Box4> */}
        </Box>
       {/* <Form.Label className="adlabel">ID H.P Name Permisson Edit-Permission </Form.Label> */}
       
       <Box2>
       <Form.Group>
        <Form.Label className="admin">Administer</Form.Label>
       <Form.Control
        autoFocus={true}
        type="text" 
        htmlSize={30} 
        className="search" 
        placeholder=" 이름 검색"
       />
       
        </Form.Group>
        </Box2>
        
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


const Box2 = styled.div`
  position: absolute;
  top: 10px;
  left: 150px;
  width: 40%;
  display: flex;
  align-items: center;
`;



const Box3 = styled.div`
  position: absolute;
  top: 70px;
  left: 10px;
  background: #ffffff;
  border: 1px solid rgba(0, 0, 0, 0.2);
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  display: flex;
  align-items: center;
`;

const Box4 = styled.div`
  position: absolute;
  top: 70px;
  left: 400px;
  background: #ffffff;
  border: 1px solid rgba(0, 0, 0, 0.2);
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  display: flex;
  align-items: center;
`;