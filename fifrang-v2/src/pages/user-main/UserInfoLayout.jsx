import { Typography } from "@mui/material";
import styled from "styled-components";
import "@fontsource/roboto/300.css";
import GameResultLayout from "./GameResultLayout";
import OwnerNameBar from "../../comonents/ui/OwnerNameBar";
import DonutChart from "../../comonents/ui/DonutChart";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import useHttpRequest from "../../hooks/useFetch";
import { API } from "../../utils/api-url";
import Loading from "../../comonents/ui/LoadingSpinner";
import Last10GameGraph from "../../comonents/ui/DonutChart";

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
const GraphContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 1000px;
  justify-content: space-around;
`;

const GraphBox = styled.div`
  display: flex;
  width: 400px;
  height: 300px;
  align-items: center;
  background: white;
  border-radius: 10px;
  margin : 0 auto;
  box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2),
    0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);
`;

const MatchCard = styled.div`
  color: white;
  width: 200px;
  height: 100px;
  background: seagreen;
  border-radius: 10px;
  box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2),
  0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);
  align-content: center;
  font-size: 30px;
  font-weight: 700;
  font-family: "Roboto", "Helvetica", "Arial", sans-serif;
`

// Nexon API에서 제공하는 1ON1 공식경기의 타입은 50
// TODO : 추후 파일로 관리하는 것이 좋아 보임
const MATCH_TYPE = 50;
const OFF_SET = 0;
const LIMIT = 10;

function UserInfoLayout() {
  const location = useLocation();
  const ouid = location.state.ouid;
  const latestMatchId = API.GET_LATEST_10_GAME_OUID;
  const matchTypeUrl = API.GET_MATCH_TYPE;
  const navigate = useNavigate();

  const { data: latest_1on1_MatchData, isLoading: isLatest_1on1_MatchLoading, error: latest_1on1_MatchError, fetchData: fetch_1on1_LatestMatchData } = useHttpRequest();
  const { data: matchtypeData, isLoading: matchtypeLoading, error: matchtypeError, fetchData: fetchMatchtypeData } = useHttpRequest();

  const reqBody = { ouid: ouid.ouid, matchtype: MATCH_TYPE, offset: OFF_SET, limit: LIMIT };

  useEffect(() => {
    fetchMatchtypeData(matchTypeUrl, 'get');
  }, [matchTypeUrl])

/*   useEffect(() => {
    fetch_1on1_LatestMatchData(latestMatchId, 'get', reqBody);  // 최근 10 경기 내의 MATCH의 OUID를 조회
  }, [latestMatchId, ouid]);
 */
/*   useEffect(() => {
    if (latest_1on1_MatchData) {
      console.log("Fetched Data: ", latest_1on1_MatchData);
    }
  }, [latest_1on1_MatchData]);
 */
  useEffect(() => {
    if (matchtypeData) {
      console.log("Fetch MatchType : ", matchtypeData);
    }
  }, [matchtypeData]);

  if (matchtypeLoading) return <Loading message={'전체 데이터 조회중입니다...'}></Loading>
  else if (matchtypeError) {
    navigate(`/error`, { state: { errorMessage: matchtypeError.message } });
  }

  return (
    <SearchMainLayout>
      <SearchMainContainer>
        <OwnerNameBar ouid={ouid} />
        <ResultMainBox>
          <GraphContainer>
            <MatchCard>공식경기</MatchCard>
            <MatchCard>감독모드</MatchCard>
            <MatchCard>리그친선</MatchCard>
            <MatchCard>볼타친선</MatchCard>
            {/* <GraphBox>
              {latest_1on1_MatchData && <Last10GameGraph arrMatchid={latest_1on1_MatchData}></Last10GameGraph>}
            </GraphBox>
            <GraphBox>
            {data && <Last10GameGraph arrMatchid={data}></Last10GameGraph>}
            </GraphBox> */}
          </GraphContainer>
          {<GameResultLayout win="win" />}
          {/* <GameResultLayout win="lose" />
            <GameResultLayout win="win" />
            <GameResultLayout win="lose" />
            <GameResultLayout win="draw" />
            <GameResultLayout win="win" />
            <GameResultLayout win="win" />
            <GameResultLayout win="draw" /> */}
        </ResultMainBox>
      </SearchMainContainer>
    </SearchMainLayout>
  );

}

export default UserInfoLayout;
