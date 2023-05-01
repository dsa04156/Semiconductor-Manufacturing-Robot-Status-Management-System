import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import * as d3 from "d3";

const VirtualMetrology = () => {
  const boxRef = useRef();

  useEffect(() => {
    const getData = async () => {
      const response = await fetch(
        "https://raw.githubusercontent.com/d3/d3.github.io/main/" +
          "d3-3.x-api-reference/tsv/unemployment.tsv"
      );
      const data = await response.text();
      const parsedData = d3.tsvParse(data, (d) => {
        return { date: new Date(d.date), rate: +d.rate };
      });
      drawGraph(parsedData);
    };
    getData();
  }, []);

  const drawGraph = (data) => {
    // 그래프 생성
    const margin = { top: 20, right: 20, bottom: 30, left: 40 };
    const width = boxRef.current.offsetWidth - margin.left - margin.right;
    const height = boxRef.current.offsetHeight - margin.top - margin.bottom;

    const x = d3.scaleTime().range([0, width]);
    const y = d3.scaleLinear().range([height, 0]);

    const xAxis = d3.axisBottom(x);
    const yAxis = d3.axisLeft(y);

    const line = d3
      .line()
      .x((d) => x(d.date))
      .y((d) => y(d.rate));

    const svg = d3
      .select(boxRef.current)
      .append("svg")
      .attr(
        "viewBox",
        `0 0 ${boxRef.current.offsetWidth} ${boxRef.current.offsetHeight}`
      )
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    x.domain(d3.extent(data, (d) => d.date));
    y.domain([0, d3.max(data, (d) => d.rate)]);

    svg
      .append("g")
      .attr("class", "x-axis")
      .attr("transform", `translate(0,${height})`)
      .call(xAxis);

    svg.append("g").attr("class", "y-axis").call(yAxis);

    svg.append("path").datum(data).attr("class", "line").attr("d", line);
  };

  return <Box ref={boxRef}></Box>;
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
