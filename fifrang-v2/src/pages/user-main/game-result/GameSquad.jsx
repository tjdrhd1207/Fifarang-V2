import styled from "styled-components";
import PropTypes from "prop-types";

const GameSquadContainer = styled.div`
    height: ${({ open }) => (open ? "500px" : "0")}; /* open 여부에 따라 height 조정 */
    width: 700px;
    background-color: green;
    overflow: hidden; /* 내용이 넘칠 경우 숨김 처리 */
    transition: height 0.3s ease-in-out; /* 애니메이션 효과 추가 */
    border-radius: 5px;
    box-shadow: 0 8px 10px rgba(0, 0, 0, 0.2);
`

function GameSquad(props) {
    const { open } = props;
    return (
        <GameSquadContainer open={open}>

        </GameSquadContainer>
    )
}

GameSquad.propTypes = {
    open: PropTypes.bool,
}

export default GameSquad;