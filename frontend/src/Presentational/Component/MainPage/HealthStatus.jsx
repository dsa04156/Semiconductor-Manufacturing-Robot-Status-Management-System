import React from "react";
import ReactApexChart from "react-apexcharts";

const HealthStatus = () => {
  const donutData = {
    series: [50, 40, 30, 10, 0],
    options: {
      chart: {
        type: "donut",
      },
      legend: {
        position: "bottom",
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
                label: "ALARM",
                fontSize: "12px",
                color: "red",
              },
              value: {
                fontSize: "22px",
                show: true,
                color: "blue",
              },
            },
          },
        },
      },
      labels: ["침입", "배회", "쓰러짐", "화재", "안전모"],
      title: {
        text: "이벤트별 통계",
        align: "center",
      },
    },
  };
  return <div>
            <ReactApexChart 
            options={donutData.options}
            series={donutData.series}
            type="donut" 
            width="500"
        />
  </div>;
};

export default HealthStatus;
