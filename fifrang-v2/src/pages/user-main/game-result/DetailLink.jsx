import { useNavigate } from "react-router-dom";
import PropTypes from 'prop-types';
import { Typography } from "@mui/material";
import styled from "styled-components";
import { useEffect, useState, useRef } from "react";

import useHttpRequest from "../../../hooks/useFetch";
import { API } from "../../../utils/api-url";
import Loading from '../../../comonents/ui/LoadingSpinner';
import loadPlayerImage from "../../../store/loadPlayerImage";

const DEFAULT_IMAGE = '/src/assets/default.svg';

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
  const [playerImages, setPlayerImages] = useState([]);
  const isFetchedRef = useRef(false);

  useEffect(() => {
    if (detailInfo && !isFetchedRef.current) {
      setHomeStartList(detailInfo.matchInfo[0].player);
      console.log("Player data:", detailInfo.matchInfo[0].player);

      const fetchPlayerImages = async() => {
        const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

        // 이미지 담을 배열 초기화
        const fetchedImages = [];

        // 각 선수를 순차적으로 처리하며 이미지 요청
        for (const player of detailInfo.matchInfo[0].player) {
          await delay(100); // 각 이미지 요청 사이에 100ms 지연
          const url = `${apiPlayersImage}/p${player.spId}.png`;

          try {
            const imageBlob = await fetchData(url, 'get', undefined, true);
            const imageURL = URL.createObjectURL(imageBlob); // Blob URL 생성
            fetchedImages.push(imageURL);
          } catch (fetchError) {
            console.log('fetchError');
            fetchedImages.push(DEFAULT_IMAGE);
          }
        }
      }

      fetchPlayerImages();
      isFetchedRef.current = true;
    }
  }, [detailInfo, apiPlayersImage, fetchData]);

  useEffect(() => {
    if (data) {
      console.log("Fetched data:", data);
      const imgURL = URL.createObjectURL(data);
      // setPlayerImageInfo(...playerImageInfo, imgURL);
      console.log('이미지배열');
      console.log(imgURL);
    }
  }, [data]);

  if (isLoading) return <Loading>스타팅라인업 조회중..</Loading>;
  else if (error) {
    navigate(`/error`, { state: { errorMessage: error.message } });
    return null;
  }

  return (
    <DetailBox onClick={onClick}>
      <Typography sx={{ fontWeight: "400", fontSize: "15px", color: "white" }}>
        상세보기
      </Typography>
      <div>
      {playerImages && playerImages.length > 0 ? (
        playerImages.map((src, index) => (
          <img key={index} src={src} alt={`Player ${index + 1}`} style={{ margin: "5px", width: "50px", height: "50px"}} />))
        ) : (
            <p>Loading images..</p>
          )
      }
    </div>
    </DetailBox>
  );
}

DetailLink.propTypes = {
  detailInfo: PropTypes.object,
  onClick: PropTypes.func,
};

export default DetailLink;
