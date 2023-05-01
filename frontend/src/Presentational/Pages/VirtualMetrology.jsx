import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import * as d3 from "d3";

const VirtualMetrology = () => {
  const svgRef = useRef(null);
  const [hoveredValue, setHoveredValue] = useState(null);
  const yScale = d3.scaleLinear().domain([0, 1]).range([300, 0]);

  useEffect(() => {
    // D3 멀티 라인 차트 코드 가져오기
    const data = [
      { date: "2022-01-01", value: 0.1 },
      { date: "2022-01-02", value: 0.5 },
      { date: "2022-01-03", value: 0.8 },
      { date: "2022-01-04", value: 0.4 },
      { date: "2022-01-05", value: 0.8 },
    ];

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
        setHoveredValue(d.value);
      })
      .on("mouseleave", (event, d) => {
        setHoveredValue(null);
      });
  }, []);

  return (
    <div>
      <Box>
        <svg ref={svgRef} width="900" height="550">
          {hoveredValue !== null && (
            <text
              x={50}
              y={yScale(hoveredValue)}
              fill="steelblue"
              fontSize="12"
              fontWeight="bold"
              textAnchor="end"
            >
              {hoveredValue.toFixed(1)}
            </text>
          )}
        </svg>
      </Box>
    </div>
  );
};

export default VirtualMetrology;

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
