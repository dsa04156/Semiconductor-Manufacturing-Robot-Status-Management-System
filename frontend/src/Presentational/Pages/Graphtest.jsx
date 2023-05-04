import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import * as d3 from "d3";
import api from "../../redux/api";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Condition from "../Component/MainPage/Condition";
import GraphParam from "./GraphParam";
import Period from "./Period";

const Graph = ({ data, xRange, yRange }) => {
  const ref = useRef();

  useEffect(() => {
    if (data.length > 0) {
      const margin = { top: 10, right: 10, bottom: 30, left: 30 };
      const width = 600 - margin.left - margin.right;
      const height = 400 - margin.top - margin.bottom;

      const svg = d3
        .select(ref.current)
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

      const xScale = d3.scaleLinear().domain([0, xRange]).range([0, width]);
      const yScale = d3.scaleLinear().domain([0, yRange]).range([height, 0]);

      // x축 그리기
      svg
        .append("g")
        .attr("class", "x-axis") // x-axis 클래스 추가
        .attr("transform", `translate(0, ${height})`)
        .call(d3.axisBottom(xScale));

      // y축 그리기
      svg.append("g").call(d3.axisLeft(yScale));

      const line = d3
        .line()
        .x((d, i) => xScale(i))
        .y((d) => yScale(d.value));

      svg
        .append("path")
        .datum(data)
        .attr("fill", "none")
        .attr("stroke", "steelblue")
        .attr("stroke-width", 1.5)
        .attr("d", line);

      // Update the xScale domain and range to match the new data length
      xScale.domain([0, data.length]).range([0, width]);
      svg.select(".x-axis").call(d3.axisBottom(xScale));
    }
  }, [data]);

  return <div ref={ref}></div>;
};

const Graphtest = () => {
  const [startDate, setStartDate] = useState(
    new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
  );
  const [endDate, setEndDate] = useState(new Date());
  const [data, setData] = useState([]);
  const [params, setparams] = useState([]);
  const [selectedParam, setSelectedParam] = useState("");

  const handleParamsCall = (name) => {
    setSelectedParam(name);

    if (params.data[name]) {
      console.log("찾았다 : ");
      console.log(params.data[name].length);
      console.log(JSON.stringify(params.data[name]));

      setData(params.data[name]);
    }
  };

  // 그래프 생성을 위한 x, y range 값
  const xRange =
    selectedParam && data[selectedParam] ? data[selectedParam].length : 1000;

  const yRange = 1;

  const componentcall = async (componentName) => {
    const inputdata = {
      componentName: componentName,
      endDate: endDate,
      machineName: "A_TEST",
      moduleName: "root-001",
      startDate: startDate,
    };

    const res2 = await api.post("data/machine/graph", inputdata);
    setparams(res2.data);
    console.log(res2.data.nameList);
  };

  const handleComponentCall = (componentName) => {
    componentcall(componentName);
  };

  useEffect(() => {
    const graph_data = async () => {
      const res = await api.post("data/Machine/G_TEST");
      setData(res.data);
    };
    graph_data();
  }, []);

  return (
    <div>
      <Period></Period>
      <Box>
        <Graph data={data} xRange={xRange} yRange={yRange} />

        <GraphParam
          nameList={params.nameList}
          handleParamsCall={handleParamsCall}
        ></GraphParam>
        <CompoBox>
          {data && //데이터 전체
            data.child && // 모듈 이름
            data.child[1].child.map((child, index) => {
              //0번째 모듈의 컴포넌트들
              //실제 쓸때는 data.child[index].
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
              const randomIndex = Math.floor(Math.random() * colors.length);
              const boxStyle = {
                backgroundColor: colors[randomIndex],
                display: "inline-block",
                width: "10px",
                height: "10px",
                marginRight: "5px",
              };
              const textStyle = { color: colors[randomIndex] };
              return (
                <React.Fragment key={index}>
                  <span style={{ ...boxStyle, marginLeft: "15px" }}></span>
                  <span
                    style={{
                      ...textStyle,
                      marginRight: "20px",
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      // console.log(child.value);
                      // console.log(child.name);

                      handleComponentCall(child.name);
                    }} //여기에 그래프 출력 코드
                    //axios api 보낸다
                    //api에 담길것 시작시간, 종료시간, 컴포넌트 이름, 모듈 이름, 머신 이름
                    // 시작 시간 : ~
                    // 종료 시간 : ~
                    // 컴포넌트 이름 :
                  >
                    {child.name}
                  </span>
                  {index !== data.child[1].length - 1 && " "}
                </React.Fragment> //res.data.child[0].child[0~2] 파라미터
              );
            })}
        </CompoBox>
      </Box>
    </div>
  );
};

export default Graphtest;

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
  overflow: hidden;
`;

const CompoBox = styled.div`
  position: absolute;
  top: 450px;
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
