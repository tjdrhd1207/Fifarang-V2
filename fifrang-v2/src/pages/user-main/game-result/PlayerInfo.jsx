import { Typography } from "@mui/material";
import PropTypes from "prop-types";
import styled from "styled-components";

const NickNameBox = styled.div`
width: 100px;
display: flex;
justify-content: center;
`;

function PlayerInfo ({ nickname }) {
    return (
        <NickNameBox>
            <Typography sx={{
                fontWeight: "bold",
                fontSize: "20px",
                color: "white"
            }}>
                {nickname}
            </Typography>
        </NickNameBox>
    )
}

PlayerInfo.propTypes = {
    nickname: PropTypes.string.isRequired,
  };

export default PlayerInfo;