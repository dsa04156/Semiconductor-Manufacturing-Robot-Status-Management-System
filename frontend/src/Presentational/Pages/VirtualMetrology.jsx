import React from 'react'
import ReactApexChart from "react-apexcharts";
import { useMediaQuery } from "react-responsive";
import styled from "styled-components";
import Form from "react-bootstrap/Form";
import Information from './info-json';
import HorizonLine from '../common/HorizontalLine';
import { useState,useEffect } from "react";
import axios from 'axios';

const VirtualMetrology = () => {


  const [data, setData] = useState([]);

  useEffect(() => {
      const _dbTest = async () => {
          const res = await axios.get('http://localhost:4000/api/test');
          console.log(res.data);
          setData(res.data);
  };  
  _dbTest();
}, []);
  return (
    <div>
      <ul>
        {data.map((item, index) => (
          <li key={index}>{item.ID}</li>
        ))}
      </ul>
    </div>
  )
}

export default VirtualMetrology
