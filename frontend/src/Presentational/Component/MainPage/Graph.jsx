import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ko } from "date-fns/esm/locale";
import { Icon } from "@iconify/react";
import { Oval } from "react-loader-spinner";
import ECharts, { EchartsReactprops } from "echarts-for-react";
import axios from "axios";
import * as echarts from "echarts";

import { cloneDeep } from "lodash";

const Graph = ({ selectedcompoData, selectedMachineName, selectedModuleName }) => {
  const [startDate, setStartDate] = useState(new Date(Date.now() - 7 * 24 * 60 * 60 * 1000));
  const [endDate, setendDate] = useState(new Date());
  const [startDateOpen, setStartDateOpen] = useState(false);
  const [endDateOpen, setEndDateOpen] = useState(false);
  const [realGraphBtn, setRealGraphBtn] = useState(false); // 실시간 그래프 버튼상태
  const [saveResultArr, setSaveResultArr] = useState();
  const chartRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);

  // window.onload = function () {
  //   window.myChart = echarts.init(document.getElementById('main'));

  //   //scroll datazoom
  //   window.myChart.on('dataZoom', function(event){
  //       if(event.batch){
  //           option.dataZoom[0].startValue = event.batch[0].startValue;
  //           option.dataZoom[1].startValue = event.batch[0].startValue;
  //           option.dataZoom[0].endValue = event.batch[0].endValue;
  //           option.dataZoom[1].endValue = event.batch[0].endValue;
  //       } else {
  //           option.dataZoom[0].startValue = event.startValue;
  //           option.dataZoom[1].startValue = event.startValue;
  //           option.dataZoom[0].endValue = event.endValue;
  //           option.dataZoom[1].endValue = event.endValue;
  //       };
  //   });

  // window.myChart.setOption(option);
  // }

  const [option, setOption] = useState({
    tooltip: {
      trigger: "axis",
    },
    legend: {
      data: [],
    },
    toolbox: {
      feature: {
        dataZoom: {
          yAxisIndex: "none",
          bottom: 0,
        },
        restore: {},
      },
      right: 0,
      top: 30,
    },
    xAxis: {
      type: "time",
      min: new Date("2021-12-31T23:59:59.999Z").getTime(),
      max: new Date("2022-12-31T23:59:59.999Z").getTime(),
      show: true,
    },
    yAxis: {
      type: "value",
      boundaryGap: [0, "1%"],
      show: true,
    },
    dataZoom: [
      {
        type: "slider",
        show: true,
        start: 0,
        end: 100,
        handleSize: 8,
      },
      {
        type: "inside",
        start: 0,
        end: 100,
      },
    ],
    series: [],
  });

  const [option2, setOption2] = useState({
    tooltip: {
      trigger: "axis",
    },
    legend: {
      data: [],
    },
    xAxis: {
      type: "time",
      min: new Date("2021-12-31T23:59:59.999Z").getTime(),
      max: new Date("2022-12-31T23:59:59.999Z").getTime(),
    },
    yAxis: {
      type: "value",
      boundaryGap: [0, "1%"],
      show: true,
    },
    grid: {
      top: 60,
      bottom: 60,
    },

    series: [],
  });

  // option 상태가 변경될 때마다 이 effect가 실행됩니다.
  // useEffect(() => {
  //   // chartRef.current가 유효한 경우에만 setOption을 호출합니다.
  //   if(chartRef.current) {
  //   const myChart = chartRef.current.getEchartsInstance();
  //   myChart.setOption(option)
  //   }
  // }, [option]);  // option이 변경될 때마다 이 effect가 실행됩니다.

  let resultArrData = [];

  const samplingOpt = {
    large: true,
    sample: 1,
  };

  // useEffect(() => {
  //   if (chartRef.current) {
  //     const chartInstance = chartRef.current.getEchartsInstance();
  //     chartInstance.clear();
  //     chartInstance.setOption(getInitialOptions());
  //   }
  // }, [selectedMachineName, selectedModuleName, selectedcompoData]);

  // 이 옵션으로 chart를 만듦
  const getInitialOptions = () => ({
    tooltip: {
      trigger: "axis",
    },
    toolbox: {
      feature: {
        dataZoom: {
          yAxisIndex: "none",
          bottom: 0,
        },
        restore: {},
      },
      right: 0,
      top: 30,
    },
    xAxis: {
      type: "time",
      min: new Date("2021-12-31T23:59:59.999Z").getTime(),
      max: new Date("2022-12-31T23:59:59.999Z").getTime(),
      show: true,
    },
    yAxis: {
      type: "value",
      boundaryGap: ["1%", "1%"],
      show: true,
    },
    dataZoom: [
      {
        type: "slider",
        show: true,
        start: 0,
        end: 100,
        handleSize: 8,
      },
      {
        type: "inside",
        start: 0,
        end: 100,
      },
    ],
    series: [],
  });

  const newRealGraph = (newData) => {
    console.log("newRealGraph함수 실행");
    setOption2((prev) => {
      const newOption = { ...prev }; // 깊은 복사

      let minTime = new Date(newOption.series[0].data[0][0]);
      let minTimeIndex = 0;
      for (let i = 0; i < newOption.series.length; i++) {
        if (minTime > new Date(newOption.series[i].data[0][0]))
          minTime = new Date(newOption.series[i].data[0][0]);
        minTimeIndex = i;
      }

      for (let j = 0; j < newData.length; j++) {
        for (let i = 0; i < newOption.series.length; i++) {
          if (newOption.series[i].name === newData[j].name) {
            newOption.series[i].data.shift();
            newOption.series[i].data.push([newData[j].date, newData[j].value]);
            break;
          }
        }
      }

      newOption.xAxis.max = new Date(newData[0].date).getTime();
      newOption.xAxis.min = newOption.series[minTimeIndex].data[0][0];

      if (chartRef.current) {
        const myChart = chartRef.current.getEchartsInstance();
        var zoomStart = myChart.getOption().dataZoom[0].start;
        var zoomEnd = myChart.getOption().dataZoom[0].end;
        myChart.setOption(newOption, false);
        myChart.setOption({
          dataZoom: [
            {
              start: zoomStart,
              end: zoomEnd,
            },
          ],
        });
      }
      return newOption;
    });
  };
  const prevdata = (realTimeFlag, resultArr, nameArr) => {
    console.log("prevdata함수 실행");
    let realStart = new Date();
    realStart = new Date(realStart.getTime() - realStart.getTimezoneOffset() * 60000);
    realStart.setHours(realStart.getHours() - 10);
    console.log(realStart);
    if (realTimeFlag) {
      console.log("prevdata 안 if문 실행");
      console.log("실시간 결과 값들", resultArr);
      const newOption2 = option2;
      newOption2.xAxis = {
        type: "time",
        min: realStart.getTime(),
        max: endDate.getTime(),
      };
      newOption2.legend = {
        data: nameArr,
        selectedMode: true,
      };
      newOption2.series = resultArr;
      setOption2((prev) => ({
        ...prev,
        xAxis: {
          type: "time",
          min: realStart.getTime(),
          max: endDate.getTime(),
        },
        legend: {
          data: nameArr,
          selectedMode: true,
        },
        series: resultArr,
      }));

      if (chartRef.current) {
        const myChart = chartRef.current.getEchartsInstance();
        myChart.setOption(newOption2);
      }
    } else {
      console.log("이게 왜 됨ㄴ어ㅣㄹ미;ㄴ얼;", realGraphBtn);
      const t0 = performance.now();
      setOption((prev) => ({
        ...prev,
        xAxis: {
          type: "time",
          min: startDate.getTime(),
          max: endDate.getTime(),
          show: true,
        },
        legend: {
          data: nameArr,
          selectedMode: true,
        },
        series: resultArr,
      }));
      const t1 = performance.now();
      const elapsed = t1 - t0;
      console.log(elapsed);

      if (chartRef.current) {
        console.log("prevdata else 문 안에 if(cahrtRef.current문) 실행");
        const myChart = chartRef.current.getEchartsInstance();
        myChart.setOption(option);
      }
    }
  };

  const onGraphHandler = () => {
    console.log("onGraphHandler함수 실행");
    if (!selectedcompoData || !selectedcompoData.name) {
      alert("값을 선택해주세요");
    } else {
      const time1 = performance.now();

      setRealGraphBtn(false);
      console.log(realGraphBtn);
      setIsLoading(true);
      axios
        .post("http://3.36.125.122:8082/data/parameter", {
          componentName: selectedcompoData.name,
          endDate: endDate,
          machineName: selectedMachineName,
          moduleName: selectedModuleName,
          startDate: startDate,
        })
        .then((res1) => {
          if (res1.data.length === 0) {
            alert("해당 기간에는 데이터가 없습니다");
            setIsLoading(false);
          } else {
            const t0 = performance.now();
            const minus = time1 - t0;
            console.log("name api문", minus);
            console.log(res1.data);
            let nameArr = [];
            for (let i = 0; i < res1.data.length; i++) {
              nameArr.push(res1.data[i].name);
            }

            let machineName = selectedMachineName;
            let moduleName = selectedModuleName;
            let componentName = selectedcompoData.name;
            nameArr.push(componentName);

            let resultArr = [];

            const t1 = performance.now();

            Promise.all(
              nameArr.map(async (name) => {
                let parent = componentName;
                if (name == componentName) {
                  parent = moduleName;
                }
                console.log(startDate);
                console.log(endDate);
                const res2 = await axios.post("http://3.36.125.122:8082/data/pgraph", {
                  endDate: endDate,
                  startDate: startDate,
                  machineName: machineName,
                  componentName: parent,
                  parameterName: name,
                });
                let dataArr = [];
                const perfor1 = performance.now();
                for (let j = 0; j < res2.data.length; j++) {
                  dataArr.push([new Date(res2.data[j].date).toISOString(), res2.data[j].value]);
                }
                const perfor2 = performance.now();
                console.log("for문 시간 : ", perfor2 - perfor1);
                return {
                  name: name,
                  type: "line",
                  symbol: "none",
                  sampling: "average",
                  colorBy: "series",
                  large: true,
                  data: dataArr,
                };
              })
            )
              .then((result) => {
                console.log(result);
                resultArr.push(result);
                console.log(resultArr);
                resultArrData = resultArr;
                console.log(resultArrData);
                const prev1 = performance.now();
                const realTimeFlag = false;
                prevdata(realTimeFlag, resultArr[0], nameArr);
                const prev2 = performance.now();
                console.log("그래프시간 시간 : ", prev2 - prev1);
              })
              .finally(() => {
                setIsLoading(false);
              });
            const t2 = performance.now();
            console.log("Promise 문 ", t2 - t1);
          }
        });
    }
  };

  const onRealtimeGraphHandler = () => {
    console.log("onRealtimeGraphHandler함수 실행");
    if (!realGraphBtn) {
      console.log(!realGraphBtn);
      console.log("onRealtimeGraphHandler if문 실행됨!");
      if (!selectedcompoData || !selectedcompoData.name) {
        alert("값을 선택해주세요");
      } else {
        const time1 = performance.now();

        //------------실시간 그래프 api 보내기 위해 startdate 설정.(현재시간 - 1)-------
        let realStart = new Date();
        realStart = new Date(realStart.getTime() - realStart.getTimezoneOffset() * 60000);
        realStart.setHours(realStart.getHours() - 10);
        // 날짜를 ISO 8601 형식의 문자열로 변환합니다.
        let realtimeAnHourAgo = realStart.toISOString();
        // 초 이하의 정보를 제거합니다.
        realtimeAnHourAgo = realtimeAnHourAgo.slice(0, 19);
        console.log(realtimeAnHourAgo);
        //----------------------------------------------------------------------------
        //-------------실시간 그래프 api 보내기 위해 endDate 설정-----------------------
        let realEnd = new Date();
        realEnd = new Date(realEnd.getTime() - realEnd.getTimezoneOffset() * 60000);
        let realtime = realEnd.toISOString();
        realtime = realtime.slice(0, 19);
        console.log(realtime);
        //-----------------------------------------------------------------------------

        setIsLoading(true);
        console.log(" 셀렉티드 머신 네임: ", selectedcompoData.name);
        console.log(" 셀렉티드 머신 네임: ", realtime);
        console.log(" 셀렉티드 머신 네임: ", selectedMachineName);
        console.log(" 셀렉티드 머신 네임: ", selectedModuleName);
        console.log(" 셀렉티드 머신 네임: ", realtimeAnHourAgo);
        axios
          .post("http://3.36.125.122:8082/data/parameter", {
            componentName: selectedcompoData.name,
            endDate: realtime,
            machineName: selectedMachineName,
            moduleName: selectedModuleName,
            startDate: realtimeAnHourAgo,
          })
          .then((res1) => {
            if (res1.data.length === 0) {
              alert("해당 기간에는 데이터가 없습니다");
              setIsLoading(false);
            } else {
              const t0 = performance.now();
              const minus = time1 - t0;
              console.log("name api문", minus);
              console.log(res1.data);
              let nameArr = [];
              for (let i = 0; i < res1.data.length; i++) {
                nameArr.push(res1.data[i].name);
              }

              let machineName = selectedMachineName;
              let moduleName = selectedModuleName;
              let componentName = selectedcompoData.name;
              nameArr.push(componentName);

              let resultArr = [];

              const t1 = performance.now();

              Promise.all(
                nameArr.map(async (name) => {
                  let parent = componentName;
                  if (name == componentName) {
                    parent = moduleName;
                  }
                  const res2 = await axios.post("http://3.36.125.122:8082/data/pgraph", {
                    endDate: realtime,
                    startDate: realtimeAnHourAgo,
                    machineName: machineName,
                    componentName: parent,
                    parameterName: name,
                  });
                  let dataArr = [];
                  const perfor1 = performance.now();
                  for (let j = 0; j < res2.data.length; j++) {
                    dataArr.push([new Date(res2.data[j].date).toISOString(), res2.data[j].value]);
                  }
                  const perfor2 = performance.now();
                  console.log("for문 시간 : ", perfor2 - perfor1);
                  return {
                    name: name,
                    type: "line",
                    symbol: "none",
                    colorBy: "series",
                    data: dataArr.reverse(),
                  };
                })
              )
                .then((result) => {
                  console.log(result);
                  resultArr.push(result);
                  console.log(resultArr);
                  resultArrData = resultArr;
                  console.log(resultArrData);
                  const prev1 = performance.now();
                  const realTimeFlag = true;
                  prevdata(realTimeFlag, resultArr[0], nameArr);
                  const prev2 = performance.now();
                  console.log("그래프시간 시간 : ", prev2 - prev1);
                })
                .finally(() => {
                  setIsLoading(false);
                });
              const t2 = performance.now();
              console.log("Promise 문 ", t2 - t1);
            }
          });
      }
    }
    console.log("얘밖에 없는데");
    setRealGraphBtn(true);
  };

  useEffect(() => {
    console.log("realGraphBtn 바뀜!", realGraphBtn);
    const eventSource = new EventSource(
      "http://3.36.125.122:8082/sse/connect",
      { headers: { accept: "text/event-stream" } },
      { withCredentials: true }
    );
    eventSource.addEventListener("connect", (event) => {
      const { data: received } = event;
      console.log("Graph connect", received);
      console.log(event.data);
    });

    eventSource.addEventListener("machine", (event) => {
      const newMachineData = event.data;
      console.log(event.data);
      console.log(newMachineData);
      console.log("이벤트 머신이름: ", newMachineData);
      console.log("선택 머신이름: ", selectedMachineName);
      console.log("버튼 머신이름: ", realGraphBtn);

      if (newMachineData == selectedMachineName && realGraphBtn === true) {
        console.log(
          "실시간 useEffect문 안 if문((newMachineData == selectedMachineName) && (realGraphBtn === true)) 실행 "
        );
        realGraphMove();
      }
    });
    return () => {
      eventSource.close();
    };
  }, [realGraphBtn]);

  const realGraphMove = () => {
    console.log("realgraphmove 실행");
    axios
      .post("http://3.36.125.122:8082/data/graph/now", {
        componentName: selectedcompoData?.name,
        machineName: selectedMachineName,
        moduleName: selectedModuleName,
      })
      .then((res) => {
        console.log(res);
        newRealGraph(res.data);
      });
  };

  return (
    <div>
      <Box>
        <PeriodBox>
          <Font>{selectedcompoData?.name}</Font>
          <Line></Line>
          <AlignPeriod>
            <PFont>PERIOD</PFont>{" "}
            <SIconContainer>
              <Icon
                icon="material-symbols:calendar-today-outline-rounded"
                width="20"
                color="blue"
                onClick={() => setStartDateOpen(!startDateOpen)}
              />
            </SIconContainer>
            <SDatePicker
              preventOpenFocus={true}
              showPopperArrow={false}
              selected={startDate}
              open={startDateOpen}
              onChange={(date) => setStartDate(date)}
              locale={ko}
              selectsStart
              showTimeSelect
              timeFormat="HH:mm"
              timeIntervals={1}
              dateFormat="yyyy-MM-dd HH:mm"
              popperProps={{
                modifiers: [
                  {
                    name: "flip",
                    enabled: false,
                  },
                  {
                    name: "preventOverflow",
                    options: {
                      enabled: true,
                      escapeWithReference: false,
                      boundary: "viewport",
                    },
                  },
                ],
              }}
            />
            {"   "}~{"  "}
            <SIconContainer>
              <Icon
                icon="material-symbols:calendar-today-outline-rounded"
                width="20"
                color="blue"
                onClick={() => setEndDateOpen(!endDateOpen)}
              />
            </SIconContainer>
            <SDatePicker
              showPopperArrow={false}
              selected={endDate}
              open={endDateOpen}
              onChange={(date) => setendDate(date)}
              onSelect={() => setEndDateOpen(false)}
              locale={ko}
              minDate={startDate}
              selectsEnd
              showTimeSelect
              timeFormat="HH:mm"
              timeIntervals={1}
              dateFormat="yyyy-MM-dd HH:mm"
              popperProps={{
                modifiers: [
                  {
                    name: "flip",
                    enabled: false,
                  },
                  {
                    name: "preventOverflow",
                    options: {
                      enabled: true,
                      escapeWithReference: false,
                      boundary: "viewport",
                    },
                  },
                ],
              }}
            />
            <Button onClick={onGraphHandler}>set</Button>
            <Button onClick={onRealtimeGraphHandler}>realtime</Button>
          </AlignPeriod>
        </PeriodBox>

        <div
          style={{
            position: "relative",
          }}
        >
          <EChartsWrapper
            id="main"
            ref={chartRef}
            option={option}
            opts={{ width: "auto", height: "auto" }}
          />
          {isLoading && (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
                width: "100%",
                position: "absolute",
                top: 0,
                left: 0,
                background: "rgba(255, 255, 255, 0.5)",
              }}
            >
              <Oval color="#00BFFF" height={100} width={100} timeout={5000} />
            </div>
          )}
        </div>
      </Box>
    </div>
  );
};

export default Graph;
const EChartsWrapper = styled(ECharts)`
  width: 100%; /* 가로 크기 조정 */
  height: 200%; /* 세로 크기 조정 */
  margin-top: 50px; /* 위쪽 여백 조정 */
`;

const SIconContainer = styled.div`
  width: 20px;
  color: blue;
  cursor: pointer;
`;

const Box = styled.div`
  position: absolute;
  top: 260px;
  left: 630px;
  background: #ffffff;
  border: 1px solid rgba(0, 0, 0, 0.2);
  width: 870px;
  height: 470px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 20px;
  overflow: hidden;
`;
const Font = styled.div`
  margin: 5px 0px 0px 20px;
  font-family: "Inter";
  font-style: normal;
  font-weight: bold;
  font-size: 17px;
  color: #707070;
`;
const Line = styled.div`
  position: absolute;
  width: 810px;
  height: 0px;
  left: 25px;
  top: 30px;
  border: 1px solid #eff1f5;
`;

const PFont = styled.div`
  margin-left: 30px;
  margin-right: 5px;

  font-family: "Inter";
  font-style: normal;
  font-size: 13px;
  color: #707070;
`;
const PeriodBox = styled.div`
  position: relative;
  align-items: center;
  z-index: 4;
  font-size: 12px;
`;
const AlignPeriod = styled.div`
  margin-top: 15px;
  display: flex;
  width: 450px;
`;
const SDatePicker = styled(DatePicker)`
  border: none;

  .react-datepicker__day--selected,
  .react-datepicker__day--in-selecting-range,
  .react-datepicker__day--in-range {
    background-color: #a8dadc;
  }
`;
const Button = styled.button`
  background-color: blue;
  color: white;
  padding: 3px 10px;
  margin : 0px 5px 0px 5px;
  border: none;
  border-radius: 5px;
  width : 30px
  cursor: pointer;
`;
