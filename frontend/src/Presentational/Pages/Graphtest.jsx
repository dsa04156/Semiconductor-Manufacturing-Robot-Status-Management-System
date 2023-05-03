import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import * as d3 from "d3";
import api from "../../redux/api";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Graphtest = () => {
  const svgRef = useRef(null);
  const [hoveredValue, setHoveredValue] = useState(null);
  const yScale = d3.scaleLinear().domain([0, 1]).range([300, 0]);
  const [startDate, setStartDate] = useState(
    new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
  ); // 7일 전으로 가장 처음 start Default값을 세팅

  const [endDate, setEndDate] = useState(new Date());
  const [data, setData] = useState([]);
  const [showCalendar, setShowCalendar] = useState(false);
  const [showCalendar2, setShowCalendar2] = useState(false);
  const [data2, setData2] = useState([]);

  const componentcall = async (componentName) => {
    console.log(startDate);
    console.log(endDate);
    console.log(componentName);

    const inputdata = {
      componentName: componentName,
      endDate: { endDate },
      machineName: "A_TEST",
      moduleName: "root-001",
      startDate: { startDate },
    };
    const res2 = await api.post("data/machine/graph", inputdata);
    setData2(res2.data2);
    console.log(res2.data2);
  };

  const onChangeStartDate = (date) => {
    setStartDate(date);
  };
  const onChangeEndDate = (date) => {
    setEndDate(date);
  };
  const handleComponentCall = (componentName) => {
    componentcall(componentName);
  };
  useEffect(() => {
    const graph_data = async () => {
      const res = await api.post("data/Machine/G_TEST");
      setData(res.data);

      //res.data.name = 머신 이름
      // res.data = 전체 노드
      // res.data.chile[0~8] = 모듈 이름
      // res.data.child[0].name = lastdata(root-000)
      // res.data.child[1].name = root-001
      console.log(res.data.child); // 전체 노드
      //res.data.child[0].child[0~2] 파라미터

      //console.log(res.data.child[0].child[0]);
      //console.log(res.data.child[1]);
    };
    graph_data();

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
      <PeriodBox>
        {" "}
        PERIOD{" "}
        <CalendarIcon
          src="image/calendar-icon.png"
          onClick={() => {
            setShowCalendar(!showCalendar);
            console.log("clicked");
          }}
        />
        {showCalendar && (
          <DatePicker
            selected={startDate}
            onChange={(date) => {
              onChangeStartDate(date);
              setShowCalendar(false);
            }}
            selectsStart
            startDate={startDate}
            showTimeSelect
            timeFormat="HH:mm"
            timeIntervals={1}
            dateFormat="yyyy-MM-dd HH:mm"
            inline
            popperPlacement="bottom-end"
          />
        )}
        {startDate.toLocaleString("ko-KR", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
          pattern: " ",
        })}
        {"   "}~ {/* 아래는 EndDate */}
        <CalendarIcon
          src="image/calendar-icon.png"
          onClick={() => {
            setShowCalendar2(!showCalendar2);
            console.log("clicked");
          }}
        />
        {showCalendar2 && (
          <DatePicker
            selected={endDate}
            onChange={(date) => {
              onChangeEndDate(date);
              setShowCalendar2(false);
            }}
            selectsEnd
            endDate={endDate}
            showTimeSelect
            timeFormat="HH:mm"
            timeIntervals={1}
            dateFormat="yyyy-MM-dd HH:mm"
            inline
            popperPlacement="bottom-end"
          />
        )}
        {endDate.toLocaleString("ko-KR", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
          pattern: " ",
        })}
      </PeriodBox>
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
        <ParamBox></ParamBox>
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
                      console.log(child.value);
                      console.log(child.name);

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

const PeriodBox = styled.div`
  position: absolute;
  top: 15px;
  left: 150px;
  background: #ffffff;
  // border: 1px solid rgba(0, 0, 0, 0.2);
  // box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  width: 90%;
  height: 28%;

  display: flex;
  align-items: center;
  overflow: hidden;
  z-index: 1;
`;

const CalendarIcon = styled.img`
  width: 35px;
  height: 35px;
  margin-left: 10px;
  margin-right: 10px;
  cursor: pointer;
`;

const DateInput = styled.input`
  border: none;
  outline: none;
  width: 100%;
  height: 100%;
  font-size: 16px;
  color: #212121;
  background-color: transparent;
  cursor: pointer;
`;
