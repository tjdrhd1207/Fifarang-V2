import Chart from "react-apexcharts";
import { useEffect, useState } from "react";
import useHttpRequest from "../../hooks/useFetch";
import { API } from "../../utils/api-url";
import PropTypes from "prop-types";
import Loading from "./LoadingSpinner";
import { useNavigate } from "react-router-dom";

function Last10GameGraph(props) {
    const { arrMatchid } = props;
    const apiMatchInfo = API.GET_DETAIL_GAME_INFO;
    const { data, isLoading, error, fetchData } = useHttpRequest();
    const navigate = useNavigate();
    let [matchWinArray, setMatchWinArray] = useState([]);
    let [matchDrawArray, setMatchDrawArray] = useState([]);
    let [matchLoseArray, setMatchLoseArray] = useState([]);
    let [matchSum, setMatchSum] = useState(0);
    const [chartData, setChartData] = useState({
      series: [0, 0, 0], // 초기값을 0으로 설정합니다.
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
            text: `1vs1 공식경기 (최근 ${arrMatchid.length}경기)`,
            align: "center"
          },
        }
      });

    useEffect(() => {
      const apiFetch = async() => {
        for (const ouid of arrMatchid) {
          await fetchData(apiMatchInfo, 'get', ouid);
        }
      }
      apiFetch();
    }, [arrMatchid, apiMatchInfo]);

    useEffect(() => {
      if (data) {

        const matchResult = data.matchInfo[0].matchDetail.matchResult;

        switch (matchResult) {
          case '승':
            setMatchWinArray(prevArray => [...prevArray, matchResult]);
            return;
          case '무':
            setMatchDrawArray(prevArray => [...prevArray, matchResult]);
            return;
          case '패':
            setMatchLoseArray(prevArray => [...prevArray, matchResult]);
            return;
        }
        setMatchSum(matchSum + 1);
      }
    }, [data]);

    useEffect(() => {
      // matchResultArray가 업데이트될 때마다 chartData를 업데이트합니다.
      setChartData({
        series: [matchWinArray.length, matchDrawArray.length, matchLoseArray.length],
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
    }, [matchWinArray, matchDrawArray, matchLoseArray]);
  

  // TODO : 예외발생할 상항이 없는지 확인해봐야함 (ex. 총 판수가 10판 이하 일때)
  if (isLoading) return <Loading></Loading>
  else if (error) {
    navigate(`/error`, { state: { errorMessage: error.message } });
  }

  return (
    <>

        <Chart
        options={chartData.options}
        series={chartData.series}
        type="donut"
        width="400px"
        >
        </Chart>
    </>
  );
}

Last10GameGraph.propTypes = {
    arrMatchid: PropTypes.array,
}

export default Last10GameGraph;