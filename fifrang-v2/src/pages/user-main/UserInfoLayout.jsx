import { Typography } from "@mui/material";
import styled from "styled-components";
import "@fontsource/roboto/300.css";
import GameResultLayout from "./GameResultLayout";

const SearchMainLayout = styled.section`
  display: flex;
  align-items: center;
  width: 100wh;
  margin-top: 30px;
  justify-content: center;
  background: rgb(249, 250, 251);
`;

const SearchMainContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
`;

const UserMainBox = styled.div`
  display: flex;
  margin-top: 10px;
  height: 150px;
  width: 1000px;
  align-items: center;
  gap: 15px;
  background: white;
  border-radius: 10px;
  box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2),
    0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);
  justify-content: center;
  margin-bottom: 30px;
`;

const ResultMainBox = styled.div`
  display: flex;
  width: 1000px;
  align-items: center;
  gap: 15px;
  padding: 10px;
  justify-content: center;
  flex-direction: column;
  background: white;
  border-radius: 10px;
  box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2),
    0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);
`;

function UserInfoLayout() {
  return (
    <SearchMainLayout>
      <SearchMainContainer>
        <UserMainBox>
          <Typography variant="h2" fontWeight={"500"}>
            {`게구맨`}
          </Typography>
          <Typography variant="h4">{`님의 최근전적`}</Typography>
        </UserMainBox>
        <ResultMainBox>
          <GameResultLayout win="win" />
          <GameResultLayout win="lose" />
          <GameResultLayout win="win" />
          <GameResultLayout win="lose" />
          <GameResultLayout win="draw" />
          <GameResultLayout win="win" />
          <GameResultLayout win="win" />
          <GameResultLayout win="draw" />
        </ResultMainBox>
      </SearchMainContainer>
    </SearchMainLayout>
  );
}

export default UserInfoLayout;
