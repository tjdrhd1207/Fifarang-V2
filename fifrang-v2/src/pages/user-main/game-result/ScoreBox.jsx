import { Typography } from "@mui/material";
import PropTypes from "prop-types";
import styled from "styled-components";

const ScoreBox = styled.div`
  display: flex;
  justify-content: center;
`;

function GameScore({ homeScore, awayScore }) {
    return (
      <ScoreBox>
        <Typography sx={{ fontWeight: "bold", fontSize: "50px", color: "white" }}>
          {`${homeScore} : ${awayScore}`}
        </Typography>
      </ScoreBox>
    );
  }

GameScore.propTypes = {
  homeScore: PropTypes.number.isRequired,
  awayScore: PropTypes.number.isRequired,
};

export default GameScore;