import React from "react";
import ReactApexChart from "react-apexcharts";
import styled from "styled-components";

const HealthStatus = ({ componentData }) => {
  console.log(componentData)
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
  const colors = ["#FF5172", "#FFEE32", "#30ADF3", "#A5FF32"];

  let totalcount = componentData.reduce((acc, cur) => {
    return acc + 1;
  }, 0);


  const unaccep_data = [unaccep_compodata, totalcount - unaccep_compodata];
  const unsat_data = [datas[1], totalcount - datas[1]];
  const sat_data = [datas[2], totalcount - datas[2]];
  const good_data = [datas[3], totalcount - datas[3]];



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
        <div style={{ margin: "15px 0px 0 40px", fontSize: "20px" }}>Health Status</div>
        <HealthStatusTitle>
          <TLabel>Total</TLabel>
          <TValue>{totalcount}</TValue>
          <ReactApexChart
            options={TotdonutData.options}
            series={TotdonutData.series}
            type="donut"
            width={180}
          />

          <ULabel>unacceptable</ULabel>
          <UValue>{unaccep_compodata}</UValue>

          <ReactApexChart
            options={unacceptdonutData.options}
            series={unacceptdonutData.series}
            type="donut"
            width={180}
          />

          <NLabel>unsatisfactory</NLabel>
          <NValue>{unsat_compodata}</NValue>

          <ReactApexChart
            options={unsatdonutData.options}
            series={unsatdonutData.series}
            type="donut"
            width={180}
          />

          <SLabel>satisfactory</SLabel>
          <SValue>{sat_compodata}</SValue>
          <ReactApexChart
            options={satdonutData.options}
            series={satdonutData.series}
            type="donut"
            width={180}
          />

          <GLabel>Good</GLabel>
          <GValue>{good_compodata}</GValue>
          <ReactApexChart
            options={gooddonutData.options}
            series={gooddonutData.series}
            type="donut"
            width={180}
          />
        </HealthStatusTitle>
      </Big>
    </div>
  );
};

export default HealthStatus;

const Big = styled.div`
  position: absolute;
  top: 30px;
  left: 120px;
  background: #ffffff;
  border: 1px solid rgba(0, 0, 0, 0.2);
  width: 900px;
  height: 200px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 20px;
  align-items: center;
`;
const HealthStatusTitle = styled.div`
  display: flex;
`;

const TLabel = styled.div`
  position: absolute;
  top:170px;
  left :70px;
  font-size: 16px;
  color: #ADB1B8;
`;
const ULabel = styled.div`
  position: absolute;
  top:170px;
  left :220px;
  font-size: 16px;
  color: #ADB1B8;
`;
const NLabel = styled.div`
  position: absolute;
  top:170px;
  left :400px;
  font-size: 16px;
  color: #ADB1B8;
`;
const SLabel = styled.div`
  position: absolute;
  top:170px;
  left :590px;
  font-size: 16px;
  color: #ADB1B8;
`;
const GLabel = styled.div`
  position: absolute;
  top:170px;
  left :790px;
  font-size: 16px;
  color: #ADB1B8;
`;

const TValue = styled.div`
  position: absolute;
  top:100px;
  left :80px;
  font-size: 20px;
  color: #ADB1B8;
`;
const UValue = styled.div`
  position: absolute;
  top:100px;
  left :265px;
  font-size: 20px;
  color: #ADB1B8;
`;
const NValue = styled.div`
  position: absolute;
  top:100px;
  left :447px;
  font-size: 20px;
  color: #ADB1B8;
`;
const SValue = styled.div`
  position: absolute;
  top:100px;
  left :627px;
  font-size: 20px;
  color: #ADB1B8;
`;
const GValue = styled.div`
  position: absolute;
  top:100px;
  left :807px;
  font-size: 20px;
  color: #ADB1B8;
`;