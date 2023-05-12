// import React, { useEffect, useRef, useState } from "react";
// import styled from "styled-components";
// import * as d3 from "d3";
// import api from "../../redux/api";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
// import Condition from "../Component/MainPage/Condition";
// import GraphParam from "./GraphParam";
// import Period from "./Period";
// import { debounce } from "lodash";

// const Graph = ({ lines, xRange, yRange, selectcompoData }) => {
//   console.log(selectcompoData);
//   const ref = useRef();
//   const [tooltip, setTooltip] = useState({ show: false, x: 0, y: 0, date: "" });
//   const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });

//   useEffect(() => {
//     const margin = { top: 10, right: 10, bottom: 30, left: 30 };
//     const width = 600 - margin.left - margin.right;
//     const height = 400 - margin.top - margin.bottom;

//     let svg = d3.select(ref.current).select("svg");

//     if (svg.empty()) {
//       svg = d3
//         .select(ref.current)
//         .append("svg")
//         .attr("width", width + margin.left + margin.right)
//         .attr("height", height + margin.top + margin.bottom)
//         .append("g")
//         .attr("transform", `translate(${margin.left},${margin.top})`);

//       const xScale = d3
//         .scaleLinear()
//         .domain([0, lines.length > 0 ? lines[0].data.length - 1 : 0])
//         .range([0, width]);

//       const yScale = d3.scaleLinear().domain([0, yRange]).range([height, 0]);
//       const graphGroup = svg.append("g");

//       // x축 그리기
//       graphGroup
//         .append("g")
//         .attr("class", "x-axis")
//         .attr("transform", `translate(0, ${height})`)
//         .call(d3.axisBottom(xScale));

//       // y축 그리기
//       graphGroup.append("g").attr("class", "y-axis").call(d3.axisLeft(yScale));
//     }
//     if (lines.length > 0) {
//       const xScale = d3
//         .scaleLinear()
//         .domain([0, lines[0].data.length - 1])
//         .range([0, width]);

//       const yScale = d3.scaleLinear().domain([0, yRange]).range([height, 0]);
//       const graphGroup = svg.select("g");

//       const line = d3
//         .line()
//         .defined((d) => d.value !== null && d.value !== undefined)
//         .x((d, i) => xScale(i))
//         .y((d) => yScale(d.value));

//       graphGroup
//         .selectAll(".line-path")
//         .data(lines)
//         .join("path")
//         .classed("line-path", true)
//         .attr("d", (lineData) => line(lineData.data))
//         .attr("fill", "none")
//         .attr("stroke", (lineData) => lineData.strokeColor)
//         .attr("stroke-width", 3)
//         .on("mouseover", function () {
//           d3.select(this).attr("stroke-width", 8).raise();
//           d3.select(this.parentNode).selectAll(".circle-dot").attr("r", 10);
//         })
//         .on("mouseout", function () {
//           d3.select(this).attr("stroke-width", 3);
//           d3.select(this.parentNode).selectAll(".circle-dot").attr("r", 7);
//         });

//       graphGroup
//         .selectAll(".circle-group")
//         .data(lines)
//         .join("g")
//         .classed("circle-group", true)
//         .selectAll("circle")
//         .data((lineData) => lineData.data)
//         .join("circle")
//         .classed("circle-dot", true)
//         .attr("cx", (d, i) => xScale(i))
//         .attr("cy", (d) => yScale(d.value))
//         .attr("r", 7)
//         .attr("fill", (d, i, nodes) => {
//           const parentData = d3.select(nodes[i].parentNode).datum();
//           return parentData.strokeColor;
//         })
//         .on("mouseover", function (event, d) {
//           const parentData = d3.select(this.parentNode).datum();
//           d3.select(this.parentNode)
//             .select(".line-path")
//             .attr("stroke-width", 8);
//           d3.select(this).attr("r", 10);

//           setTooltip({
//             show: true,
//             x: event.pageX,
//             y: event.pageY,
//             date: "Date : " + d.date,
//             value: "Value : " + d.value,
//             name: "Name : " + parentData.name,
//           });
//         })

//         .on("mousemove", (event) => {
//           const x = event.pageX - ref.current.getBoundingClientRect().left;
//           const y = event.pageY - ref.current.getBoundingClientRect().top;
//           setTooltipPosition({ x, y });
//         })
//         .on("mouseout", function () {
//           setTooltip({ ...tooltip, show: false });
//           d3.select(this.parentNode)
//             .select(".line-path")
//             .attr("stroke-width", 3);
//           d3.select(this).attr("r", 7);
//         });
//     } else {
//       // lines가 빈 배열일 때 기존 그래프를 삭제합니다.
//       const graphGroup = svg.select("g");
//       graphGroup.selectAll(".line-path").remove();
//       graphGroup.selectAll(".circle-group").remove();
//     }
//   }, [lines, xRange, yRange]);

//   return (
//     <div ref={ref}>
//       {tooltip.show && (
//         <Tooltip style={{ left: tooltipPosition.x, top: tooltipPosition.y }}>
//           <div>{tooltip.name}</div>
//           <div>{tooltip.date}</div>
//           <div>{tooltip.value}</div>
//         </Tooltip>
//       )}
//     </div>
//   );
// };

// const MemoizedGraph = React.memo(Graph);
// const Graphtest = () => {
//   const [lines, setLines] = useState([]);
//   const [startDate, setStartDate] = useState(
//     new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
//   );
//   const [endDate, setEndDate] = useState(new Date());
//   const [data, setData] = useState([]);
//   const [params, setparams] = useState({ data: {}, nameList: [], child: [] });

//   const [selectedParam, setSelectedParam] = useState("");
//   const [componentData, setComponentData] = useState([]);
//   const colors = [
//     "#4E79A7",
//     "#F28E2B",
//     "#E15759",
//     "#76B7B2",
//     "#59A14F",
//     "#EDC948",
//     "#B07AA1",
//     "#FF9DA7",
//     "#9C755F",
//     "#BAB0AC",
//   ];
//   const handleParamsCall = (name, getColorForName) => {
//     const existingLineIndex = lines.findIndex((line) => line.name === name);

//     if (existingLineIndex !== -1) {
//       // 이미 활성화된 라인이라면 제거
//       if (lines.length > 1) {
//         setLines((prevLines) => {
//           const updatedLines = prevLines.filter(
//             (_, index) => index !== existingLineIndex
//           );
//           setSelectedParam(name);

//           return updatedLines;
//         });
//       } else {
//         // 활성화된 그래프가 단 하나만 남았을 때, 선택된 그래프를 비활성화하도록 수정
//         setLines([]);
//         setSelectedParam("");
//       }
//     } else {
//       // 아직 활성화되지 않은 라인이라면 추가
//       if (params.data[name]) {
//         const newLine = {
//           name,
//           data: params.data[name],
//           strokeColor: getColorForName(name),
//         };
//         setLines((prevLines) => [...prevLines, newLine]);
//         setSelectedParam(name);
//         setData(params.data[name]);

//         const color = getColorForName(name);
//         if (color) {
//           setStrokeColor(color);
//         }
//       }
//     }
//   };

//   const [nameColors, setNameColors] = useState([]);

//   const [strokeColor, setStrokeColor] = useState("steelblue");

//   const [componentColors, setComponentColors] = useState([]);
//   const [usedColors, setUsedColors] = useState(new Set());

//   useEffect(() => {
//     if (componentColors.length !== componentData.length) {
//       const newComponentColors = componentData.map(() => {
//         let newColor;
//         do {
//           newColor = colors[Math.floor(Math.random() * colors.length)];
//         } while (usedColors.has(newColor));
//         setUsedColors(
//           (prevUsedColors) => new Set([...prevUsedColors, newColor])
//         );
//         return newColor;
//       });
//       setComponentColors(newComponentColors);
//     }
//   }, [componentData, usedColors]);

//   useEffect(() => {
//     // 색상 배열의 길이가 params.nameList의 길이와 같지 않다면 색상 배열을 업데이트
//     if (nameColors.length !== params.nameList.length) {
//       const newColors = params.nameList.map(
//         () => colors[Math.floor(Math.random() * colors.length)]
//       );
//       setNameColors(newColors);
//     }
//   }, [params.nameList, colors]);

//   useEffect(() => {
//     const newComponentColors = componentData.map(
//       () => colors[Math.floor(Math.random() * colors.length)]
//     );
//     setComponentColors(newComponentColors);
//   }, [componentData]);

//   // 그래프 생성을 위한 x, y range 값
//   const xRange =
//     selectedParam && data[selectedParam] ? data[selectedParam].length : 1000;

//   const yRange = 1;

//   const componentcall = async (componentName) => {
//     const inputdata = {
//       componentName: componentName,
//       endDate: endDate,
//       machineName: "A_TEST",
//       moduleName: "root-001",
//       startDate: startDate,
//     };

//     const res2 = await api.post("data/machine/graph", inputdata);
//     setparams({ ...res2.data, child: data.child });
//     //console.log(res2);
//   };

//   const handleComponentCall = (componentName) => {
//     componentcall(componentName);
//   };

//   const handleComponentClick = (event, componentName) => {
//     event.stopPropagation(); // 이벤트 버블링을 중지
//     handleComponentCall(componentName);
//   };

//   const debouncedHandleComponentClick = debounce((event, componentName) => {
//     handleComponentClick(event, componentName);
//   }, 300);
//   useEffect(() => {
//     const graph_data = async () => {
//       const res = await api.post("data/Machine/A_TEST");
//       console.log(res);
//       //어떤 Machine 선택해서 post 쏠지도 이부분
//       setComponentData(res.data.child[1].child);  // 여기에 컴포넌트 리스트 담은 변수만 넣어주면 됨.
//       console.log(componentData);
//       //이부분이 컴포넌트 리스트 출력부
//     };
//     graph_data();
//   }, []);

//   return (
//     <div>
//       <Period
//         startDate={startDate}
//         endDate={endDate}
//         onChangeStartDate={setStartDate}
//         onChangeEndDate={setEndDate}
//       />
//       <Box>
//         <MemoizedGraph //성능 개선을 위한 React.Memo 사용
//           lines={lines}
//           xRange={xRange}
//           yRange={yRange}
//         />

//         <GraphParam
//           nameList={params.nameList}
//           handleParamsCall={handleParamsCall}
//         ></GraphParam>
//         <CompoBox
//           onClick={(event) => {
//             const componentName = event.target.getAttribute(
//               "data-component-name"
//             );
//             if (componentName) {
//               debouncedHandleComponentClick(event, componentName);
//             }
//           }}
//         >
//           {componentData &&
//             componentData.map((child, index) => {
//               const boxStyle = {
//                 backgroundColor: componentColors[index],
//                 display: "inline-block",
//                 width: "10px",
//                 height: "10px",
//                 marginRight: "5px",
//               };
//               const textStyle = { color: componentColors[index] };
//               return (
//                 <React.Fragment key={index}>
//                   <span style={{ ...boxStyle, marginLeft: "15px" }}></span>
//                   <span
//                     style={{
//                       ...textStyle,
//                       marginRight: "20px",
//                       cursor: "pointer",
//                     }}
//                     data-component-name={child.name}
//                   >
//                     {child.name}
//                   </span>
//                 </React.Fragment>
//               );
//             })}
//         </CompoBox>
//       </Box>
//     </div>
//   );
// };

// export default Graphtest;

// const Box = styled.div`
//   position: absolute;
//   top: 260px;
//   left: 600px;
//   background: #ffffff;
//   border: 1px solid rgba(0, 0, 0, 0.2);
//   width: 58%;
//   height: 62%;
//   box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
//   border-radius: 20px;
//   display: flex;
//   flex-direction: column; // Flexbox의 방향을 column으로 설정
//   justify-content: space-between; // 컴포넌트 사이에 공간을 균일하게 배분
//   align-items: center;
//   overflow: hidden;
// `;
// const CompoBox = styled.div`
//   position: absolute;
//   top: 400px;
//   left: 30px;
//   background: #ffffff;
//   border: 1px solid rgba(0, 0, 0, 0.2);
//   width: 80%;
//   height: 10%;
//   box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
//   border-radius: 20px;
//   display: flex;
//   align-items: center;
//   overflow: hidden;
// `;
// const Tooltip = styled.div`
//   position: absolute;
//   background-color: rgba(0, 0, 0, 0.7);
//   color: white;
//   padding: 5px;
//   border-radius: 5px;
//   font-size: 12px;
//   pointer-events: none;
//   left: ${(props) => props.x}px;
//   top: ${(props) => props.y}px;
// `;

import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import * as d3 from "d3";
import api from "../../redux/api";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Condition from "../Component/MainPage/Condition";
import GraphParam from "./GraphParam";
import Period from "./Period";
import { debounce } from "lodash";

const Graph = ({ lines, xRange, yRange }) => {
  const ref = useRef();
  const xScaleRef = useRef();
  const widthRef = useRef();

  const [tooltip, setTooltip] = useState({ show: false, x: 0, y: 0, date: "" });
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const [activeLines, setActiveLines] = useState([]);

  useEffect(() => {
    const startTime = performance.now();
    const margin = { top: 40, right: 0, bottom: 35, left: 35 };

    let dataLength =
      lines.length > 0 && lines[0].data.length > 0 ? lines[0].data.length : 0;

    // 데이터 갯수에 따라 svg의 가로 길이를 결정
    let width = dataLength > 100 ? dataLength * 3 : 600; // 데이터 갯수당 ?px로 계산. 조절 가능.

    lines.forEach((line) => {
      line.data.forEach((d) => {
        d.date = new Date(d.date); // You can use d3.timeParse if needed
      });
    });
    let minDate = d3.min(lines, (line) => d3.min(line.data, (d) => d.date));
    let maxDate = d3.max(lines, (line) => d3.max(line.data, (d) => d.date));

    width = width - margin.left - margin.right + 230;
    const height = 400 - margin.top - margin.bottom;
    widthRef.current = width;

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
        .scaleTime()
        .domain([minDate, maxDate])
        .range([0, width]);

      xScaleRef.current = xScale;
      const yScale = d3.scaleLinear().domain([0, yRange]).range([height, 0]);
      const graphGroup = svg.append("g");

      // x축 그리기
      graphGroup
        .append("g")
        .attr("class", "x-axis")
        .attr("transform", `translate(0, ${height})`)
        .call(
          d3
            .axisBottom(xScale)

            .tickFormat(d3.timeFormat("%m-%d")) // 날짜 형식 지정
        );

      // y축 그리기
      graphGroup.append("g").attr("class", "y-axis").call(d3.axisLeft(yScale));
    }

    if (lines.length > 0) {
      const xScale = d3
        .scaleTime()
        .domain([minDate, maxDate])
        .range([0, width]);

      xScaleRef.current = xScale;
      const yScale = d3.scaleLinear().domain([0, yRange]).range([height, 0]);

      const graphGroup = svg.select("g");
      // 줌 기능 구현
      const zoom = d3
        .zoom()
        .scaleExtent([-20, 20]) // 축소/확대 범위 설정
        .translateExtent([
          [-width * 0.8, -height * 0.8],
          [width * 1.5, height * 1.5],
        ]) // 위치 이동 범위 설정
        .on("zoom", zoomed); // 줌 이벤트 핸들러 등록
      function zoomed({ transform }) {
        graphGroup.attr("transform", transform);
        let ticks = [];
        lines.forEach((line) => {
          line.data.forEach((d) => {
            if (d.date.getHours() === 0 && d.date.getMinutes() === 0) {
              ticks.push(d.date);
            } else if (d.date.getHours() === 12 && d.date.getMinutes() === 0) {
              ticks.push(d.date);
            } else if (d.date.getHours() === 6 && d.date.getMinutes() === 0) {
              ticks.push(d.date);
            } else if (d.date.getHours() === 18 && d.date.getMinutes() === 0) {
              ticks.push(d.date);
            }
          });
        });
        graphGroup
          .select(".x-axis")
          .call(
            d3
              .axisBottom(xScale)
              .tickValues(ticks) // 사용자 정의 눈금 생성
              .tickFormat(d3.timeFormat("%m-%d %H:%M")) // 날짜 형식 지정
          )
          .attr("transform", `translate(0, ${height})`);
      }

      svg.call(zoom);

      const line = d3
        .line()
        .defined((d) => d.value !== null && d.value !== undefined)
        .x((d) => xScale(d.date))
        .y((d) => yScale(d.value));

      graphGroup
        .selectAll(".line-path")
        .data(lines)
        .join("path")
        .classed("line-path", true)
        .attr("d", (lineData) => line(lineData.data))
        .attr("fill", "none")
        .attr("stroke", (lineData) => lineData.strokeColor)
        .attr("stroke-width", 0.7);

      graphGroup
        .selectAll(".circle-group")
        .data(lines)
        .join("g")
        .classed("circle-group", true)
        .selectAll("circle")
        .data((lineData) => lineData.data)
        .join("circle")
        .classed("circle-dot", true)
        .attr("cx", (d) => xScale(d.date))
        .attr("cy", (d) => yScale(d.value))
        .attr("r", 2)
        .attr("fill", (d, i, nodes) => {
          const parentData = d3.select(nodes[i].parentNode).datum();
          return parentData.strokeColor;
        })
        .on("mouseover", function (event, d) {
          const parentData = d3.select(this.parentNode).datum();
          d3.select(this.parentNode)
            .select(".line-path")
            .attr("stroke-width", 0.7);
          d3.select(this).attr("r", 2);
          const dateFormat = d3.timeFormat("%Y-%m-%d %H:%M");

          setTooltip({
            show: true,
            x: event.pageX,
            y: event.pageY,
            date: "Date : " + dateFormat(d.date),
            value: "Value : " + d.value,
            name: "Name : " + parentData.name,
          });
        })

        .on("mousemove", (event) => {
          const x = event.pageX - ref.current.getBoundingClientRect().left;
          const y = event.pageY - ref.current.getBoundingClientRect().top;
          setTooltipPosition({ x, y });
        })
        .on("mouseout", function () {
          setTooltip({ ...tooltip, show: false });
          d3.select(this.parentNode)
            .select(".line-path")
            .attr("stroke-width", 0.7);
          d3.select(this).attr("r", 2);
        });
    } else {
      // lines가 빈 배열일 때 기존 그래프를 삭제합니다.
      const graphGroup = svg.select("g");
      graphGroup.selectAll(".line-path").remove();
      graphGroup.selectAll(".circle-group").remove();
    }

    const endTime = performance.now();
    const elapsedTime = endTime - startTime;

    console.log(`그래프를 그리는데 ${elapsedTime}밀리초가 소요되었습니다.`);
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

const MemoizedGraph = React.memo(Graph);

const Graphtest = ({
  selectedcompoData,
  selectedMachineName,
  selectedModuleName,
}) => {
  const [lines, setLines] = useState([]);
  const [startDate, setStartDate] = useState(
    new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
  );

  const [endDate, setEndDate] = useState(new Date());
  const [data, setData] = useState([]);
  const [params, setparams] = useState({ data: [], nameList: [] });
  const setParamsFromResponse = (responseData) => {
    if (!responseData || responseData.length === 0) {
      setparams({ data: {}, nameList: [] });
      return;
    }

    const data = responseData.reduce((accumulator, currentValue) => {
      accumulator[currentValue.name] = currentValue.data;
      return accumulator;
    }, {});
    const nameList = responseData.map((item) => item.name);

    setparams({ data, nameList });
  };

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
      // 이미 활성화된 라인이라면 라인을 제거
      if (lines.length > 1) {
        setLines((prevLines) => {
          const updatedLines = prevLines.filter(
            (_, index) => index !== existingLineIndex
          );
          setSelectedParam(name);

          return updatedLines;
        });
      } else {
        // 활성화된 그래프가 단 하나만 남았을 때, 선택된 그래프를 비활성화하도록 수정
        setLines([]);
        setSelectedParam("");
      }
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
  const [usedColors, setUsedColors] = useState(new Set());

  useEffect(() => {
    if (componentColors.length !== componentData.length) {
      const newComponentColors = componentData.map(() => {
        let newColor;
        do {
          newColor = colors[Math.floor(Math.random() * colors.length)];
        } while (usedColors.has(newColor));
        setUsedColors(
          (prevUsedColors) => new Set([...prevUsedColors, newColor])
        );
        return newColor;
      });
      setComponentColors(newComponentColors);
    }
  }, [componentData, usedColors]);

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
      componentName: selectedcompoData.name,
      endDate: endDate,
      machineName: selectedMachineName,
      moduleName: selectedModuleName,
      startDate: startDate,
    };

    console.time("API Request");

    const res2 = await api.post("data/graph", inputdata);

    console.timeEnd("API Request");

    setParamsFromResponse(res2.data);
    console.log("setparams 콘솔");

    console.log(res2.data);
  };

  const handleComponentCall = (componentName) => {
    componentcall(componentName);
  };

  const handleComponentClick = (componentName) => {
    // event.stopPropagation(); // 이벤트 버블링을 중지
    handleComponentCall(componentName);
  };

  const debouncedHandleComponentClick = debounce((componentName) => {
    handleComponentClick(componentName);
  }, 300);

  useEffect(() => {
    if (selectedcompoData) {
      debouncedHandleComponentClick(selectedcompoData.name);
    }
  }, [selectedcompoData?.name]);


const Box = styled.div`
  position: absolute;
  top: 260px;
  left: 600px;
  background: #ffffff;
  border: 1px solid rgba(0, 0, 0, 0.2);
  width: 900px;
  height: 470px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 20px;
  display: flex;
  flex-direction: column; // Flexbox의 방향을 column으로 설정
  justify-content: space-between; // 컴포넌트 사이에 공간을 균일하게 배분

  overflow: hidden;
`;
// const Tooltip = styled.div`
//   position: absolute;
//   background-color: rgba(0, 0, 0, 0.7);
//   color: white;
//   padding: 5px;
//   border-radius: 5px;
//   font-size: 12px;
//   pointer-events: none;
//   left: ${(props) => props.x}px;
//   top: ${(props) => props.y}px;
// `;