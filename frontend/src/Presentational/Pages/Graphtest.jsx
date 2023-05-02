import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import * as d3 from "d3";
import api from "../../redux/api";

const Graphtest = () => {
  const svgRef = useRef(null);
  const [hoveredValue, setHoveredValue] = useState(null);
  const yScale = d3.scaleLinear().domain([0, 1]).range([300, 0]);

  const [data, setData] = useState([]);

  useEffect(() => {
    const graph_data = async () => {
      const res = await api.post("data/Machine/G_TEST");
      setData(res.data);
      console.log(res.data); // 전체 노드
      //  console.log(res.data[0].name); // 머신 이름
      //  console.log(res.data[0].child); // 머신 바로 아래 모듈리스트 전부
      // console.log(res.data[0].chile[0~8]) // 모듈리스트 바로 아래
      //   console.log(res.data[0].child[0].child[0].value);
      // console.log(res.data[0].child[0].child[0~3].name); 그래프 아래 띄울거
    };
    graph_data();

    // },[]);

    // useEffect(() => {
    //   // D3 멀티 라인 차트 코드 가져오기
    //   const data = [
    //     { date: "2022-01-01 12:00", value: 0.1 },
    //     { date: "2022-01-02 12:00", value: 0.5 },
    //     { date: "2022-01-03", value: 0.8 },
    //     { date: "2022-01-04", value: 0.4 },
    //     { date: "2022-01-05", value: 0.8 },
    //   ];

    //period 2022 1 4 00:00 ~ 2022 1 4 13:00
    //period 설정하면 초기 x축 왼쪽, 오른쪽 끝값으로 갈것

    //heater1 2022 1 4 18:00  value 0.3

    const svg = d3.select(svgRef.current);

    // 스케일 및 축 설정
    const xScale = d3
      .scaleTime()
      .domain(d3.extent(data, (d) => new Date(d.date)))
      .range([0, 500]);

    // const yScale = d3.scaleLinear().domain([0, 1]).range([300, 0]);

    const xAxis = d3.axisBottom(xScale).tickPadding(10).tickSize(-300);
    const yAxis = d3.axisLeft(yScale).tickPadding(10).tickSize(-500);

    svg.append("g").attr("transform", "translate(50, 350)").call(xAxis);
    svg.append("g").attr("transform", "translate(50, 50)").call(yAxis);

    // 라인 그리기
    const line = d3
      .line()
      .x((d) => xScale(new Date(d.date)))
      .y((d) => yScale(d.value));

    svg
      .append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-width", 2)
      .attr("d", line);

    // 꼭짓점에 점 추가하기
    svg
      .selectAll(".dot")
      .data(data)
      .enter()
      .append("circle")
      .attr("class", "dot")
      .attr("cx", (d) => xScale(new Date(d.date)))
      .attr("cy", (d) => yScale(d.value))
      .attr("r", 4)
      .attr("fill", "steelblue")
      .on("mouseenter", (event, d) => {
        const hoveredY = yScale(d.value);
        setHoveredValue({ value: d.value, x: 50, y: hoveredY });
      })
      .on("mouseleave", (event, d) => {
        setHoveredValue({ value: null, x: 0, y: 0 });
      });
  }, []);

  return (
    <div>
      <Box>
        <svg ref={svgRef} width="900" height="550">
          {hoveredValue !== null && hoveredValue.value !== null && (
            <text
              x={hoveredValue.x}
              y={hoveredValue.y - 10}
              fill="steelblue"
              fontSize="24"
              fontWeight="bold"
              textAnchor="end"
            >
              {hoveredValue.value.toFixed(1)}
            </text>
          )}
        </svg>
        <CompoBox>
          {data[0] &&
            data[0].child &&
            data[0].child[0].child[0].child.map((child, index) => {
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
                    onClick={
                      () => console.log(child.value) //여기에 그래프 출력 코드
                    }
                  >
                    {child.name}
                  </span>
                  {index !== data[0].child[0].child[0].child.length - 1 && " "}
                </React.Fragment>
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
  top: 380px;
  left: 30px;
  background: #ffffff;
  border: 1px solid rgba(0, 0, 0, 0.2);
  width: 60%;
  height: 10%;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 20px;
  display: flex;
  align-items: center;
  overflow: hidden;
`;
