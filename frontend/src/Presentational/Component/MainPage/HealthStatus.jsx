import React from "react";
import ReactApexChart from "react-apexcharts";
import { useMediaQuery } from "react-responsive";
import styled from "styled-components";

const Desktop = ({ children }) => {
  const isDesktop = useMediaQuery({ minWidth: 992 });
  return isDesktop ? children : null;
};

const Tablet = ({ children }) => {
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 991 });
  return isTablet ? children : null;
};

const Mobile = ({ children }) => {
  const isMobile = useMediaQuery({ maxWidth: 767 });
  return isMobile ? children : null;
};

const HealthStatus = () => {
  const datas = [50, 40, 30, 10];
  const labels = ["Good", "satisfactory", "unsatisfactory", "unacceptable"];
  const colors = ["#A5FF32", "#30ADF3", "#FFEE32", "#FF5172"];

  let sum = datas.reduce((a, b) => a + b, 0);

  const unaccep_data = [datas[3], sum - datas[3]];
  const unaccep_lables = ["unacceptable", "others"];
  const unaccep_colors = ["#FF5172", "#F2D8DF"];

  const unsat_data = [datas[2], sum - datas[2]];
  const unsat_lables = ["unsatisfactory", "others"];
  const unsat_colors = ["#FFEE32", "#F4E4C4"];

  const sat_data = [datas[1], sum - datas[1]];
  const sat_lables = ["satisfactory", "others"];
  const sat_colors = ["#30ADF3", "#C4E2F4"];

  const good_data = [datas[0], sum - datas[0]];
  const good_lables = ["Good", "others"];
  const good_colors = ["#A5FF32", "#D9ECC8"];

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
      plotOptions: {
        pie: {
          donut: {
            labels: {
              show: true,
              total: {
                showAlways: true,
                show: true,
                label: "Total",
                fontSize: "16px",
                color: "#ADB1B8",
              },
              value: {
                fontSize: "20px",
                show: true,
                color: "#ADB1B8",
              },
            },
          },
        },
      },
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
      plotOptions: {
        pie: {
          donut: {
            labels: {
              show: true,
              total: {
                showAlways: true,
                show: true,
                label: "Total",
                fontSize: "16px",
                color: "#ADB1B8",
              },
              value: {
                fontSize: "20px",
                show: true,
                color: "#ADB1B8",
              },
            },
          },
        },
      },
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
      plotOptions: {
        pie: {
          donut: {
            labels: {
              show: true,
              total: {
                showAlways: true,
                show: true,
                label: "Total",
                fontSize: "16px",
                color: "#ADB1B8",
              },
              value: {
                fontSize: "20px",
                show: true,
                color: "#ADB1B8",
              },
            },
          },
        },
      },
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
      plotOptions: {
        pie: {
          donut: {
            labels: {
              show: true,
              total: {
                showAlways: true,
                show: true,
                label: "Total",
                fontSize: "16px",
                color: "#ADB1B8",
              },
              value: {
                fontSize: "20px",
                show: true,
                color: "#ADB1B8",
              },
            },
          },
        },
      },
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
      plotOptions: {
        pie: {
          donut: {
            labels: {
              show: true,
              total: {
                showAlways: true,
                show: true,
                label: "Total",
                fontSize: "16px",
                color: "#ADB1B8",
              },
              value: {
                fontSize: "20px",
                show: true,
                color: "#ADB1B8",
              },
            },
          },
        },
      },
      labels: good_lables,
    },
  };
  return (
    <div>
      <Desktop>
        <Big>
          <ReactApexChart
            options={TotdonutData.options}
            series={TotdonutData.series}
            type="donut"
            width={180}
          />
          <ReactApexChart
            options={unacceptdonutData.options}
            series={unacceptdonutData.series}
            type="donut"
            width={180}
          />
          <ReactApexChart
            options={unsatdonutData.options}
            series={unsatdonutData.series}
            type="donut"
            width={180}
          />
          <ReactApexChart
            options={satdonutData.options}
            series={satdonutData.series}
            type="donut"
            width={180}
          />
          <ReactApexChart
            options={gooddonutData.options}
            series={gooddonutData.series}
            type="donut"
            width={180}
          />
        </Big>
      </Desktop>

      <Tablet>
        <Mid>
          <ReactApexChart
            options={TotdonutData.options}
            series={TotdonutData.series}
            type="donut"
            width={180}
          />
          <ReactApexChart
            options={unacceptdonutData.options}
            series={unacceptdonutData.series}
            type="donut"
            width={180}
          />
          <ReactApexChart
            options={unsatdonutData.options}
            series={unsatdonutData.series}
            type="donut"
            width={180}
          />
        </Mid>
      </Tablet>

      <Mobile>
        <Small>
          <ReactApexChart
            options={TotdonutData.options}
            series={TotdonutData.series}
            type="donut"
            width={200}
          />
          <ReactApexChart
            options={unacceptdonutData.options}
            series={unacceptdonutData.series}
            type="donut"
            width={200}
          />
        </Small>
      </Mobile>
    </div>
  );
};

export default HealthStatus;

const Big = styled.div`
  position: absolute;
  top: 30px;
  left: 150px;
  background: #ffffff;
  border: 1px solid rgba(0, 0, 0, 0.2);
  width: 900px;
  height: 200px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 20px;
  display: flex;
  align-items: center;
`;
const Mid = styled.div`
  position: absolute;
  top: 30px;
  left: 150px;
  background: #ffffff;
  border: 1px solid rgba(0, 0, 0, 0.2);
  width: 550px;
  height: 200px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 20px;
  display: flex;
  align-items: center;
`;
const Small = styled.div`
  position: absolute;
  top: 30px;
  left: 150px;
  background: #ffffff;
  border: 1px solid rgba(0, 0, 0, 0.2);
  width: 400px;
  height: 200px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 20px;
  display: flex;
  align-items: center;
`;
