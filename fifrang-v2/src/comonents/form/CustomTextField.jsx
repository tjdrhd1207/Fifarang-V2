import styled from "styled-components";
import { useState } from "react";
import { useNavigate } from "react-router-dom";


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
    const [userId, setUserId] = useState('');

    const searchOnclick = () => {
        // TODO : 구단주 조회 api와 
        navigate(`/user/${userId}`);
    }
    const inputUserId = (event) => {
        setUserId(event.target.value);
    }

    return (
        <InputWrapper>
            <InputTextField
                value={userId}
                onChange={(event) => inputUserId(event)}
            />
            <StyledButton onClick={searchOnclick}>
                {'검색'}
            </StyledButton>
        </InputWrapper>
    )
}

export default CustomTextField;