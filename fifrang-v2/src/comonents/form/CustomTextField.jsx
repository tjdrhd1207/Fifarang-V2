import styled from "styled-components";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import useHttpRequest from "../../hooks/useFetch";
import { API } from "../../utils/api-url";

// styled.input 정의
const InputTextField = styled.input`
    font-size: ${props => props.fontSize || '50px'};  // 텍스트 크기 설정
    text-align: ${props => props.textAlign || 'center'};  // 텍스트 정렬 설정
    width: ${props => props.width || '700px'};
    background-color: mediumseagreen;
    color: white;
`;

const InputWrapper = styled.div`
    display : flex;
    align-items : center;
    position : relative;
`;

const StyledButton = styled.button`
    position : absolute;
    right: 5px;
    width: 100px;
    height: 50px;
    cursor: pointer;
`

function CustomTextField() {
    const navigate = useNavigate();
    const inputRef = useRef(null);
    const [userId, setUserId] = useState('');
    const apiSearchUUid = API.GET_USER_OUID;

    // API 요청
    const { data, isLoading, error, fetchData } = useHttpRequest();

    const inputUserId = (event) => {
        setUserId(event.target.value);
    }

    const handleSearchUesr = (e) => {
        if (e.type === "click" || e.key === "Enter") {
            fetchData(apiSearchUUid, 'get', userId);
        }
    }

    useEffect(() => {
        if (data) {
            navigate(`/user/${userId}`);
        }

        if (error) {
            navigate(`/error`, { state: { errorMessage: error.message } });
        }

        if (inputRef.current) {
            inputRef.current.focus();
        }
    }, [data, navigate, error]);

    return (
        <InputWrapper>
            <InputTextField
                ref={inputRef}
                value={userId}
                onChange={(event) => inputUserId(event)}
                onKeyDown={handleSearchUesr}
            />
            <StyledButton onClick={handleSearchUesr}>
                {'검색'}
            </StyledButton>
        </InputWrapper>
    )
}

export default CustomTextField;