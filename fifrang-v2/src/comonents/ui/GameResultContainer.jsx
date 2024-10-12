import styled from "styled-components";

const GameContainer = styled.div`
  height: 150px;
  width: 700px;
  display: flex;
  align-items: center;
  padding-left: 50px;
  background: ${(props) =>
    props.gameResultText === "승"
      ? "#5383E8"
      : props.gameResultText === "패"
      ? "#E84057"
      : "#14A44D"};
  opacity: 0.9;
  border-radius: 5px;
  box-shadow: 0 8px 10px rgba(0, 0, 0, 0.2);
`;

export default GameContainer;