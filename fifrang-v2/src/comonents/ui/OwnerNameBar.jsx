import styled from "styled-components";
import { Typography } from "@mui/material";
import useHttpRequest from "../../hooks/useFetch";
import { API } from "../../utils/api-url";
import { useEffect } from "react";

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


// 로딩 스피너 스타일
// TODO : 전역 디자인으로 변경해야함
const LoadingSpinner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 150px;
  width: 1000px;
  font-size: 24px;
  color: #333;
`;

function OwnerNameBar (props) {
    const { ouid } = props;
    const apiOwnerName = API.GET_OWNER_NAME;
    const ouidValue = ouid.ouid;
    // OwnerName API 요청
    const { data, isLoading, error, fetchData } = useHttpRequest();
    
    useEffect(() => {
        fetchData(apiOwnerName, 'get', ouidValue);
    }, [ouidValue, apiOwnerName]);
    const nickName = data?.nickname;
    return (
        <>
            {isLoading ? (
                <LoadingSpinner>Loading...</LoadingSpinner>
            ) : (
                data && (
                    <UserMainBox>  
                        <Typography variant="h2" fontWeight={"500"}>
                            {data ? nickName : null}
                        </Typography>
                        <Typography variant="h4">{`님의 최근전적`}</Typography>
                    </UserMainBox>
                )
            )}

        </>
    )
}

export default OwnerNameBar;