import React from "react";
import ReactApexChart from "react-apexcharts";
import styled from "styled-components";

const HealthStatus = ({componentData}) => {
  console.log(componentData);
  const compodata = componentData.map((data) => {
    return {
      name: data.name,
      value: data.value,
      eval: data.eval
    };
  });

  const unaccep_compodata = compodata.reduce((unaccep_count, data) => {
    if (data.eval === 'unacceptable' ) {
      unaccep_count++;
    }
    return unaccep_count;
  }, 0);
  const unaccep_lables = ["unacceptable", "others"];
  const unaccep_colors = ["#FF5172", "#F2D8DF"];

  const unsat_compodata = compodata.reduce((unsat_count, data) => {
    if (data.eval === 'unsatisfactory'){
      unsat_count++;
    }
    return unsat_count;
  }, 0);
  const unsat_lables = ["unsatisfactory", "others"];
  const unsat_colors = ["#FFEE32", "#F4E4C4"];
  
  const sat_compodata = compodata.reduce((sat_count, data) => {
    if (data.eval === 'satisfactory'){
      sat_count++;
    }
    return sat_count;
  }, 0);
  const sat_lables = ["satisfactory", "others"];
  const sat_colors = ["#30ADF3", "#C4E2F4"];
  
  const good_compodata = compodata.reduce((good_count, data) => {
    if (data.eval === 'Good'){
      good_count++;
    }
    return good_count;
  }, 0);
  const good_lables = ["Good", "others"];
  const good_colors = ["#A5FF32", "#D9ECC8"];
  
  const datas = [
    unaccep_compodata,
    unsat_compodata,
    sat_compodata,
    good_compodata
  ];
  console.log(unaccep_compodata);
  const labels = ["unacceptable", "unsatisfactory", "satisfactory", "Good"];
  const colors = ["#FF5172", "#FFEE32", "#30ADF3", "#A5FF32"];

  // let sum = datas.reduce((a, b) => a + b, 0);
  let totalcount = componentData.reduce((acc, cur) => {
    return acc+1;
  }, 0);

  console.log(totalcount);

  const unaccep_data = [unaccep_compodata, totalcount - unaccep_compodata];
  const unsat_data = [datas[1], totalcount - datas[1]];
  const sat_data = [datas[2], totalcount - datas[2]];
  const good_data = [datas[3], totalcount - datas[3]];
  console.log(datas[0]);
  console.log(totalcount - datas[0]);
  // const unaccep_lables = ["unacceptable", "others"];
  // const unaccep_colors = ["#FF5172", "#F2D8DF"];

  // const unsat_data = [datas[2], sum - datas[2]];
  // const unsat_lables = ["unsatisfactory", "others"];
  // const unsat_colors = ["#FFEE32", "#F4E4C4"];

  // const sat_data = [datas[1], sum - datas[1]];
  // const sat_lables = ["satisfactory", "others"];
  // const sat_colors = ["#30ADF3", "#C4E2F4"];

  // const good_data = [datas[0], sum - datas[0]];
  // const good_lables = ["Good", "others"];
  // const good_colors = ["#A5FF32", "#D9ECC8"];

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
    series: [unaccep_compodata],
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
                label: "unacceptable",
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
    series: [unsat_compodata],
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
                label: "unsatisfactory",
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
    series: [sat_compodata],
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
                label: "satisfactory",
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
    series: [good_compodata],
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
                label: "Good",
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
        <Big>
          <div style={{ margin: "15px 0px 0 40px", fontSize: '20px'}}>
            Health Status
          </div>
          <HealthStatusTitle>
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

          /></HealthStatusTitle>
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