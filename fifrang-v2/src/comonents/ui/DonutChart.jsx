import Chart from "react-apexcharts";
import { useState } from "react";
import useHttpRequest from "../../hooks/useFetch";

function DonutChart() {

    // 공식경기 1on1 MatchType(50)에 관한 API 호출
    // const { data, isLoading, error, fetchData } = useHttpRequest();

    const [chartData, setChartData] = useState({
        series: [44, 55, 17],
        options: {
          chart: {
            type: "donut",
          },
          labels: ["승리", "무승부", "패배"],
          colors: ["#5383E8", "#14A44D", "#E84057"],
          responsive: [{
            breakpoint: 480,
            options: {
              chart: {
                width: 200
              },
              legend: {
                position: "bottom"
              }
            }
          }],
          title: {
            text: "1vs1 공식경기 (최근 10경기)",
            align: "center"
          },
        }
      });

  return (
    <Chart
      options={chartData.options}
      series={chartData.series}
      type="donut"
      width="400px"
    ></Chart>
  );
}

export default DonutChart;