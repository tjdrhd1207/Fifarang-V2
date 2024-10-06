import { Typography } from "@mui/material";
import PropTypes from "prop-types";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import styled from "styled-components";
import CustomTypography from "/src/comonents/ui/CustomTypography";
import { API } from "../../utils/api-url";
import useHttpRequest from "../../hooks/useFetch";
import Loading from "../../comonents/ui/LoadingSpinner";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const GameContainer = styled.div`
  height: 150px;
  width: 700px;
  display: flex;
  align-items: center;
  padding-left: 50px;
  background: ${(props) =>
    props.win === "win"
      ? "#5383E8"
      : props.win === "lose"
      ? "#E84057"
      : "#14A44D"};
  opacity: 0.9;
  border-radius: 5px;
  box-shadow: 0 8px 10px rgba(0, 0, 0, 0.2);
`;

const FirstSubBox = styled.div`
  margin-left: 30px;
  width: 100px;
  display: flex;
  flex-direction: column;
  align-items: baseline;
`;

const NickNameBox = styled.div`
  width: 100px;
  display: flex;
  justify-content: center;
`;

const ScoreBox = styled.div`
  display: flex;
  justify-content: center;
`;

const DetailBox = styled.div`
  display: flex;
  width: 150px;
  justify-content: end;
  cursor: pointer;
`;

function GameResultLayout(props) {
  const { win, matchId } = props;
  const navigate = useNavigate();
  const apiMatchResultInfo = API.GET_DETAIL_GAME_INFO;
  const { data, isLoading, error, fetchData } = useHttpRequest();
  // const gameResult =
  //   win === "lose" ? "패배" : win === "draw" ? "무승부" : "승리";

  const [homePlayer, setHomePlayer] = useState(null);
  const [awayPlayer, setAwayPlayer] = useState(null);
  const [gameResultText, setGameResultText] = useState(null);
  const gameResult = () => {
    // TODO: 검색한 userId는 justand를 통해 관리해야할 것으로 보임
    // 홈플레이어의 userId 와 검색한 userId가 같으면 그게 기준이 되고
    // 그 기준을 통해서 승패를 결정함
    if (homePlayer.shoot.goalTotal > awayPlayer.shoot.goalTotal ) {
      setGameResultText('승');
    } else if (homePlayer.shoot.goalTotal === awayPlayer.shoot.goalTotal) {
      setGameResultText('무');  
    } else {
      setGameResultText('패');
    }
  }

  useEffect(() => {
    const apiFetch = async() => {
      await fetchData(apiMatchResultInfo, 'get', matchId)
    }
    apiFetch();
  }, [matchId]);

  useEffect(() => {
    if (data) {
      console.log("매치정보 : ");
      console.log(data);
      setHomePlayer(data.matchInfo[0]);
      setAwayPlayer(data.matchInfo[1]);
    }
  }, [data]);

  useEffect(() => {
    if (homePlayer && awayPlayer) {
      gameResult();
    }
  }, [homePlayer, awayPlayer]);

  if (isLoading) return <Loading>경기결과 조회중..</Loading>
  else if (error) {
    navigate(`/error`, { state: { errorMessage: error.message } });    
  }
  return (
    <GameContainer win={win}>
      <FirstSubBox>
        <ThumbUpIcon sx={{ color: "white" }} fontSize="large"></ThumbUpIcon>
        <CustomTypography
          fontSize="25px"
          fontWeight="bold"
          color="white"
          content={gameResultText}
        ></CustomTypography>
      </FirstSubBox>
      <NickNameBox>
        {homePlayer && <Typography
          sx={{ fontWeight: "bold", fontSize: "20px", color: "white" }}
        >
          {homePlayer.nickname}
        </Typography>}
      </NickNameBox>
      <ScoreBox>
        {homePlayer && <Typography
          sx={{ fontWeight: "bold", fontSize: "50px", color: "white" }}
        >
          {`${homePlayer.shoot.goalTotal} : ${awayPlayer.shoot.goalTotal}`}
        </Typography>}
      </ScoreBox>
      <NickNameBox>
        {awayPlayer && <Typography
          sx={{ fontWeight: "bold", fontSize: "20px", color: "white" }}
        >
          {awayPlayer.nickname}
        </Typography>}
      </NickNameBox>
      <DetailBox>
        <Typography
          sx={{ fontWeight: "400", fontSize: "15px", color: "white" }}
        >
          {"상세보기"}
        </Typography>
      </DetailBox>
    </GameContainer>
  );
}

GameResultLayout.propTypes = {
  win: PropTypes.string,
  matchId: PropTypes.string,
};

export default GameResultLayout;
