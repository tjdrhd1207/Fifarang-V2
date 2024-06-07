import { Box, Typography } from "@mui/material";
import PropTypes from "prop-types";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import styled from "styled-components";
import CustomTypography from '/src/comonents/ui/CustomTypography';

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
`
function GameResultLayout(props) {
  const { win } = props;
  const gameResult =
    win === "lose" ? "패배" : win === "draw" ? "무승부" : "승리";

  return (
    <GameContainer win={win}>
      <FirstSubBox>
      <ThumbUpIcon sx={{ color: "white" }} fontSize="large"></ThumbUpIcon>
        <CustomTypography
          fontSize="25px"
          fontWeight="bold"
          color="white"
          content={gameResult}
        >
        </CustomTypography>
      </FirstSubBox>
      <Box marginLeft={"30px"}>
        <Typography
            sx={{ fontWeight: "bold", fontSize: "50px", color: "white" }}
        >
            {'3 : 0'}
        </Typography>
      </Box>
    </GameContainer>
  );
}

GameResultLayout.propTypes = {
  win: PropTypes.string,
};

export default GameResultLayout;
