import { useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import GameResultLayout from "./GameResultLayout";
import GameSquad from "./GameSquad";

const Container = styled.div`
    display: flex;
    position: relative;
    flex-direction: column;
`

const ContentsWrapper = styled.div`
    padding-top: 4px;
`;

function GameInfoAccordian(props) {
    const { matchId } = props;
    const [openYN, setOpenYN] = useState(null);

    const openSquad = (result) => {
        setOpenYN(result);
    }

    return (
        <Container>
            <GameResultLayout matchId={matchId} openSquad={openSquad}></GameResultLayout>
            <ContentsWrapper>
                <GameSquad matchId={matchId} open={openYN}></GameSquad>
            </ContentsWrapper>
        </Container>
    )
}

GameInfoAccordian.propTypes = {
    matchId: PropTypes.string,
  };
  

export default GameInfoAccordian;