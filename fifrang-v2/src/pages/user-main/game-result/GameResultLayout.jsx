import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import PropTypes from "prop-types";
import useHttpRequest from "../../../hooks/useFetch";

import GameContainer from "../../../comonents/ui/GameResultContainer";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import CustomTypography from './../../../comonents/ui/CustomTypography';
import PlayerInfo from "./PlayerInfo";
import GameScore from "./ScoreBox";
import DetailLink from "./DetailLink";
import { API } from "../../../utils/api-url";
import useUserInfoStore from "../../../store/searchUserInfo";
import Loading from "../../../comonents/ui/LoadingSpinner";

function GameResultLayout(props) {
  const { matchId, openSquad  } = props;
  const navigate = useNavigate();
  const apiMatchResultInfo = API.GET_DETAIL_GAME_INFO;
  const { data, isLoading, error, fetchData } = useHttpRequest();
  const { user } = useUserInfoStore();

  const [homePlayer, setHomePlayer] = useState(null);
  const [awayPlayer, setAwayPlayer] = useState(null);
  const [gameSquadInfo, setGameSquadInfo] = useState(null);
  const [gameResultText, setGameResultText] = useState(null);
  const [openDetailGame, setOpenDetailGame] = useState(true);

  const gameResult = () => {
    if (user === homePlayer.ouid) {
      setGameResultText(homePlayer.shoot.goalTotal > awayPlayer.shoot.goalTotal ? "승" : homePlayer.shoot.goalTotal === awayPlayer.shoot.goalTotal ? "무" : "패");
    } else {
      setGameResultText(homePlayer.shoot.goalTotal > awayPlayer.shoot.goalTotal ? "패" : homePlayer.shoot.goalTotal === awayPlayer.shoot.goalTotal ? "무" : "승");
    }
  };

  const handleDetailGame = () => {
    setOpenDetailGame((prevState) => !prevState);
    openSquad (openDetailGame);
  }

  useEffect(() => {
    const apiFetch = async() => {
      await fetchData(apiMatchResultInfo, 'get', matchId)
    }
    apiFetch();
  }, [matchId]);

  useEffect(() => {
    if (data) {
      setHomePlayer(data.matchInfo[0]);
      setAwayPlayer(data.matchInfo[1]);
      setGameSquadInfo(data);
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
    <GameContainer gameResultText={gameResultText}>
       <ThumbUpIcon sx={{ color: "white" }} fontSize="large" />
       <CustomTypography fontSize="25px" fontWeight="bold" color="white" content={gameResultText}/>
       {homePlayer && <PlayerInfo nickname={homePlayer.nickname} />}
       {awayPlayer && <PlayerInfo nickname={awayPlayer.nickname} />}
       {homePlayer && awayPlayer && <GameScore homeScore={homePlayer.shoot.goalTotalDisplay} awayScore={awayPlayer.shoot.goalTotalDisplay} />}
       {gameSquadInfo && <DetailLink onClick={handleDetailGame} open={openDetailGame} detailInfo={gameSquadInfo}/>}
    </GameContainer>
  );
}

GameResultLayout.propTypes = {
  matchId: PropTypes.string,
  openSquad: PropTypes.func,
};

export default GameResultLayout;