import Chart from "react-apexcharts";
import { useEffect, useState } from "react";
import useHttpRequest from "../../hooks/useFetch";
import { API } from "../../utils/api-url";

function DonutChart(props) {
    const { arrMatchid } = props;
    const apiMatchInfo = API.GET_DETAIL_GAME_INFO;
    const { data, isLoading, error, fetchData } = useHttpRequest();
    
    useEffect(() => {
      // console.log(arrMatchid);
      arrMatchid.map((ouid) => {
        fetchData(apiMatchInfo, 'get', ouid);
      })
    }, [arrMatchid, apiMatchInfo]);

    useEffect(() => {
      if (data) {
        console.log('조회한 matchId 결과 : ');
        console.log(data);
      }
    }, [data]);

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