import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { DatePicker, TimePicker } from "antd";
import "react-datepicker/dist/react-datepicker.css";
import { Oval } from "react-loader-spinner";
import locale from "antd/es/date-picker/locale/ko_KR";
import dayjs from "dayjs";



import ECharts, { EchartsReactprops } from "echarts-for-react";
import axios from "axios";


const Graph = ({
  selectedcompoData,
  selectedMachineName,
  selectedModuleName,
  setRealGraphBtnState,
}) => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setendDate] = useState(new Date());
  const [startTime, setstartTime] = useState(
    new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
  );
  const [endTime, setendTime] = useState(new Date(Date.now()));

  const [realGraphBtn, setRealGraphBtn] = useState(false); // 실시간 그래프 버튼상태
  const [saveResultArr, setSaveResultArr] = useState();
  const [nameList, setNameList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  
  const chartRef = useRef(null);
 


    // 이 옵션으로 chart를 만듦
    const getInitialOptions = () => {
      return {
        tooltip: {
          trigger: "axis",
        },
        toolbox: {
          feature: {
            dataZoom: {
              show: true,
              yAxisIndex: "none",
              bottom: "0%",
            },
            restore: {},
          },
          right: 0,
          top: 30,
        },
        legend:{
          show:true,
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
      };
    };
    const [options, setOptions] = useState(getInitialOptions());

// ----------------실시간 데이터 추가 부분----------------------------
  // const updateGraphOptions = (currentOptions, data) => {

  //   const updatedSeriesData = [...currentOptions.series[0].data, ...data];
  //   const updatedOptions = {
  //     ...currentOptions,
  //     series: [{ ...currentOptions.series[0], data: updatedSeriesData }],
  //   };
  
  //   return updatedOptions;
  // };
  // const resetGraph = () => {
  //   const chartInstance = chartRef.current.getEchartsInstance();
  //   if (chartInstance) {
  //     chartInstance.clear();
  //     chartInstance.setOption(getInitialOptions());
  //   }
  // };

  // const handleSSEUpdate = (data) => {
  //   const chartInstance = chartRef.current?.getEchartsInstance();
  //   if (chartInstance) {
  //     const updatedOptions = updateGraphOptions(options, data);
  //     chartInstance.setOption(updatedOptions);
  //   }
  // };

  // -----------------------------------------------------------------

  const onStartDateChange = (value, dateString) => {
    const newStartDate = new Date(dateString);
    const updatedStartTime = new Date(
      newStartDate.getFullYear(),
      newStartDate.getMonth(),
      newStartDate.getDate(),
      startTime.getHours(),
      startTime.getMinutes(),
      startTime.getSeconds()
    );
    setStartDate(newStartDate);
    setstartTime(updatedStartTime);
  };

  const onEndDateChange = (value, dateString) => {
    const newEndDate = new Date(dateString);
    const updatedEndTime = new Date(
      newEndDate.getFullYear(),
      newEndDate.getMonth(),
      newEndDate.getDate(),
      endTime.getHours(),
      endTime.getMinutes(),
      endTime.getSeconds()
    );
    setendDate(newEndDate);
    setendTime(updatedEndTime);
  };

  const onStartTimeChange = (time, timeString) => {
    const [hours, minutes, seconds] = timeString.split(":");

    const updatedTime = new Date(
      startDate.getFullYear(),
      startDate.getMonth(),
      startDate.getDate(),
      hours,
      minutes,
      seconds
    );
    setstartTime(updatedTime);
  };

  const onEndTimeChange = (time, timeString) => {
    const [hours, minutes, seconds] = timeString.split(":");

    const updatedTime = new Date(
      endDate.getFullYear(),
      endDate.getMonth(),
      endDate.getDate(),
      hours,
      minutes,
      seconds
    );
    setendTime(updatedTime);
  };

  


  //------------------------------------박해준 그래프-----------------------------------------------------

  const samplingOpt = {
    // 대용량 데이터 처리를 위해 샘플링을 사용
    large: true,
    // 데이터 샘플링 시 사용할 최소 단위 (기본값: 1)
    // 값이 클수록 샘플링하는 데이터 개수가 줄어듬
    // 값이 작을수록 샘플링하는 데이터 개수가 늘어남
    sample: 1,
  };

  useEffect(() => {
    if (!selectedcompoData || !selectedMachineName || !selectedModuleName) {
      setOptions(getInitialOptions());
      // resetGraph();
    } else {
      const chartInstance = chartRef.current.getEchartsInstance();
      chartInstance.clear();
      chartInstance.setOption(getInitialOptions());
      setOptions(getInitialOptions()); 
      // setOptions(getInitialOptions());
    }
  }, [selectedcompoData, selectedMachineName, selectedModuleName]);


  
  const prevdata = (resultArr, nameArr) => {
    const t0 = performance.now();
    setOptions((prev) => ({
      ...prev,
      xAxis: {
        type: "time",
        min: startTime.getTime(),
        max: endTime.getTime(),
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
  };

  const onGraphHandler = () => {
    if (!selectedcompoData || !selectedcompoData.name) {
      alert("값을 선택해주세요");
    } else {
      const time1 = performance.now();
      setIsLoading(true);

      axios
        .post("http://3.36.125.122:8082/data/parameter", {
          componentName: selectedcompoData.name,
          endDate: endTime,
          machineName: selectedMachineName,
          moduleName: selectedModuleName,
          startDate: startTime,
        })
        .then((res1) => {
          
          console.log("보낸 시작 시간 : ");
          console.log(startTime);
          console.log("보낸 종료 시간 :");
          console.log(endTime);

          //------------------------ 두번째 방법
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
              const res2 = await axios.post(
                "http://3.36.125.122:8082/data/pgraph",
                {
                  endDate: endTime,
                  startDate: startTime,
                  machineName: machineName,
                  componentName: parent,
                  parameterName: name,
                }
              );
              setIsLoading(false);
              console.log(res2);
              let dataArr = [];
              const perfor1 = performance.now();
              for (let j = 0; j < res2.data.length; j++) {
                dataArr.push([
                  new Date(res2.data[j].date).toISOString(),
                  res2.data[j].value,
                ]);
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
          ).then((result) => {
            console.log(result);
            resultArr.push(result);
            const prev1 = performance.now();
            prevdata(resultArr[0], nameArr);
            const prev2 = performance.now();
            console.log("그래프시간 시간 : ", prev2 - prev1);
          });
          if (chartRef.current) {
            const chartInstance = chartRef.current.getEchartsInstance();
            if (chartInstance) {
              chartInstance.clear();
            }
          }

          setOptions(getInitialOptions());
          const t2 = performance.now();
          console.log("Promise 문 ", t2 - t1);
        });
    }
  };

  //------------------------------------박해준 그래프-----------------------------------------------------

  return (
    <div>
      <Box>
        <PeriodBox>
          <Font>{selectedcompoData?.name}</Font>
          <Line></Line>
          <AlignPeriod>
            <PFont>PERIOD</PFont>
            <DatePicker
              defaultValue={dayjs(startTime)}
              locale={locale}
              onChange={onStartDateChange}
            />
            <TimePicker
              defaultValue={dayjs(startTime)}
              locale={locale}
              onChange={onStartTimeChange}
              format="HH:mm:ss"
            />
            ~
            <DatePicker
              defaultValue={dayjs(endTime)}
              locale={locale}
              onChange={onEndDateChange}
            />
            <TimePicker
              defaultValue={dayjs(endTime)}
              locale={locale}
              onChange={onEndTimeChange}
              format="HH:mm:ss"
            />
            <Button onClick={onGraphHandler}>set</Button>
          </AlignPeriod>
        </PeriodBox>

        {/* ----------------------------------박해준 그래프--------------------------------- */}
        <div>
          {isLoading ? (
            <LoadingIndicator>
              <Oval  color="#00BFFF" height={100} width={100} timeout={5000} />
            </LoadingIndicator>
          ) : (
            <ECharts
              option={options}
              ref={chartRef}
              //renderer: 'svg',
              opts={{ width: "auto", height: "auto" }}
            />
          )}
        </div>

        {/* ----------------------------------박해준 그래프--------------------------------- */}
      </Box>
    </div>
  );
};

export default Graph;

const LoadingIndicator = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 200px; /* Adjust the height as needed */
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
  margin: 10px 0px 10px 20px;
  font-family: "Inter";
  font-style: normal;
  font-weight: 400;
  font-size: 15px;
  color: #707070;
`;
const Line = styled.div`
  position: absolute;
  width: 810px;
  height: 0px;
  left: 25px;
  top: 45px;
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
  margin-top: 30px;
  display: flex;
  align-items: center;
`;
const Button = styled.button`
  background-color: blue;
  color: white;
  padding: 3px 10px;
  border: none;
  border-radius: 5px;
  width : 30px
  cursor: pointer;
  margin-left : 5px;
`;
