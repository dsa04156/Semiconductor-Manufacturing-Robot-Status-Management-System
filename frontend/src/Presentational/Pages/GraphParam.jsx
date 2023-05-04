import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import * as d3 from "d3";
import api from "../../redux/api";
import "react-datepicker/dist/react-datepicker.css";
import Condition from "../Component/MainPage/Condition";

const GraphParam = ({ nameList, handleParamsCall }) => {
  const colors = [
    "#f44336",
    "#e91e63",
    "#9c27b0",
    "#673ab7",
    "#3f51b5",
    "#2196f3",
    "#03a9f4",
    "#00bcd4",
    "#009688",
    "#4caf50",
    "#8bc34a",
    "#cddc39",
    "#ffeb3b",
    "#ffc107",
    "#ff9800",
    "#ff5722",
    "#795548",
    "#9e9e9e",
    "#607d8b",
  ];

  const [nameColors, setNameColors] = useState([]);

  const getColorForName = (name, index) => {
    const nameIndex = nameList.indexOf(name);
    return nameIndex !== -1
      ? nameColors[nameIndex]
      : colors[index % colors.length];
  };

  useEffect(() => {
    if (handleParamsCall) {
      handleParamsCall(getColorForName);
    }
  }, [handleParamsCall, getColorForName]);

  useEffect(() => {
    const newNameColors = nameList.map(
      () => colors[Math.floor(Math.random() * colors.length)]
    );
    setNameColors(newNameColors);
  }, [nameList]);

  return (
    <div>
      <ParamBox>
        {nameList &&
          nameList.map((name, index) => (
            <div
              key={index}
              style={{
                display: "flex",
                alignItems: "center",
                cursor: "pointer",
              }}
              onClick={() => handleParamsCall(name, getColorForName)}
            >
              <span
                style={{
                  display: "inline-block",
                  width: "10px",
                  height: "10px",
                  backgroundColor: nameColors[index],
                  marginRight: "10px",
                  marginLeft: "15px",
                }}
              />
              <span
                style={{
                  color: nameColors[index],
                }}
              >
                {" " + name}
              </span>
            </div>
          ))}
      </ParamBox>
    </div>
  );
};

export default GraphParam;

const ParamBox = styled.div`
  position: absolute;
  top: 520px;
  left: 30px;
  background: #ffffff;
  border: 1px solid rgba(0, 0, 0, 0.2);
  width: 80%;
  height: 10%;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 20px;
  display: flex;
  align-items: center;
  overflow: hidden;
`;
