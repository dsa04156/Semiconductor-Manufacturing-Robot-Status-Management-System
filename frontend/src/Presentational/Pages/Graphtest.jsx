import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import * as d3 from "d3";
import api from "../../redux/api";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Condition from "../Component/MainPage/Condition";
import GraphParam from "./GraphParam";
import Period from "./Period";

const Graph = ({ lines, xRange, yRange }) => {
  const ref = useRef();
  const [tooltip, setTooltip] = useState({ show: false, x: 0, y: 0, date: "" });
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (lines.length > 0) {
      const margin = { top: 10, right: 10, bottom: 30, left: 30 };
      const width = 600 - margin.left - margin.right;
      const height = 400 - margin.top - margin.bottom;

      let svg = d3.select(ref.current).select("svg");

      if (svg.empty()) {
        svg = d3
          .select(ref.current)
          .append("svg")
          .attr("width", width + margin.left + margin.right)
          .attr("height", height + margin.top + margin.bottom)
          .append("g")
          .attr("transform", `translate(${margin.left},${margin.top})`);

        const xScale = d3
          .scaleLinear()
          .domain([0, lines[0].data.length - 1])
          .range([0, width]);

        const yScale = d3.scaleLinear().domain([0, yRange]).range([height, 0]);
        const graphGroup = svg.append("g");

        // x축 그리기
        graphGroup
          .append("g")
          .attr("class", "x-axis")
          .attr("transform", `translate(0, ${height})`)
          .call(d3.axisBottom(xScale));

        // y축 그리기
        graphGroup
          .append("g")
          .attr("class", "y-axis")
          .call(d3.axisLeft(yScale));
      }

      const xScale = d3
        .scaleLinear()
        .domain([0, lines[0].data.length - 1])
        .range([0, width]);

      const yScale = d3.scaleLinear().domain([0, yRange]).range([height, 0]);
      const graphGroup = svg.select("g");

      const line = d3
        .line()
        .defined((d) => d.value !== null && d.value !== undefined)
        .x((d, i) => xScale(i))
        .y((d) => yScale(d.value));

      graphGroup
        .selectAll(".line-path")
        .data(lines)
        .join("path")
        .classed("line-path", true)
        .attr("d", (lineData) => line(lineData.data))
        .attr("fill", "none")
        .attr("stroke", (lineData) => lineData.strokeColor)
        .attr("stroke-width", 3)
        .on("mouseover", () => {
          d3.select(".line").attr("stroke-width", 5); // 마우스가 올라갔을 때 선의 굵기를 3으로 변경
          d3.selectAll(".circle-dot").attr("r", 10); // 마우스가 올라갔을 때 원의 반지름을 5로 변경
        })
        .on("mouseout", () => {
          d3.select(".line").attr("stroke-width", 3); // 마우스가 벗어났을 때 선의 굵기를 1.5로 변경
          d3.selectAll(".circle-dot").attr("r", 7); // 마우스가 벗어났을 때 원의 반지름을 3으로 변경
        });

      graphGroup
        .selectAll(".circle-group")
        .data(lines)
        .join("g")
        .classed("circle-group", true)
        .selectAll("circle")
        .data((lineData) => lineData.data)
        .join("circle")
        .classed("circle-dot", true) // 이 클래스를 추가
        .attr("cx", (d, i) => xScale(i))
        .attr("cy", (d) => yScale(d.value))
        .attr("r", 7)
        .attr("fill", (d, i, nodes) => {
          // 부모 노드인 circle-group의 데이터에서 strokeColor 가져오기
          const parentData = d3.select(nodes[i].parentNode).datum();
          return parentData.strokeColor;
        })

        .on("mouseover", (event, d) => {
          d3.select(".line").attr("stroke-width", 5); // 마우스가 올라갔을 때 선의 굵기를 3으로 변경
          d3.selectAll(".circle-dot").attr("r", 10); // 마우스가 올라갔을 때 원의 반지름을 5로 변경

          const parentData = d3.select(event.target.parentNode).datum();

          setTooltip({
            show: true,
            x: event.pageX,
            y: event.pageY,
            date: "Date : " + d.date,
            value: "Value : " + d.value,
            name: "Name : " + parentData.name,
          });
        })

        .on("mousemove", (event) => {
          const x = event.pageX - ref.current.getBoundingClientRect().left;
          const y = event.pageY - ref.current.getBoundingClientRect().top;
          setTooltipPosition({ x, y });
        })

        .on("mouseout", () => {
          setTooltip({ ...tooltip, show: false });
          d3.select(".line").attr("stroke-width", 3); // 마우스가 벗어났을 때 선의 굵기를 1.5로 변경
          d3.selectAll(".circle-dot").attr("r", 7); // 마우스가 벗어났을 때 원의 반지름을 3으로 변경
        });
    }
  }, [lines, xRange, yRange]);

  return (
    <div ref={ref}>
      {tooltip.show && (
        <Tooltip style={{ left: tooltipPosition.x, top: tooltipPosition.y }}>
          <div>{tooltip.name}</div>
          <div>{tooltip.date}</div>
          <div>{tooltip.value}</div>
        </Tooltip>
      )}
    </div>
  );
};

const Graphtest = () => {
  const [lines, setLines] = useState([]);
  const [startDate, setStartDate] = useState(
    new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
  );
  const [endDate, setEndDate] = useState(new Date());
  const [data, setData] = useState([]);
  const [params, setparams] = useState({ data: {}, nameList: [], child: [] });

  const [selectedParam, setSelectedParam] = useState("");
  const [componentData, setComponentData] = useState([]);
  const colors = [
    "#4E79A7",
    "#F28E2B",
    "#E15759",
    "#76B7B2",
    "#59A14F",
    "#EDC948",
    "#B07AA1",
    "#FF9DA7",
    "#9C755F",
    "#BAB0AC",
  ];
  const handleParamsCall = (name, getColorForName) => {
    const existingLineIndex = lines.findIndex((line) => line.name === name);

    if (existingLineIndex !== -1) {
      // 이미 활성화된 라인이라면 제거
      setLines((prevLines) => {
        const updatedLines = prevLines.filter(
          (_, index) => index !== existingLineIndex
        );

        if (updatedLines.length === 0) {
          setSelectedParam("");
        } else {
          setSelectedParam((prevSelectedParam) =>
            prevSelectedParam === name ? "" : prevSelectedParam
          );
        }

        return updatedLines;
      });
    } else {
      // 아직 활성화되지 않은 라인이라면 추가
      if (params.data[name]) {
        const newLine = {
          name,
          data: params.data[name],
          strokeColor: getColorForName(name),
        };
        setLines((prevLines) => [...prevLines, newLine]);
        setSelectedParam(name);
        setData(params.data[name]);

        const color = getColorForName(name);
        if (color) {
          setStrokeColor(color);
        }
      }
    }
  };

  const [nameColors, setNameColors] = useState([]);

  const [strokeColor, setStrokeColor] = useState("steelblue");

  const [componentColors, setComponentColors] = useState([]);

  useEffect(() => {
    // 색상 배열의 길이가 params.nameList의 길이와 같지 않다면 색상 배열을 업데이트
    if (nameColors.length !== params.nameList.length) {
      const newColors = params.nameList.map(
        () => colors[Math.floor(Math.random() * colors.length)]
      );
      setNameColors(newColors);
    }
  }, [params.nameList, colors]);

  useEffect(() => {
    const newComponentColors = componentData.map(
      () => colors[Math.floor(Math.random() * colors.length)]
    );
    setComponentColors(newComponentColors);
  }, [componentData]);

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
    setparams({ ...res2.data, child: data.child });
    console.log(res2);
  };

  const handleComponentCall = (componentName) => {
    componentcall(componentName);
  };
  const handleComponentClick = (event, componentName) => {
    event.stopPropagation(); // 이벤트 버블링을 중지
    handleComponentCall(componentName);
  };
  useEffect(() => {
    const graph_data = async () => {
      const res = await api.post("data/Machine/A_TEST");
      //어떤 Machine 선택해서 post 쏠지도 이부분
      setComponentData(res.data.child[1].child);
      //이부분이 컴포넌트 리스트 출력부
    };
    graph_data();
  }, []);

  return (
    <div>
      <Period
        startDate={startDate}
        endDate={endDate}
        onChangeStartDate={setStartDate}
        onChangeEndDate={setEndDate}
      />
      <Box>
        <Graph
          lines={lines} // 수정된 prop 전달
          xRange={xRange}
          yRange={yRange}
        />

        <GraphParam
          nameList={params.nameList}
          handleParamsCall={handleParamsCall}
        ></GraphParam>
        <CompoBox>
          {componentData &&
            componentData.map((child, index) => {
              const boxStyle = {
                backgroundColor: componentColors[index],
                display: "inline-block",
                width: "10px",
                height: "10px",
                marginRight: "5px",
              };
              const textStyle = { color: componentColors[index] };
              return (
                <React.Fragment key={index}>
                  <span style={{ ...boxStyle, marginLeft: "15px" }}></span>
                  <span
                    style={{
                      ...textStyle,
                      marginRight: "20px",
                      cursor: "pointer",
                    }}
                    onClick={(event) => {
                      handleComponentClick(event, child.name);
                    }}
                  >
                    {child.name}
                  </span>
                  {data.child && index !== data.child[1].length - 1 && " "}
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
  flex-direction: column; // Flexbox의 방향을 column으로 설정
  justify-content: space-between; // 컴포넌트 사이에 공간을 균일하게 배분
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
const Tooltip = styled.div`
  position: absolute;
  background-color: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 5px;
  border-radius: 5px;
  font-size: 12px;
  pointer-events: none;
  left: ${(props) => props.x}px;
  top: ${(props) => props.y}px;
`;
