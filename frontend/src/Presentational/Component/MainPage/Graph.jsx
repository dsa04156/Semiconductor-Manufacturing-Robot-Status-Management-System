import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ko } from "date-fns/esm/locale";
import { Icon } from "@iconify/react";


//----------------- 박해준 그래프 -----------------------
import ECharts, { EchartsReactprops } from 'echarts-for-react';
import axios from 'axios';
import { bottom } from "@popperjs/core";
//----------------- 박해준 그래프 -----------------------


const Graph = (selectedcompoData, selectedMachineName, selectedModuleName) => {
  const [startDate, setStartDate] = useState(new Date(Date.now() - 7 * 24 * 60 * 60 * 1000));
  const [endDate, setendDate] = useState(new Date());
  const [startDateOpen, setStartDateOpen] = useState(false);
  const [endDateOpen, setEndDateOpen] = useState(false);

//------------------------------------박해준 그래프-----------------------------------------------------




//   const samplingOpt = {
//     // 대용량 데이터 처리를 위해 샘플링을 사용
//     large: true,
//     // 데이터 샘플링 시 사용할 최소 단위 (기본값: 1)
//     // 값이 클수록 샘플링하는 데이터 개수가 줄어듬
//     // 값이 작을수록 샘플링하는 데이터 개수가 늘어남
//     sample: 1,
//   };

  // 이 옵션으로 chart를 만듦
  const [options, setOptions] = useState({
    // trigger를 걸어서 값을 볼 수 있게 해줌 axis는 기본이라 바로 값이 뜸
    tooltip: {
      trigger: 'axis',
    },
    // 범례, selectmode는 클릭시 사라졌다 나왔다 하는거
    legend: {
      data: ['Email'],
      selectedMode: true,
      padding: [0, 0, 30, 0]
    },
    // y축 확대 안함, 고정
    toolbox: {
      feature: {
        dataZoom: {
          yAxisIndex: 'none',
        },
        restore: {},
        saveAsImage: {}
      }
    },
    // x축 시간 기준으로 만듦
    xAxis: {
      type: 'time',
      min: new Date('2021-12-31T23:59:59.999Z').getTime(),
      max: new Date('2022-12-31T23:59:59.999Z').getTime(),
      show: true,
    },
    // y축 boundarygap은 아마 위아래 조금씩 더 그래프 만드는 거인듯?
    yAxis: {
      type: 'value',
      boundaryGap: ["1%", "1%"],
      show: true
    },
    // zoom 하는 거 start: 0 으로 둬서 시작에는 전체 데이터 보여줌
    dataZoom: [
      {
        type: 'slider',
        show: true,
        start: 0,
        end: 100,
        handleSize: 8
      },
      // 안에 확대하는 거인듯
      {
        type: 'inside',
        start: 0,
        end: 100
      },
    ],
    // 여기에 데이터 넣어서 차트 만드는 거임/ sampling: avergae등등 있으니 찾아보시면 될듯
//     series: [
//       {
//         name: 'Email',
//         type: 'line',
//         symbol: 'none',
//         sampling: 'lttb',
//         colorBy: "series",
//         large: samplingOpt,
//         data: [["2022-06-31T23:59:59.999Z",0.5],
//         ["2022-09-31T23:59:59.999Z",0.5],
//         ["2022-10-31T23:59:59.999Z",0.5]  
//       ],  
//     }
//   ]  
});	  



  const prevdata = (resultArr, nameArr) => {
    const t0 = performance.now();
    setOptions(prev => ({
      ...prev,
      xAxis: {
        type: 'time',
        min: startDate.getTime(),
        max: endDate.getTime(),
        show: true,
      },
      legend:{
        data: nameArr,
        selectedMode:true
      },
      series: resultArr
    }
  ))
  const t1 = performance.now();
  const elapsed = t1 - t0;
  console.log(elapsed);
}


const onGraphHandler = () => {
  const time1 = performance.now();
    axios.post('http://3.36.125.122:8082/data/graph',
    {
      "componentName": "root-006-000",
      "endDate": endDate,
      "machineName": "machine_A",
      "moduleName": "root-006",
      "startDate": startDate
    }
    ).then((res) => {
      console.log(res)

      let nameArr = [];
      let resultArr = [];

      const t0 = performance.now();
      const minus = time1 - t0;
      console.log("api문",minus);

      for (let j = 0; j < res.data.length; j++){
          let dataArr = [];
          nameArr.push(res.data[j].name)
        for (let i = 0; i<res.data[j].data.length; i++){
          dataArr.push([new Date(res.data[j].data[i].date).toISOString(),res.data[j].data[i].value])
        }
        resultArr.push({        
          name: res.data[j].name,
          type: 'line',
          symbol: 'none',
          sampling: 'average',
          colorBy: "series",
          large: true,
          data: dataArr
        });
      }
      const t1 = performance.now();
      const elapsed = t1 - t0;
      console.log("for문",elapsed);
      console.log("result: ", resultArr)
      console.log("name: ", nameArr)
      prevdata(resultArr,nameArr);
    })
}


//------------------------------------박해준 그래프-----------------------------------------------------



  return (
    <div>
      <Box>
        <PeriodBox>
          <Font>pump</Font>
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
              locale={ko}
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
          </AlignPeriod>
        </PeriodBox>
        {/* ----------------------------------박해준 그래프--------------------------------- */}
        <div>
          <button onClick={onGraphHandler}></button>
          <ECharts
            option={options}
            //renderer: 'svg', 
            opts={{ width: 'auto', height: 'auto' }}
          />
        </div>
        {/* ----------------------------------박해준 그래프--------------------------------- */}
      </Box>
    </div>
  );
};

export default Graph;

const SIconContainer = styled.div`
  width: 20px;
  color: blue;
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
  margin-top: 40px;
  display: flex;
  width: 450px;
`;
const SDatePicker = styled(DatePicker)`
  border: none;
`;
