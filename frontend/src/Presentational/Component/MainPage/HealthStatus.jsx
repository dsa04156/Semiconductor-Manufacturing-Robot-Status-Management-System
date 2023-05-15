import React from "react";
import ReactApexChart from "react-apexcharts";
import styled from "styled-components";
import { Icon } from "@iconify/react";

const HealthStatus = ({ componentData }) => {

  const compodata = componentData.map((data) => {
    return {
      name: data.name,
      value: data.value,
      eval: data.eval,
    };
  });

  const unaccep_compodata = compodata.reduce((unaccep_count, data) => {
    if (data.eval === "unacceptable") {
      unaccep_count++;
    }
    return unaccep_count;
  }, 0);

  const unaccep_lables = ["unacceptable", "others"];
  const unaccep_colors = ["#FF5172", "#F2D8DF"];

  const unsat_compodata = compodata.reduce((unsat_count, data) => {
    if (data.eval === "unsatisfactory") {
      unsat_count++;
    }
    return unsat_count;
  }, 0);
  const unsat_lables = ["unsatisfactory", "others"];
  const unsat_colors = ["#FFEE32", "#F4E4C4"];

  const sat_compodata = compodata.reduce((sat_count, data) => {
    if (data.eval === "satisfactory") {
      sat_count++;
    }
    return sat_count;
  }, 0);
  const sat_lables = ["satisfactory", "others"];
  const sat_colors = ["#30ADF3", "#C4E2F4"];

  const good_compodata = compodata.reduce((good_count, data) => {
    if (data.eval === "Good") {
      good_count++;
    }
    return good_count;
  }, 0);
  const good_lables = ["Good", "others"];
  const good_colors = ["#A5FF32", "#D9ECC8"];

  const datas = [unaccep_compodata, unsat_compodata, sat_compodata, good_compodata];

  const labels = ["unacceptable", "unsatisfactory", "satisfactory", "Good"];
  const colors = ["#ff3e53", "#ffb733", "#2bbfba", "#14b856"];

  let totalcount = componentData.reduce((acc, cur) => {
    return acc + 1;
  }, 0);

  const unaccep_data = [unaccep_compodata, totalcount - unaccep_compodata];
  const unsat_data = [datas[1], totalcount - datas[1]];
  const sat_data = [datas[2], totalcount - datas[2]];
  const good_data = [datas[3], totalcount - datas[3]];

  let goodPercent = parseFloat(((unsat_compodata * 100) / totalcount).toFixed(2));
  let good= "";
  
  if ( goodPercent % 1 === 0) {
   good =  goodPercent.toFixed(0);
  } else if ( goodPercent.toFixed(1).endsWith("0")) {
    good =  goodPercent.toFixed(1);
  } else {
    good=  goodPercent.toFixed(2);
  }

  let satPercent = parseFloat(((unsat_compodata * 100) / totalcount).toFixed(2));
  let sat= "";
  
  if ( satPercent % 1 === 0) {
   sat =  satPercent.toFixed(0);
  } else if ( satPercent.toFixed(1).endsWith("0")) {
    sat =  satPercent.toFixed(1);
  } else {
    sat=  satPercent.toFixed(2);
  }

  let unaccepPercent = parseFloat(((unsat_compodata * 100) / totalcount).toFixed(2));
  let unaccep = "";
  
  if (unaccepPercent % 1 === 0) {
    unaccep = unaccepPercent.toFixed(0);
  } else if (unaccepPercent.toFixed(1).endsWith("0")) {
    unaccep = unaccepPercent.toFixed(1);
  } else {
    unaccep= unaccepPercent.toFixed(2);
  }


  let unsatPercent = parseFloat(((unsat_compodata * 100) / totalcount).toFixed(2));
  let unsat = "";
  
  if (unsatPercent % 1 === 0) {
    unsat = unsatPercent.toFixed(0);
  } else if (unsatPercent.toFixed(1).endsWith("0")) {
    unsat = unsatPercent.toFixed(1);
  } else {
    unsat= unsatPercent.toFixed(2);
  }


  const TotdonutData = {
    series: datas,
    options: {
      chart: {
        type: "donut",
      },
      fill: {
        colors: colors,
      },
      legend: {
        show: false,
      },
      responsive: [
        {
          breakpoint: 480,
        },
      ],
      labels: labels,
    },
  };

  const unacceptdonutData = {
    series: unaccep_data,
    options: {
      chart: {
        type: "donut",
      },
      dataLabels: {
        enabled:false
      },
      fill: {
        colors: unaccep_colors,
        type: "gradient",
      },
      legend: {
        show: false,
      },
      responsive: [
        {
          breakpoint: 480,
        },
      ],

      labels: unaccep_lables,
    },
  };


  const unsatdonutData = {
    series: unsat_data,
    options: {
      chart: {
        type: "donut",
      },
      dataLabels: {
        enabled:false
      },
      fill: {
        colors: unsat_colors,
        type: "gradient",
      },
      legend: {
        show: false,
      },
      responsive: [
        {
          breakpoint: 480,
        },
      ],
      labels: unsat_lables,
    },
  };

  const satdonutData = {
    series: sat_data,
    options: {
      chart: {
        type: "donut",
      },
      dataLabels: {
        enabled:false
      },
      fill: {
        colors: sat_colors,
        type: "gradient",
      },
      legend: {
        show: false,
      },
      responsive: [
        {
          breakpoint: 480,
        },
      ],
      labels: sat_lables,
    },
  };

  const gooddonutData = {
    series: good_data,
    options: {
      chart: {
        type: "donut",
      },
      dataLabels: {
        enabled:false
      },
      fill: {
        colors: good_colors,
        type: "gradient",
      },
      legend: {
        show: false,
      },
      responsive: [
        {
          breakpoint: 480,
        },
      ],
      labels: good_lables,
    },
  };

  return (
    <div>
      <Big>
        <Line></Line>
        <Head>Health Status</Head>
        <HealthStatusTitle>
          <TLabel>Total</TLabel>
          {totalcount <10 ? <TValue size={98}>{totalcount}</TValue>: <TValue size={85}>{totalcount}</TValue>}
          <ReactApexChart
            options={TotdonutData.options}
            series={TotdonutData.series}
            type="donut"
            width={220}
          />

          <Label size={275}>unacceptable</Label>

          <Box size={260}>
            <InBox color={"#ffcece"}>
              <Icon icon="icon-park-solid:bad-two" color="#ff3e53" hFlip={true} />
            </InBox>
            {unaccep_compodata < 10 ? <Value size={61}>{unaccep_compodata }</Value> : <Value size={55}>{unaccep_compodata }</Value>}


            <ReactApexChart
              options={unacceptdonutData.options}
              series={unacceptdonutData.series}
              type="donut"
              width={130}
            />
            <Percent>{unaccep}%</Percent>
          </Box>

          <Label size={435}>unsatisfactory</Label>

          <Box size={420}>
            <InBox color={"#FFE7BC"}>
              <Icon
                icon="streamline:mail-smiley-sad-face-chat-message-smiley-emoji-sad-face-unsatisfied"
                color="#ffb733"
              />
            </InBox>
            {unsat_compodata < 10 ? <Value size={61}>{unsat_compodata}</Value> : <Value size={55}>{unsat_compodata}</Value>}


            <ReactApexChart
              options={unsatdonutData.options}
              series={unsatdonutData.series}
              type="donut"
              width={130}
            />
            <Percent>{unsat}%</Percent>
          </Box>

          <Label size={610}>satisfactory</Label>

          <Box size={580}>
            <InBox color={"#CBFFFD"}>
              <Icon icon="teenyicons:mood-smile-solid" color="#2bbfba" />
            </InBox>
            {sat_compodata < 10 ? <Value size={61}>{sat_compodata}</Value> : <Value size={55}>{sat_compodata}</Value>}
            <ReactApexChart
              options={satdonutData.options}
              series={satdonutData.series}
              type="donut"
              width={130}
            />
            <Percent>{sat}%</Percent>
          </Box>

          <Label size={790}>Good</Label>

          <Box size={740}>
            <InBox color={"#C6FFDD"}>
              <Icon icon="icon-park-solid:good-two" color="#14b856" />
            </InBox>
            {good_compodata < 10 ? <Value size={61}>{good_compodata}</Value> : <Value size={55}>{good_compodata}</Value>}
            <ReactApexChart
              options={gooddonutData.options}
              series={gooddonutData.series}
              type="donut"
              width={130}
            />
            <Percent>{good}%</Percent>
          </Box>
        </HealthStatusTitle>
      </Big>
    </div>
  );
};

export default HealthStatus;

const Head = styled.div`
  margin-left: 30px;
  margin-top: 15px;
  margin-bottom: 10px;
  font-family: "Inter";
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  color: #707070;
  line-height: 22px;
`;
const Big = styled.div`
  position: absolute;
  top: 10px;
  left: 120px;
  background: #ffffff;
  border: 1px solid rgba(0, 0, 0, 0.2);
  width: 900px;
  height: 230px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 20px;
  align-items: center;
`;
const HealthStatusTitle = styled.div`
  display: flex;
`;

const Box = styled.div`
  position: absolute;
  width: 130px;
  height: 148px;
  left: ${(props) => props.size}px;
  top: 55px;
  box-sizing: border-box;
  background: #f4f5f9;
  border: 1px solid #dcdcdc;
  box-shadow: 3px 3px 1.5px rgba(179, 188, 200, 0.301961);
  border-radius: 8px;
`;

const InBox = styled.div`
  box-sizing: border-box;
  width: 30px;
  height: 30px;
  background: ${(props) => props.color};
  border-radius: 50%;
  margin-left: 50px;
  margin-top: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Line = styled.div`
  position: absolute;
  width: 850px;
  height: 0px;
  left: 25px;
  top: 45px;
  border: 1px solid #eff1f5;;
`;

const TLabel = styled.div`
  position: absolute;
  top: 90px;
  left: 95px;
  font-size: 16px;
  color: #adb1b8;
  z-index:3;
`;
const Label = styled.div`
  position: absolute;
  top: 200px;
  left: ${(props) => props.size}px;
  font-size: 16px;
  color: #adb1b8;
`;

const TValue = styled.div`
  position: absolute;
  top: 100px;
  left: ${(props) => props.size}px;
  font-size: 45px;
  color: black;
`;
const Value = styled.div`
  position: absolute;
  top: 66px;
  left: ${(props) => props.size}px;
  font-size: 20px;
  color: black;
  z-index:2;
`;
const Percent = styled.div`
  position : relative;
  display : flex;
  justify-content : center;
  align-items : center;
  height : 0px;
  margin-left : 12px;
`