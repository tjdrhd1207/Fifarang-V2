import { useNavigate } from "react-router-dom";
import PropTypes from 'prop-types';
import { Typography } from "@mui/material";
import styled from "styled-components";
import { useEffect, useState, useRef } from "react";

import useHttpRequest from "../../../hooks/useFetch";
import { API } from "../../../utils/api-url";
import Loading from '../../../comonents/ui/LoadingSpinner';
import loadPlayerImage from "../../../store/loadPlayerImage";

const DetailBox = styled.div`
  display: flex;
  width: 150px;
  justify-content: end;
  cursor: pointer;
`;

function DetailLink(props) {
  const { detailInfo, onClick } = props;
  const navigate = useNavigate();
  const [homeStartList, setHomeStartList] = useState(null);
  const apiPlayersImage = API.GET_PLAYERS_IMAGE;
  const { data, isLoading, error, fetchData } = useHttpRequest();
  const { setImageURL } = loadPlayerImage();
  const { playerImageInfo, setPlayerImageInfo } = useState([]);
  const isFetchedRef = useRef(false);

  useEffect(() => {
    if (detailInfo && !isFetchedRef.current) {
      setHomeStartList(detailInfo.matchInfo[0].player);
      console.log("Player data:", detailInfo.matchInfo[0].player);

      const fetchPlayerImages = async () => {
        for (const player of detailInfo.matchInfo[0].player) {
          const url = `${apiPlayersImage}/p${player.spId}.png`;
          await fetchData(url, 'get', undefined, true);
        }

      };

      fetchPlayerImages();
      isFetchedRef.current = true;
    }
  }, [detailInfo]); // 의존성 배열에서 detailInfo만 사용

  useEffect(() => {
    if (data) {
      console.log("Fetched data:", data);
      const imgURL = URL.createObjectURL(data);
      // setPlayerImageInfo(...playerImageInfo, imgURL);
      console.log('이미지배열');
      console.log(playerImageInfo);
    }
  }, [data]);

  if (isLoading) return <Loading>스타팅라인업 조회중..</Loading>;
  else if (error) {
    navigate(`/error`, { state: { errorMessage: error.message } });
  }

  return (
    <DetailBox onClick={onClick}>
      <Typography sx={{ fontWeight: "400", fontSize: "15px", color: "white" }}>
        상세보기
      </Typography>
      {/* <div>
      {data ? (
        <img src={URL.createObjectURL(data)} alt="Fetched" />
      ) : (
        <p>Loading image...</p>
      )}
    </div> */}
    </DetailBox>
  );
}

DetailLink.propTypes = {
  detailInfo: PropTypes.object,
  onClick: PropTypes.func,
};

export default DetailLink;
