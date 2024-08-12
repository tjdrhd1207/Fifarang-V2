import { useLocation } from "react-router-dom";
import { Typography } from "@mui/material";
import PropTypes from "prop-types";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import styled from "styled-components";
import CustomTypography from "/src/comonents/ui/CustomTypography";

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
  const location = useLocation();
  const { win } = props;
  const gameResult =
    win === "lose" ? "패배" : win === "draw" ? "무승부" : "승리";
  const { ouid } = location.state || {};

  console.log(ouid);

  return (
    <GameContainer win={win}>
      <FirstSubBox>
        <ThumbUpIcon sx={{ color: "white" }} fontSize="large"></ThumbUpIcon>
        <CustomTypography
          fontSize="25px"
          fontWeight="bold"
          color="white"
          content={gameResult}
        ></CustomTypography>
      </FirstSubBox>
      <NickNameBox>
        <Typography
          sx={{ fontWeight: "bold", fontSize: "20px", color: "white" }}
        >
          {"게구맨"}
        </Typography>
      </NickNameBox>
      <ScoreBox>
        <Typography
          sx={{ fontWeight: "bold", fontSize: "50px", color: "white" }}
        >
          {"3 : 0"}
        </Typography>
      </ScoreBox>
      <NickNameBox>
        <Typography
          sx={{ fontWeight: "bold", fontSize: "20px", color: "white" }}
        >
          {"하르네스"}
        </Typography>
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
};

export default GameResultLayout;
