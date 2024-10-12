import { Typography } from "@mui/material";
import styled from "styled-components";

const DetailBox = styled.div`
  display: flex;
  width: 150px;
  justify-content: end;
  cursor: pointer;
`;

function DetailLink() {
  return (
    <DetailBox>
      <Typography sx={{ fontWeight: "400", fontSize: "15px", color: "white" }}>
        상세보기
      </Typography>
    </DetailBox>
  );
}

export default DetailLink;